import { Socket, io } from "socket.io-client";

import WebSocket from "../abstract/webSocket";
import { AppDispatch } from "../../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";
import { ChatType } from "../../interfaces/api/chatType";

export class ChatSocket implements WebSocket {
  private socket: Socket | null;

  constructor(url: string, user_id: number) {
    this.socket = io(url);
    this.connectUser(user_id);
  }

  ////////////////////////////////////////emitters////////////////////////////////////////////////
  public connectUser(user_id: number) {
    if (!this.socket?.connected) this.socket?.connect();

    this.socket?.emit("userChatConnected", {
      user_id
    });
  }

  public disconnectUser(
    dispatch?: ThunkDispatch<AppDispatch, undefined, UnknownAction>
  ) {
    this.socket?.emit("userChatDisconnect");

    setTimeout(() => {
      this.socket?.disconnect();

      if (dispatch) dispatch(chatSocketAcitons.chatSocketInit(null));
    }, 1000);
  }

  public startChat(users_idx: number[], chat_type: ChatType, message: string) {
    this.socket?.emit("startChat", { users_idx, chat_type, message });
  }
}
