import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Tooltip
} from "@nextui-org/react";
import { CheckCheck } from "lucide-react";

import type { TMessageEditions } from "../../interfaces/Message/Chats";

import { Image } from "@nextui-org/react";
import { toImageLink } from "../../utils/Students/toImageLink";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { QUERY_ROOT } from "../../constants/Query/query";
import { useEffect, useState } from "react";

const useLastSeenMessage = () => {
  return useMutation<Array<TSeenMessages>, AxiosError, { message_id: number }>({
    mutationFn: (message: { message_id: number }) =>
      axios
        .post(
          `${QUERY_ROOT}api/seen_message`,
          {
            message_id: message.message_id
          },
          { withCredentials: true }
        )
        .then((res) => {
          return res.data;
        })
  });
};

interface TSeenMessages {
  seen_at: string;
  users: {
    name: string;
    lastname: string;
    img_hash_name: string;
  };
}

export const MessageEditions = ({
  id,
  children,
  wrapper,
  onClickAction,
  functionality,
  message_id
}: TMessageEditions) => {
  const seen_message = useLastSeenMessage();

  const [seenMessages, setSeenMessages] = useState<Array<TSeenMessages>>([]);

  useEffect(() => {
    if (seen_message.data) setSeenMessages(seen_message.data);
  }, [seen_message]);

  return (
    <Dropdown
      classNames={{
        base: "text-slate-400",
        content: "bg-[#00010d]"
      }}
    >
      <div
        className={wrapper}
        id="chat_message"
        message-id={`message_${id}`}
        onContextMenu={(e) => e.preventDefault()}
      >
        <DropdownTrigger>
          <div
            className="transition-all duration-200"
            onClick={() => seen_message.mutate({ message_id })}
          >
            {children}
          </div>
        </DropdownTrigger>
      </div>
      <DropdownMenu
        aria-label="message actions"
        classNames={{ base: "bg-[#00010d]" }}
      >
        <DropdownSection aria-label="Main">
          {functionality.map((item) => {
            return (
              <DropdownItem
                key={item.key}
                startContent={item.startContent}
                classNames={item.classNames}
                onClick={onClickAction}
                color={item.color}
              >
                {item.value}
              </DropdownItem>
            );
          })}
        </DropdownSection>

        <DropdownSection
          aria-label="Preferences"
          hidden={
            seenMessages.length === 0 && !seen_message.isPending ? true : false
          }
        >
          <DropdownItem
            key="message_seen"
            classNames={{ title: "text-xs flex flex-col gap-2" }}
            textValue="data is not exist"
          >
            {seen_message.isPending ? (
              <span className="font-semibold">Loading...</span>
            ) : seenMessages.length > 1 ? (
              <Tooltip
                closeDelay={0}
                placement="right"
                offset={15}
                content={
                  <div className="flex flex-col gap-3 p-1">
                    {seenMessages.map((seen, idx) => {
                      return (
                        <div className="flex items-center gap-2" key={idx}>
                          <div>
                            <Image
                              width={30}
                              src={toImageLink(seen.users.img_hash_name)}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <span className="font-semibold">
                              Seen at {seen.seen_at}
                            </span>
                          </div>
                          <div>
                            <CheckCheck width={14} height={14} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                }
              >
                <div className="flex items-center">
                  <div className="flex flex-1 gap-1 items-center">
                    <CheckCheck width={14} height={14} />

                    <div>
                      <span className="text-sm font-semibold">
                        {seenMessages.length} Seen
                      </span>
                    </div>
                  </div>

                  <div className="flex -space-x-3">
                    {seenMessages.map((msg, idx) => {
                      return (
                        <Image
                          key={idx}
                          width={30}
                          src={toImageLink(msg.users.img_hash_name)}
                          className="rounded-full"
                        />
                      );
                    })}
                  </div>
                </div>
              </Tooltip>
            ) : (
              <>
                {seenMessages.map((seen, idx) => {
                  return (
                    <div className="flex items-center gap-2" key={idx}>
                      <div>
                        <Image
                          width={30}
                          src={toImageLink(seen.users.img_hash_name)}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <span className="font-semibold">
                          Seen at {seen.seen_at.slice(0, -3)}
                        </span>
                      </div>
                      <div>
                        <CheckCheck width={14} height={14} />
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
