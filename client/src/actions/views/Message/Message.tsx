import { useEffect, useState } from "react";
import useChats from "../../hooks/useChats";
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
  cn
} from "@nextui-org/react";

import useStudents from "../../hooks/useStudents";
import { toImageLink } from "../../utils/Students/toImageLink";
import { Student } from "../../interfaces/Students/Main";

// in development
interface ExtendedStudents extends Student {
  chosen_status: boolean;
}

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

            <>
              {chats.length > 0 ? (
                <>
                  {chats.map((conv) => {
                    const user =
                      conv.conversations.users_conversations[0].users;

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
                <>
                  <WarningEmptyChats />
                </>
              )}
            </>
          </>
        )}
      </aside>

      {/* future modal implementing */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create group with:
              </ModalHeader>
              <ModalBody className="overflow-auto max-h-[400px] gap-6">
                {studentsLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    {extendedStudents.map((student) => {
                      return (
                        <Checkbox
                          aria-label={student.name}
                          classNames={{
                            base: cn(
                              "inline-flex w-full max-w-md bg-content1",
                              "hover:bg-content2 items-center justify-start",
                              "cursor-pointer rounded-lg gap-2 border-2 border-transparent",
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
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Create group
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
