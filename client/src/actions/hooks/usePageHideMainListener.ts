import { useEffect } from "react";

import { ServiceSocket } from "../api/service-socket/service-socket";

import type { User } from "../interfaces/Registration/Validation";
import { AppDispatch } from "../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { ChatSocket } from "../api/chat-socket/chat-socket";

const usePageHideMainListener = (
  user: User | null,
  chat_socket: ChatSocket | null,
  service_socket: ServiceSocket | null,
  dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
) => {
  useEffect(() => {
    function handlePageHide(e: PageTransitionEvent) {
      e.preventDefault();
      if (user) {
        service_socket?.disconnectUser();
        chat_socket?.disconnectUser(dispatch);
      }
    }

    window.addEventListener("pagehide", handlePageHide);

    return () => window.removeEventListener("pagehide", handlePageHide);
  }, [service_socket, chat_socket, user]);
};

export default usePageHideMainListener;
