import { Tooltip } from "@nextui-org/react";
import { Notification } from "../Notification";
import { Info, MessageSquareX } from "lucide-react";

export const WarningEmptyChats = () => {
  return (
    <>
      <header className="flex justify-end">
        <Tooltip
          delay={0}
          closeDelay={0}
          content="Add users to friends list, and start chatting!"
          placement="left"
          className="bg-gradient-to-r from-green-400 to-blue-500 font-semibold"
        >
          <div className="hover:text-white transition-colors duration-200">
            <Info width={20} height={20} />
          </div>
        </Tooltip>
      </header>

      <main className="flex flex-col flex-1">
        <Notification
          icon={<MessageSquareX width={80} height={80} />}
          message="There are no chats yet!"
        />
      </main>
    </>
  );
};
