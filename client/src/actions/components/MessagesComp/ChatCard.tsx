import { UsersRound } from "lucide-react";
import { Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

import { toImageLink } from "../../utils/Students/toImageLink";

import type { Group } from "../../interfaces/Message/Chats";
import type { Student } from "../../interfaces/Students/Main";

interface TChatCard {
  uuid_code: string;
  data: Student | Group;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

// define private or group chats
function ChatGuard(data: Student | Group): data is Group {
  return (data as Group).group_name !== undefined;
}

export const ChatCard = ({ data, onClick, uuid_code }: TChatCard) => {
  return (
    <NavLink
      to={`${uuid_code}`}
      className={({ isActive }) =>
        isActive
          ? "flex gap-3 p-2 items-center bg-gray-700 text-white transition-colors duration-200 rounded-xl h-20"
          : "flex gap-3 p-2 items-center hover:bg-gray-600 hover:text-white transition-colors duration-200 rounded-xl h-20"
      }
      onClick={onClick}
    >
      <div>
        {ChatGuard(data) ? (
          <div className="w-[50px] h-[50px] rounded-full bg-primary-500 flex items-center justify-center uppercase text-white text-xl font-semibold">
            <span>{data.group_name[0]}</span>
          </div>
        ) : (
          <Image
            width={65}
            height={65}
            src={toImageLink(data.img_hash_name)}
            className="rounded-full"
          />
        )}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          {ChatGuard(data) ? (
            <>
              <div>
                <UsersRound width={15} height={15} />
              </div>

              <span className="font-semibold flex-1">{data.group_name}</span>
            </>
          ) : (
            <span className="font-semibold flex-1">
              {data.name} {data.lastname}
            </span>
          )}

          <span className="text-[11px]">13:10</span>
        </div>
        <div className="flex items-center">
          {ChatGuard(data) ? (
            <p className="font-semibold text-xs flex-1">
              <span className="mr-1 text-primary-500 font-bold">Alex:</span>
              last message here
            </p>
          ) : (
            <p className="font-semibold text-xs flex-1">last message here</p>
          )}
        </div>
      </div>
    </NavLink>
  );
};
