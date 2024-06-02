import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDisclosure } from "@nextui-org/react";
import useChatListeners from "../../hooks/useChatListeners";
import useRoomConnection from "../../hooks/useRoomConnection";

import { Main } from "./Main";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ConfirmationModal } from "./ConfirmationModal";

import { RootState } from "../../store/store";

export const Chat = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { chat_socket } = useSelector((c: RootState) => c.chatSocket);

  useChatListeners();
  useRoomConnection();

  useEffect(() => {
    if (chat_socket) chat_socket.getReadMessage();
  }, [chat_socket]);

  return (
    <div className="flex h-full p-3 flex-col overflow-hidden">
      <Header />

      <Main />

      <Footer onOpen={onOpen} />

      <ConfirmationModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
