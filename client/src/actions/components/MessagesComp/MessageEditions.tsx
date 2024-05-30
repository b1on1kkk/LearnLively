import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react";

import type {
  TMessageEditions,
  TSeenMessages
} from "../../interfaces/Message/Chats";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useLastSeenMessage from "../../hooks/useLastSeenMessage";

export const MessageEditions = ({
  id,
  children,
  wrapper,
  onClickAction,
  functionality,
  message
}: TMessageEditions) => {
  const seen_message = useLastSeenMessage();

  const { user } = useSelector((u: RootState) => u.user);

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
            onClick={() =>
              seen_message.mutate({ message_id: message.id, user_id: user!.id })
            }
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
      </DropdownMenu>
    </Dropdown>
  );
};
