import { useEffect } from "react";
import { useSelector } from "react-redux";
import useLocalStorage from "./useLocalStorage";

import { AppDispatch, RootState } from "../store/store";
import { chatSocketAcitons } from "../store/features/chatSocket.slice";

import { ChatSocket } from "../api/chat-socket/chat-socket";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import type { User } from "../interfaces/Registration/Validation";

const useConnectChatSocket = (
  url: string,
  user: User | null,
  dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
) => {
  const { chat_socket } = useSelector((s: RootState) => s.chatSocket);
  const { storedValue } = useLocalStorage("device_id", "");

  const connectChatSocket = () => {
    dispatch(
      chatSocketAcitons.chatSocketInit(
        new ChatSocket(url, user!.id, dispatch, storedValue)
      )
    );
  };

  useEffect(() => {
    if (!chat_socket && user) connectChatSocket();
  }, []);

  return { chat_socket };
};

export default useConnectChatSocket;
