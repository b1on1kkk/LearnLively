import { Image } from "@nextui-org/react";
import { Check, CheckCheck } from "lucide-react";

import { toImageLink } from "../../utils/Students/toImageLink";

import type { TMessage } from "../../interfaces/api/newChat";

export const UserMessage = ({ message }: { message: TMessage }) => {
  return (
    <>
      <div
        className={`max-w-[300px] min-w-[150px] px-3 py-2 rounded-2xl ${
          message.selected ? "bg-indigo-400" : "bg-indigo-500"
        } break-all text-white transition-colors duration-100 ease-in`}
      >
        {message.replies_to && (
          <div className="flex flex-col p-1 border-l-3 bg-white/20 rounded-r-lg pl-2">
            <h1 className="text-sm font-semibold">
              {message.messages?.users.name}
            </h1>
            <span className="text-sm truncate">
              {message.messages?.content}
            </span>
          </div>
        )}

        <p className="font-semibold">{message.content}</p>

        <div className="flex gap-1 justify-end items-center">
          {message.edited && (
            <span className="text-[10px] font-semibold">edited</span>
          )}
          <span className="text-[11px] font-semibold">
            {message.delivered_at.slice(0, -3)}
          </span>
          <span>
            {message.seen ? (
              <CheckCheck width={13} height={13} />
            ) : (
              <Check width={13} height={13} />
            )}
          </span>
        </div>
      </div>

      <div className="flex items-end">
        <Image
          width={45}
          src={toImageLink(message.users.img_hash_name)}
          className="rounded-full"
        />
      </div>
    </>
  );
};
