import { useEffect, useState } from "react";
import useChats from "../../hooks/useChats";
import useStudents from "../../hooks/useStudents";
import { useDispatch, useSelector } from "react-redux";

import { Bot, UsersRound } from "lucide-react";
import { Outlet, useOutlet } from "react-router-dom";

import { Loading } from "../../components/Loading/Loading";
import { Notification } from "../../components/Notification";
import { SystemButton } from "../../components/SystemButton";
import { ChatCard } from "../../components/MessagesComp/ChatCard";
import { WarningEmptyChats } from "../../components/MessagesComp/WarningEmptyChats";

import { AppDispatch, RootState } from "../../store/store";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
  Checkbox,
  cn,
  Input,
  Textarea
} from "@nextui-org/react";

import { toImageLink } from "../../utils/Students/toImageLink";

import { START_GROUP_MODAL_SLIDE } from "../../constants/GroupModal/startSlide";
import { END_GROUP_MODAL_SLIDE } from "../../constants/GroupModal/endSlide";

import type {
  ExtendedStudents,
  GroupModalSteps
} from "../../interfaces/Students/Main";

// in development

export const Message = () => {
  const outlet = useOutlet();
  const { isLoading: chatsLoading } = useChats();
  const dispatch = useDispatch<AppDispatch>();

  const { chats } = useSelector((c: RootState) => c.chats);
  const { students } = useSelector((u: RootState) => u.students);
  const { chat_socket } = useSelector((s: RootState) => s.chatSocket);

  useEffect(() => {
    if (chat_socket) chat_socket.getJustCreatedChats();
  }, [chat_socket]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // think about error handling
  const { isLoading: studentsLoading, refetch } = useStudents();

  const [extendedStudents, setExtendedStudents] = useState<
    Array<ExtendedStudents>
  >([]);
  const [createGroupIndexes, setCreateGroupIndexes] = useState<
    Array<ExtendedStudents>
  >([]);

  const [next, setNext] = useState<GroupModalSteps>(START_GROUP_MODAL_SLIDE);

  useEffect(() => {
    if (students && students.length > 0) {
      setExtendedStudents([
        ...students.map((student) => {
          return { ...student, chosen_status: false };
        })
      ]);
    }
  }, [students]);

  function SelectedUser(id: number) {
    setExtendedStudents([
      ...extendedStudents.map((student) => {
        if (student.id === id) {
          const extended_student = {
            ...student,
            chosen_status: !student.chosen_status
          };

          if (extended_student.chosen_status) {
            setCreateGroupIndexes([...createGroupIndexes, extended_student]);
          } else {
            setCreateGroupIndexes(
              createGroupIndexes.filter((group_student) => {
                if (group_student.id !== extended_student.id) {
                  return group_student;
                }
              })
            );
          }

          return extended_student;
        }
        return { ...student };
      })
    ]);
  }

  console.log(createGroupIndexes);

  return (
    <div className="flex h-full relative p-8 gap-8 w-full">
      <main className="bg-[#050615] rounded-2xl shadow-2xl border-slate-900 border-2 overflow-auto z-10 flex-[2]">
        {outlet ? (
          <Outlet />
        ) : (
          <Notification
            icon={<Bot width={80} height={80} />}
            message="Select chat to start chatting!"
          />
        )}
      </main>

      <aside className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-3 flex flex-col text-slate-400 gap-2">
        {chatsLoading ? (
          <Loading />
        ) : (
          <>
            {chats.length > 0 ? (
              <>
                <div className="flex justify-end">
                  <SystemButton
                    label="create_group"
                    icon={<UsersRound width={18} height={18} />}
                    onClick={() => {
                      refetch();
                      onOpen();
                    }}
                  />
                </div>

                {chats.map((conv) => {
                  const user = conv.conversations.users_conversations[0].users;

                  return (
                    <ChatCard
                      key={user.id}
                      users={user}
                      onClick={() => {
                        dispatch(chosenUserChatActions.chosenUserInit(user));

                        dispatch(
                          chatSocketAcitons.chosenConvIdInit({
                            id: conv.conversations.id,
                            uuid: conv.conversations.group_uuid
                          })
                        );
                      }}
                    />
                  );
                })}
              </>
            ) : (
              <WarningEmptyChats
                onOpenGroupModal={() => {
                  refetch();
                  onOpen();
                }}
              />
            )}
          </>
        )}
      </aside>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        classNames={{
          header: "flex flex-col gap-1",
          body: "flex-row overflow-auto max-h-[400px] min-h-[300px] overflow-hidden p-0 relative"
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>{next.title}</ModalHeader>
              <ModalBody>
                {studentsLoading ? (
                  <>Loading...</>
                ) : (
                  <div
                    className={`flex w-[896px] h-full absolute transition-transform ${
                      next.slide && "-translate-x-[448px]"
                    } ease-in`}
                  >
                    {/* slide 1 */}
                    <div className="flex gap-1.5 flex-col flex-1 px-5 py-2">
                      {extendedStudents.map((student) => {
                        return (
                          <Checkbox
                            key={student.id}
                            aria-label={student.name}
                            classNames={{
                              base: cn(
                                "inline-flex w-full max-w-md bg-content1",
                                "hover:bg-content2 items-center justify-start",
                                "cursor-pointer rounded-lg gap-2 border-2 border-transparent p-2 m-0",
                                `${student.chosen_status && "border-primary"}`
                              ),
                              label: "w-full flex"
                            }}
                            isSelected={student.chosen_status}
                            onChange={() => SelectedUser(student.id)}
                          >
                            <User
                              className="justify-start items-center"
                              name={`${student.name} ${student.lastname}`}
                              description={student.role}
                              avatarProps={{
                                src: toImageLink(student.img_hash_name)
                              }}
                            />
                          </Checkbox>
                        );
                      })}
                    </div>

                    {/* slide 2 */}
                    <div className="flex-1 px-5 py-2 flex">
                      <div className="flex flex-1 items-center justify-center">
                        <div className="h-[100px] w-[100px] bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="flex-[2] flex flex-col gap-3">
                        <Input
                          size="md"
                          type="group_name"
                          label="Group name"
                          placeholder="Enter name"
                          labelPlacement="outside"
                          classNames={{ inputWrapper: "rounded-lg" }}
                          isRequired
                        />

                        <Textarea
                          label="Description"
                          labelPlacement="outside"
                          placeholder="Enter your description"
                          classNames={{
                            base: "flex-1",
                            inputWrapper: "flex-1"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {next.backButton && (
                  <Button
                    color="primary"
                    onPress={() => setNext(START_GROUP_MODAL_SLIDE)}
                    className="font-semibold text-sm"
                  >
                    Back
                  </Button>
                )}

                {next.nextButton && (
                  <Button
                    color="primary"
                    onPress={() => setNext(END_GROUP_MODAL_SLIDE)}
                    className="font-semibold text-sm"
                  >
                    Next
                  </Button>
                )}

                {next.createButton && (
                  <Button
                    color="primary"
                    onPress={() => {}}
                    className="font-semibold text-sm"
                  >
                    Create group
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
