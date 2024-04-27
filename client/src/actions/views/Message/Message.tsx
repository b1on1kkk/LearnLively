import { useDispatch, useSelector } from "react-redux";
import useChats from "../../hooks/useChats";
import { useEffect, useState } from "react";

import { Bot } from "lucide-react";
import { Outlet, useOutlet } from "react-router-dom";

import { Loading } from "../../components/Loading/Loading";
import { Notification } from "../../components/Notification";
import { ChatCard } from "../../components/MessagesComp/ChatCard";
import { WarningEmptyChats } from "../../components/MessagesComp/WarningEmptyChats";

import { MyChatContext } from "../../context/Message/chatContext";

import { AppDispatch, RootState } from "../../store/store";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";

import type { TConversations } from "../../interfaces/Message/Chats";

export const Message = () => {
  const outlet = useOutlet();
  const { data, isLoading } = useChats();

  const dispatch = useDispatch<AppDispatch>();

  const [chats, setChats] = useState<Array<TConversations>>([]);

  const { messages } = useSelector((m: RootState) => m.messages);
  const { chat_socket } = useSelector((c: RootState) => c.chatSocket);

  const [chosenConvId, setChosenConvId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setChats([...data.users_conversations]);
      chat_socket?.justCreatedChats(setChats);
      chat_socket?.getMessage(messages);
    }
  }, [data, chat_socket, messages]);

  return (
    <div className="flex h-full relative p-8 gap-8 w-full">
      <MyChatContext.Provider value={{ chosenConvId }}>
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
          ) : chats.length > 0 ? (
            <>
              {chats.map((conv) => {
                const user = conv.conversations.users_conversations[0].users;
                return (
                  <ChatCard
                    users={user}
                    onClick={() => {
                      dispatch(chosenUserChatActions.chosenUserInit(user));

                      setChosenConvId(conv.conversations.id);
                    }}
                    key={user.id}
                  />
                );
              })}
            </>
          ) : (
            <WarningEmptyChats />
          )}
        </aside>
      </MyChatContext.Provider>
    </div>
  );
};
