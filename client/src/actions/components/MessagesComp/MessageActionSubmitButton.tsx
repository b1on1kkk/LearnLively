import { useSelector } from "react-redux";

import { Check, Send } from "lucide-react";

import { RootState } from "../../store/store";

import { MessageActionKind } from "../../interfaces/Message/Chats";

export const MessageActionSubmitButton = () => {
  const { chosenMessage } = useSelector((m: RootState) => m.messages);

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
