import axios from "axios";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useOutlet } from "react-router-dom";
import useConnectChatSocket from "../../hooks/useConnectChatSocket";

import { Tooltip } from "@nextui-org/react";
import { Bot, Info, MessageSquareX } from "lucide-react";

import { Loading } from "../../components/Loading/Loading";
import { Notification } from "../../components/Notification";

import { RootState } from "../../store/store";

import { QUERY_ROOT } from "../../constants/Query/query";

const useChats = () => {
  return useQuery({
    queryKey: ["api", "chats"],
    queryFn: async () => {
      return await axios
        .get(`${QUERY_ROOT}api/chats`, { withCredentials: true })
        .then((res) => res.data)
        .catch((err) => err);
    }
  });
};

export const Message = () => {
  const outlet = useOutlet();
  const { data, isLoading } = useChats();

  const user = useSelector((u: RootState) => u.user);
  const { chat_socket } = useSelector((s: RootState) => s.socket);
  useConnectChatSocket("http://localhost:3001/chat", user);

  useEffect(() => {
    if (user) chat_socket?.connectUser(user.id);
  }, [user, chat_socket]);

  // if user close tab or leave - disable websocket connection
  useEffect(() => {
    function handlePageHide(e: PageTransitionEvent) {
      e.preventDefault();

      if (user) chat_socket?.disconnectUser(user.id);
    }

    window.addEventListener("pagehide", handlePageHide);

    return () => window.removeEventListener("pagehide", handlePageHide);
  }, [chat_socket, user]);

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

      <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-5 flex flex-col max-w-72 text-slate-400">
        {isLoading ? (
          <Loading />
        ) : data.length > 0 ? (
          <></>
        ) : (
          <>
            <header className="flex justify-end">
              <Tooltip
                delay={0}
                closeDelay={0}
                content="Add users to friends list, and start chatting!"
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
          </>
        )}
      </div>
    </div>
  );
};
