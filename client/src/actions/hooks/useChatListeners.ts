import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

const useChatListeners = () => {
  const { user } = useSelector((u: RootState) => u.user);
  const { messages } = useSelector((m: RootState) => m.messages);
  const { chat_socket } = useSelector((c: RootState) => c.chatSocket);

  useEffect(() => {
    if (messages.length > 0 && user) {
      chat_socket?.getDeletedMessages(user.id);
      chat_socket?.getChangedEditedMessage(messages, user.id);
    }
    chat_socket?.getMessage(messages);
  }, [messages, user]);
};

export default useChatListeners;
