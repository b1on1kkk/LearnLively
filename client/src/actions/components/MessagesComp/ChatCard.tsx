import { useSelector } from "react-redux";
import useConvInTyping from "../../hooks/useConvInTyping";

import { Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { UsersRound, Check, CheckCheck } from "lucide-react";

import { RootState } from "../../store/store";

import { isOnline } from "../../utils/Message/isOnline";
import { ChatGuard } from "../../utils/Message/chatGuard";
import { toImageLink } from "../../utils/Students/toImageLink";

import type { TChatCard } from "../../interfaces/Message/Chats";

export const ChatCard = ({ data, onClick, uuid_code }: TChatCard) => {
  const { user } = useSelector((u: RootState) => u.user);
  const { typed } = useSelector((t: RootState) => t.typed);
  const { online_users } = useSelector((o: RootState) => o.onlineUsers);

  const convsInTyping = useConvInTyping(typed, data.conversations.id);

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
          <div className="w-[50px] h-[50px] relative">
            <Image
              src={toImageLink(
                data.conversations.users_conversations[0].users.img_hash_name
              )}
              className="rounded-full"
            />

            {isOnline(
              online_users,
              data.conversations.users_conversations[0].users.id
            ) && (
              <span className="flex absolute h-3 w-3 bottom-0 right-0 -mt-1 -mr-1 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-400"></span>
              </span>
            )}
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
                    {convsInTyping ? (
                      <span className="text-primary-500">
                        {convsInTyping.user.length > 1 ? (
                          <>
                            {convsInTyping.user[0].name} and +
                            {convsInTyping.user.length - 1} typing...
                          </>
                        ) : (
                          <>{convsInTyping.user[0].name} typing...</>
                        )}
                      </span>
                    ) : (
                      <>
                        <span className="mr-1 text-primary-500 font-bold">
                          {user!.id !== data.conversations.last_message.user_id
                            ? `${data.conversations.last_message.users.name}:`
                            : "You:"}
                        </span>
                        {data.conversations.last_message.content}
                      </>
                    )}
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
                {convsInTyping ? (
                  <span className="text-primary-500">typing...</span>
                ) : (
                  <>
                    {data.conversations.last_message
                      ? data.conversations.last_message.content
                      : "There are no messages yet"}
                  </>
                )}
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
