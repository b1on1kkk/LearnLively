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
  lastSeen,
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
          showDivider={lastSeen ? true : false}
          aria-label="Main"
        >
          {functionality.map((item) => {
            return (
              <DropdownItem
                key={item.key}
                startContent={item.startContent}
                classNames={item.classNames}
                onClick={onClickAction}
              >
                {item.value}
              </DropdownItem>
            );
          })}
        </DropdownSection>

        <DropdownSection
          aria-label="Preferences"
          hidden={lastSeen ? false : true}
        >
          <DropdownItem
            key="message_seen"
            startContent={<CheckCheck width={14} height={14} />}
            classNames={{ title: "text-xs" }}
            className="cursor-default"
            isReadOnly={true}
          >
            {lastSeen && (
              <>Today at {new Date(lastSeen).toISOString().slice(11, 16)}</>
            )}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
