import useChats from "../../hooks/useChats";
import useStudents from "../../hooks/useStudents";
import { useEffect } from "react";
import { useDisclosure } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";

import { Bot, UsersRound } from "lucide-react";
import { Outlet, useOutlet } from "react-router-dom";

import { Loading } from "../../components/Loading/Loading";
import { Notification } from "../../components/Notification";
import { SystemButton } from "../../components/SystemButton";
import { ChatCard } from "../../components/MessagesComp/ChatCard";
import { GroupChatModal } from "../../components/MessagesComp/GroupChatModal";
import { WarningEmptyChats } from "../../components/MessagesComp/WarningEmptyChats";

import { AppDispatch, RootState } from "../../store/store";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";

export const Message = () => {
  const outlet = useOutlet();

  // for modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // data handlers
  const { isLoading } = useChats();
  const { refetch } = useStudents();

  const dispatch = useDispatch<AppDispatch>();
  const { chats } = useSelector((c: RootState) => c.chats);
  const { chat_socket } = useSelector((s: RootState) => s.chatSocket);

  // listener
  useEffect(() => {
    if (chat_socket) chat_socket.getJustCreatedChats();
  }, [chat_socket]);

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
        {isLoading ? (
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

      <GroupChatModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
