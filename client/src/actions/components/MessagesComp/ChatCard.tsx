import { useDispatch } from "react-redux";

import { Pin } from "lucide-react";
import { Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

import { AppDispatch } from "../../store/store";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";

import { toImageLink } from "../../utils/Students/toImageLink";

import type { Student } from "../../interfaces/Students/Main";

export const ChatCard = ({ users }: { users: Student }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <NavLink
      key={users.id}
      to={`:${users.id}`}
      className={
        "flex gap-3 p-2 items-center hover:bg-gray-600 hover:text-white transition-colors duration-200 rounded-xl"
      }
      onClick={() => dispatch(chosenUserChatActions.chosenUserInit(users))}
    >
      <div>
        <Image width={60} src={toImageLink(users.img_hash_name)} />
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
          <span className="rotate-45">
            <Pin width={13} height={13} />
          </span>
        </div>
      </div>
    </NavLink>
  );
};
