import { Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

import { toImageLink } from "../../utils/Students/toImageLink";

import type { Student } from "../../interfaces/Students/Main";

export const ChatCard = ({
  users,
  onClick
}: {
  users: Student;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <NavLink
      key={users.id}
      to={`:${users.id}`}
      className={({ isActive }) =>
        isActive
          ? "flex gap-3 p-2 items-center bg-gray-700 text-white transition-colors duration-200 rounded-xl h-20"
          : "flex gap-3 p-2 items-center hover:bg-gray-600 hover:text-white transition-colors duration-200 rounded-xl h-20"
      }
      onClick={onClick}
    >
      <div>
        <Image
          width={65}
          height={65}
          src={toImageLink(users.img_hash_name)}
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center">
          <span className="font-semibold flex-1">
            {users.name} {users.lastname}
          </span>
          <span className="text-[11px]">13:10</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-xs flex-1">
            last message here
          </span>
          {/* pinned messages in future */}
          {/* <span className="rotate-45">
            <Pin width={13} height={13} />
          </span> */}
        </div>
      </div>
    </NavLink>
  );
};
