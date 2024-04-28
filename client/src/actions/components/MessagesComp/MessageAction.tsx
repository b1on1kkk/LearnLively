import useChatContext from "../../hooks/useChatContext";

import { Pencil, Reply } from "lucide-react";
import { UnderChatMessage } from "./UnderChatMessage";

import { MessagActionKind } from "../../interfaces/Message/Chats";

export const MessageAction = () => {
  const { chosenMessage, setChosenMessage } = useChatContext();

  if (chosenMessage) {
    const { name, lastname } = chosenMessage.message_data.users;

    switch (chosenMessage.type) {
      case MessagActionKind.edit_message:
        return (
          <UnderChatMessage
            content={chosenMessage.message_data.content}
            title="Edit message"
            icon={<Pencil width={18} height={18} />}
            onClick={() => setChosenMessage(null)}
          />
        );
      case MessagActionKind.reply_message:
        return (
          <UnderChatMessage
            content={chosenMessage.message_data.content}
            title={`Reply to ${name} ${lastname}`}
            icon={<Reply width={18} height={18} />}
            onClick={() => setChosenMessage(null)}
          />
        );
    }
  }

  return <></>;
};
