import useChatContext from "../../hooks/useChatContext";

import { Pencil, Reply } from "lucide-react";
import { UnderChatMessage } from "./UnderChatMessage";

import { MessageActionKind } from "../../interfaces/Message/Chats";

export const MessageAction = () => {
  const { chosenMessage, setChosenMessage } = useChatContext();

  if (chosenMessage) {
    const { name, lastname } = chosenMessage.message_data.users;

    switch (chosenMessage.type) {
      case MessageActionKind.edit_message:
        return (
          <UnderChatMessage
            content={chosenMessage.message_data.content}
            title="Edit message"
            icon={<Pencil width={18} height={18} />}
            onClick={() => setChosenMessage(null)}
          />
        );
      case MessageActionKind.reply_message:
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
