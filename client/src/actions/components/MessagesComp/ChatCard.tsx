import { useSelector } from "react-redux";

import { UsersRound, Check, CheckCheck } from "lucide-react";
import { Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

import { toImageLink } from "../../utils/Students/toImageLink";

import { RootState } from "../../store/store";

import type { Group, TConversations } from "../../interfaces/Message/Chats";

interface TChatCard {
  uuid_code: string;
  data: TConversations | Group;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

// define private or group chats
function ChatGuard(data: TConversations | Group): data is Group {
  return (data as Group).group_name !== undefined;
}

export const ChatCard = ({ data, onClick, uuid_code }: TChatCard) => {
  const { user } = useSelector((u: RootState) => u.user);

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
          <div className="w-[50px] h-[50px]">
            <Image
              src={toImageLink(
                data.conversations.users_conversations[0].users.img_hash_name
              )}
              className="rounded-full"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col overflow-hidden flex-1">
        <div className="flex items-center gap-2">
          {ChatGuard(data) ? (
            <>
              <div>
                <UsersRound width={15} height={15} />
              </div>

              <span className="font-semibold flex-1">{data.group_name}</span>

              <span className="text-[11px]">
                {data.conversations.last_message
                  ? data.conversations.last_message.sent_at.slice(0, -3)
                  : ""}
              </span>
            </>
          ) : (
            <>
              <span className="font-semibold flex-1">
                {data.conversations.users_conversations[0].users.name}{" "}
                {data.conversations.users_conversations[0].users.lastname}
              </span>

              <span className="text-[11px]">
                {data.conversations.last_message
                  ? data.conversations.last_message.sent_at.slice(0, -3)
                  : ""}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {ChatGuard(data) ? (
            <>
              {data.conversations.last_message ? (
                <>
                  <p className="font-semibold text-xs overflow-hidden whitespace-nowrap text-ellipsis flex-1">
                    <span className="mr-1 text-primary-500 font-bold">
                      {user!.id !== data.conversations.last_message.user_id
                        ? `${data.conversations.last_message.users.name}:`
                        : "You:"}
                    </span>
                    {data.conversations.last_message.content}
                  </p>

                  {user!.id === data.conversations.last_message.user_id && (
                    <div>
                      {data.conversations.last_message.seen ? (
                        <CheckCheck width={13} height={13} />
                      ) : (
                        <Check width={13} height={13} />
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="font-semibold text-xs overflow-hidden whitespace-nowrap text-ellipsis flex-1">
                  There are no messages yet
                </p>
              )}
            </>
          ) : (
            <>
              <p className="font-semibold text-xs overflow-hidden whitespace-nowrap text-ellipsis flex-1">
                {data.conversations.last_message
                  ? data.conversations.last_message.content
                  : "There are no messages yet"}
              </p>

              <div>
                {data.conversations.last_message && (
                  <>
                    {data.conversations.last_message.seen ? (
                      <CheckCheck width={13} height={13} />
                    ) : (
                      <Check width={13} height={13} />
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </NavLink>
  );
};
