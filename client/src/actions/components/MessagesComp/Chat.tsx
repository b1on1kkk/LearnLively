import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Main } from "./Main";
import { Header } from "./Header";
import { Footer } from "./Footer";

import { RootState } from "../../store/store";

export const Chat = () => {
  const { chat_socket, chosenConvId } = useSelector(
    (c: RootState) => c.chatSocket
  );
  const { messages } = useSelector((m: RootState) => m.messages);

  useEffect(() => {
    if (messages.length > 0) chat_socket?.getChangedEditedMessage(messages);
  }, [messages]);

  useEffect(() => {
    if (chat_socket && chosenConvId) {
      chat_socket.connectToChatRoom(chosenConvId);
    }
    return () => {
      if (chat_socket && chosenConvId) {
        chat_socket.leaveChatRoom(chosenConvId);
      }
    };
  }, [chat_socket, chosenConvId]);

  return (
    <div className="flex h-full p-3 flex-col">
      <Header />

      <Main />

      <Footer />
    </div>
  );
};
