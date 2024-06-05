import { Key } from "react";
import { Notification } from "../Notification";
import { MessageCircleWarning } from "lucide-react";

export const WarningEmptyChats = ({ type }: { type: Exclude<Key, bigint> }) => {
  return (
    <>
      <main className="flex flex-col flex-1">
        <Notification
          icon={<MessageCircleWarning width={80} height={80} />}
          message={`There are no ${type} chats yet!`}
        />
      </main>
    </>
  );
};
