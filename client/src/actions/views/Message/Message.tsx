import { Outlet, useOutlet } from "react-router-dom";

import { Bot, Info, MessageSquareX } from "lucide-react";

import { Tooltip } from "@nextui-org/react";

import { Notification } from "../../components/Notification";

export const Message = () => {
  const outlet = useOutlet();

  return (
    <div className="flex h-screen relative px-8 pb-6 pt-12 gap-8">
      <main className="h-full bg-[#050615] rounded-2xl shadow-2xl border-slate-900 border-2 overflow-auto z-10 flex-1">
        {outlet ? (
          <Outlet />
        ) : (
          <Notification
            icon={<Bot width={80} height={80} />}
            message=" Select chat to start chatting!"
          />
        )}
      </main>

      <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-5 flex flex-col max-w-72 text-slate-400">
        <header className="flex justify-end">
          <Tooltip
            delay={0}
            closeDelay={0}
            content="To create chats add users to your friends list and then write them message!"
            placement="left"
            className="bg-gradient-to-r from-green-400 to-blue-500 font-semibold"
          >
            <div className="hover:text-white transition-colors duration-200">
              <Info width={20} height={20} />
            </div>
          </Tooltip>
        </header>

        <main className="flex flex-col flex-1">
          <Notification
            icon={<MessageSquareX width={80} height={80} />}
            message="There are no chats yet!"
          />
        </main>
      </div>
    </div>
  );
};
