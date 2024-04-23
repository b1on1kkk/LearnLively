import { Outlet, useOutlet } from "react-router-dom";

import { Bot, Info, MessageSquareX } from "lucide-react";

import { Tooltip } from "@nextui-org/react";

import { Notification } from "../../components/Notification";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Loading } from "../Loading/Loading";
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
  const { data, isLoading } = useChats();

  const outlet = useOutlet();

  console.log(data);

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
