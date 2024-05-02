import { Check, Send } from "lucide-react";

import useChatContext from "../../hooks/useChatContext";

import { MessageActionKind } from "../../interfaces/Message/Chats";

export const MessageActionSubmitButton = () => {
  const { chosenMessage } = useChatContext();

  if (chosenMessage) {
    switch (chosenMessage.type) {
      case MessageActionKind.edit_message:
        return <Check width={18} height={18} />;
      case MessageActionKind.reply_message:
        return <Check width={18} height={18} />;
    }
  }
  return <Send width={18} height={18} />;
};
