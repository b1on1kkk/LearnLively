import { Socket, io } from "socket.io-client";
import WebSocket from "../abstract/webSocket";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store/store";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";

export class ChatSocket implements WebSocket {
  private socket: Socket | null;

  constructor(url: string, user_id: number) {
    console.log("ChatSocket contructor");

    this.socket = io(url);
    this.connectUser(user_id);
  }

  ////////////////////////////////////////emitters////////////////////////////////////////////////
  public connectUser(user_id: number) {
    this.socket?.connect();

    setTimeout(() => {
      this.socket?.emit("userChatConnected", {
        user_id
      });
    }, 1000);
  }

  public disconnectUser(
    user_id: number,
    dispatch?: ThunkDispatch<AppDispatch, undefined, UnknownAction>
  ) {
    this.socket?.emit("userChatDisconnect", { user_id });

    setTimeout(() => {
      this.socket?.disconnect();

      if (dispatch) dispatch(chatSocketAcitons.chatSocketInit(null));
    }, 1000);
  }
}
