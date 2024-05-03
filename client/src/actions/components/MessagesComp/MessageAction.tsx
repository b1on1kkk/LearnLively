import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pencil, Reply } from "lucide-react";
import { UnderChatMessage } from "./UnderChatMessage";

import { AppDispatch, RootState } from "../../store/store";

import { DispatchActionsHandler } from "../../utils/handlers/dispatchActionsHandler";

import { MessageActionKind } from "../../interfaces/Message/Chats";

export const MessageAction = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dispatchActionsHandler = useMemo(
    () => new DispatchActionsHandler(dispatch),
    []
  );

  const { messages, chosenMessage } = useSelector((m: RootState) => m.messages);

  if (chosenMessage) {
    const { name, lastname } = chosenMessage.message_data.users;

    switch (chosenMessage.type) {
      case MessageActionKind.edit_message:
        return (
          <UnderChatMessage
            content={chosenMessage.message_data.content}
            title="Edit message"
            icon={<Pencil width={18} height={18} />}
            onClick={() => {
              dispatchActionsHandler.messageDisableActionHandler(messages);
            }}
          />
        );
      case MessageActionKind.reply_message:
        return (
          <UnderChatMessage
            content={chosenMessage.message_data.content}
            title={`Reply to ${name} ${lastname}`}
            icon={<Reply width={18} height={18} />}
            onClick={() => {
              dispatchActionsHandler.messageDisableActionHandler(messages);
            }}
          />
        );
    }
  }

  return <></>;
};
