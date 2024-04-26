import useChats from "../../hooks/useChats";

import { Bot } from "lucide-react";
import { Outlet, useOutlet } from "react-router-dom";

import { Loading } from "../../components/Loading/Loading";
import { Notification } from "../../components/Notification";
import { ChatCard } from "../../components/MessagesComp/ChatCard";
import { WarningEmptyChats } from "../../components/MessagesComp/WarningEmptyChats";

export const Message = () => {
  const outlet = useOutlet();
  const { data, isLoading } = useChats();

  return (
    <div className="flex h-full relative px-8 pb-6 pt-12 gap-8">
      <main className="h-full bg-[#050615] rounded-2xl shadow-2xl border-slate-900 border-2 overflow-auto z-10 flex-1">
        {outlet ? (
          <Outlet />
        ) : (
          <Notification
            icon={<Bot width={80} height={80} />}
            message="Select chat to start chatting!"
          />
        )}
      </main>

      <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-3 flex flex-col max-w-72 text-slate-400">
        {isLoading ? (
          <Loading />
        ) : data && data.users_conversations.length > 0 ? (
          <>
            {data.users_conversations[0].conversations.users_conversations.map(
              (user) => (
                <ChatCard users={user.users} />
              )
            )}
          </>
        ) : (
          <WarningEmptyChats />
        )}
      </div>
    </div>
  );
};
