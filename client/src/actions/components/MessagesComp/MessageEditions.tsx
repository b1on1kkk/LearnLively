import { useMemo } from "react";

import useLastSeenMessage from "../../hooks/useLastSeenMessage";
import useMarkMessagesAsRead from "../../hooks/useMarkMessagesAsRead";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react";

import { lastSeenMsgDateFormatting } from "../../utils/Message/lastSeenMsgDateFormatting";

import type { TMessageEditions } from "../../interfaces/Message/Chats";

export const MessageEditions = ({
  id,
  children,
  wrapper,
  onClickAction,
  functionality,
  message
}: TMessageEditions) => {
  const seen_message = useLastSeenMessage();
  const messageRef = useMarkMessagesAsRead(message);

  const last_seen = useMemo(() => {
    if (seen_message.data) return new Date(seen_message.data.seen_at);
  }, [seen_message.data]);

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
        ref={messageRef}
      >
        <DropdownTrigger>
          <div
            className="transition-all duration-200"
            onClick={() => seen_message.mutate({ message_id: message.id })}
          >
            {children}
          </div>
        </DropdownTrigger>
      </div>
      <DropdownMenu
        aria-label="message actions"
        classNames={{ base: "bg-[#00010d]" }}
        disabledKeys={["loading", "last_seen"]}
      >
        <DropdownSection
          aria-label="Main"
          showDivider={last_seen || seen_message.isPending ? true : false}
          classNames={{ base: "mb-0" }}
        >
          {functionality.map((item) => {
            return (
              <DropdownItem
                textValue="item value"
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

        {seen_message.isPending ? (
          <DropdownSection aria-label="loading" classNames={{ base: "mb-0" }}>
            <DropdownItem key="loading" textValue="loading...">
              loading...
            </DropdownItem>
          </DropdownSection>
        ) : (
          <DropdownSection
            aria-label="was seen at"
            hidden={last_seen ? false : true}
            classNames={{ base: "mb-0" }}
          >
            <DropdownItem key="last_seen" textValue="last seen">
              {lastSeenMsgDateFormatting(last_seen)}
            </DropdownItem>
          </DropdownSection>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
