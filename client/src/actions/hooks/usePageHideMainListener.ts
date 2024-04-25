import { useEffect } from "react";

import { ServiceSocket } from "../api/service-socket/service-socket";

import type { User } from "../interfaces/Registration/Validation";
import { AppDispatch } from "../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { ChatSocket } from "../api/chat-socket/chat-socket";

const usePageHideMainListener = (
  user: User,
  chat_socket: ChatSocket | null,
  service_socket: ServiceSocket | null,
  dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
) => {
  useEffect(() => {
    function handlePageHide(e: PageTransitionEvent) {
      e.preventDefault();
      service_socket?.disconnectUser(user.id);
      chat_socket?.disconnectUser(user.id, dispatch);
    }

    window.addEventListener("pagehide", handlePageHide);

    return () => window.removeEventListener("pagehide", handlePageHide);
  }, [service_socket, chat_socket, user]);
};

export default usePageHideMainListener;
