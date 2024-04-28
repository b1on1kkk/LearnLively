import { useEffect } from "react";
import { useSelector } from "react-redux";
import useChatContext from "../../hooks/useChatContext";

import { Main } from "./Main";
import { Header } from "./Header";
import { Footer } from "./Footer";

import { RootState } from "../../store/store";

export const Chat = () => {
  const { chosenConvId } = useChatContext();

  const { user } = useSelector((c: RootState) => c.user);
  const { chat_socket } = useSelector((c: RootState) => c.chatSocket);

  useEffect(() => {
    if (chat_socket && chosenConvId) {
      chat_socket.connectToChatRoom(chosenConvId.group_uuid, user!.id);
    }
  }, [chat_socket, chosenConvId]);

  return (
    <div className="flex h-full p-3 flex-col">
      <Header />

      <Main />

      <Footer />
    </div>
  );
};
