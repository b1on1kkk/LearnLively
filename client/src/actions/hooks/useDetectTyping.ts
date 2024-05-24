import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

const useDetectTyping = () => {
  const { chat_socket } = useSelector((c: RootState) => c.chatSocket);

  useEffect(() => {
    if (chat_socket) {
      chat_socket.getIsTypingMessage();
      chat_socket.getIsNotTypingMessage();
    }
  }, [chat_socket]);
};

export default useDetectTyping;
