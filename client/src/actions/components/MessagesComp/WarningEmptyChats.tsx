import { Tooltip } from "@nextui-org/react";
import { Notification } from "../Notification";
import { Info, MessageSquareX, UsersRound } from "lucide-react";
import { SystemButton } from "../SystemButton";

interface TWarningEmptyChats {
  onOpenGroupModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const WarningEmptyChats = ({ onOpenGroupModal }: TWarningEmptyChats) => {
  return (
    <>
      <header className="flex justify-end">
        <Tooltip
          delay={0}
          closeDelay={0}
          content={
            <div className="p-1">
              <div className="text-small font-semibold">Small tip</div>
              <div className="text-tiny">
                Add users to friends list, and start chatting!
              </div>
            </div>
          }
          placement="left"
          color="primary"
        >
          <div className="hover:text-white transition-colors duration-200 min-w-10 flex items-center justify-center">
            <Info width={20} height={20} />
          </div>
        </Tooltip>

        <SystemButton
          label="create_group"
          icon={<UsersRound width={18} height={18} />}
          onClick={onOpenGroupModal}
        />
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
