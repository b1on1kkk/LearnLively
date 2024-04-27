import { useEffect } from "react";

import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { User } from "../interfaces/Registration/Validation";
import { ChatSocket } from "../api/chat-socket/chat-socket";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { chatSocketAcitons } from "../store/features/chatSocket.slice";

const useConnectChatSocket = (
  url: string,
  user: User | null,
  dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
) => {
  const { chat_socket } = useSelector((s: RootState) => s.chatSocket);

  const connectChatSocket = () => {
    dispatch(
      chatSocketAcitons.chatSocketInit(new ChatSocket(url, user!.id, dispatch))
    );
  };

  useEffect(() => {
    if (!chat_socket && user) connectChatSocket();
  }, []);

  return { chat_socket };
};

export default useConnectChatSocket;
