import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react";
import { CheckCheck } from "lucide-react";

import type { TMessageEditions } from "../../interfaces/Message/Chats";

export const MessageEditions = ({
  children,
  wrapper,
  onClickAction,
  seenMessages,
  functionality
}: TMessageEditions) => {
  return (
    <Dropdown
      classNames={{
        base: "text-slate-400",
        content: "bg-[#00010d]"
      }}
    >
      <div className={wrapper}>
        <DropdownTrigger>{children}</DropdownTrigger>
      </div>
      <DropdownMenu
        aria-label="message actions"
        classNames={{ base: "bg-[#00010d]" }}
        disabledKeys={["message_seen"]}
      >
        <DropdownSection
          showDivider={seenMessages && seenMessages.length > 0 ? true : false}
          aria-label="Main"
        >
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
          hidden={seenMessages && seenMessages.length > 0 ? false : true}
        >
          {/* think about how to optimize this code */}
          <DropdownItem
            key="message_seen"
            startContent={<CheckCheck width={14} height={14} />}
            classNames={{ title: "text-xs" }}
            className="cursor-default"
            isReadOnly={true}
            textValue="data is not exist"
          >
            {seenMessages &&
              seenMessages.map((seen) => {
                return (
                  <>
                    Today at{" "}
                    {new Date(seen.seen_at).toISOString().slice(11, 16)}
                  </>
                );
              })}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
