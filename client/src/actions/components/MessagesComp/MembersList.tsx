import { useSelector } from "react-redux";

import { Image } from "@nextui-org/react";
import { UsersRound } from "lucide-react";

import { isOnline } from "../../utils/Message/isOnline";
import { toImageLink } from "../../utils/Students/toImageLink";

import { RootState } from "../../store/store";

import type { Group } from "../../interfaces/Message/Chats";

export const MembersList = ({ chosenGroup }: { chosenGroup: Group }) => {
  const { online_users } = useSelector((i: RootState) => i.onlineUsers);

  return (
    <div className="flex flex-col gap-3">
      <header className="flex gap-3 px-2 py-1">
        <div>
          <UsersRound width={18} height={18} />
        </div>
        <div>
          <p>{chosenGroup.group_users.length} members</p>
        </div>
      </header>

      <main className="flex flex-col gap-2">
        {chosenGroup.group_users.map((user) => {
          const { users } = user;

          return (
            <div
              className="flex gap-3 hover:bg-gray-600 px-2 py-1 select-none transition-colors rounded-lg"
              key={users.id}
            >
              <div className="w-[40px] h-[40px]">
                <Image
                  src={toImageLink(users.img_hash_name)}
                  className="rounded-full"
                />
              </div>
              <div className="flex">
                <div>
                  <p>
                    {users.name} {users.lastname}
                  </p>
                  {isOnline(online_users, users.id) ? (
                    <p className="text-xs text-primary-500">online</p>
                  ) : (
                    <p className="text-xs text-slate-400">offline</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
