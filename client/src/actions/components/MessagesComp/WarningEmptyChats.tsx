import { Key } from "react";
import { Notification } from "../Notification";
import { MessageSquareX } from "lucide-react";

export const WarningEmptyChats = ({ type }: { type: Exclude<Key, bigint> }) => {
  return (
    <>
      <main className="flex flex-col flex-1">
        <Notification
          icon={<MessageSquareX width={80} height={80} />}
          message={`There are no ${type} chats yet!`}
        />
      </main>
    </>
  );
};
