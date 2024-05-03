import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

const useChatListeners = () => {
  const { messages } = useSelector((m: RootState) => m.messages);
  const { chat_socket } = useSelector((c: RootState) => c.chatSocket);

  useEffect(() => {
    if (messages.length > 0) {
      chat_socket?.getChangedEditedMessage(messages);
      chat_socket?.getDeletedMessages();
    }
    chat_socket?.getMessage(messages);
  }, [messages]);
};

export default useChatListeners;
