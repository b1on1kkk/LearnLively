import { useEffect } from "react";

import { AppDispatch } from "../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import { ChatSocket } from "../api/chat-socket/chat-socket";

import type { User } from "../interfaces/Registration/Validation";

const LISTENERS_EVENTS = [
  "mousedown",
  "mousemove",
  "wheel",
  "keydown",
  "touchstart",
  "scroll",
  "click"
];

const useChatActivity = (
  user: User,
  chat_socket: ChatSocket | null,
  dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let status: boolean = false;

    function handleActivity() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      if (status) {
        chat_socket?.connectUser(user.id);
        status = false;
      }

      timeoutId = setTimeout(() => {
        chat_socket?.disconnectUser(user.id);
        status = true;
      }, 15000);
    }

    if (chat_socket) handleActivity();

    LISTENERS_EVENTS.forEach((event) => {
      if (chat_socket) window.addEventListener(event, handleActivity);
    });

    return () => {
      LISTENERS_EVENTS.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );

      if (timeoutId) clearTimeout(timeoutId);

      // getting dispatch here just for setting socket to null. in future, if user reenter message route - reconnect new socket
      chat_socket?.disconnectUser(user.id, dispatch);

      timeoutId = null;
      status = false;
    };
  }, [chat_socket]);
};

export default useChatActivity;
