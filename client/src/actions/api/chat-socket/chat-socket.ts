import { Socket, io } from "socket.io-client";

import WebSocket from "../abstract/webSocket";
import { AppDispatch } from "../../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import { messagesAcitons } from "../../store/features/messages.slice";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";

import type { TMessage } from "../../interfaces/api/newChat";
import type { ChatType } from "../../interfaces/api/chatType";
import type { ChosenConv } from "../../interfaces/Message/Chats";

interface MessageData {
  uuid: string;
  message: Omit<TMessage, "id">;
}

export class ChatSocket implements WebSocket {
  private socket: Socket | null;
  private reduxDispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>;

  constructor(
    url: string,
    user_id: number,
    dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
  ) {
    this.socket = io(url);
    this.reduxDispatch = dispatch;
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

  public sendMessage(message: MessageData) {
    this.socket?.emit("sendMessage", message);
  }

  public changeEditedMessage(message: { uuid: string; message: TMessage }) {
    this.socket?.emit("changeEditedMessage", message);
  }

  public connectToChatRoom(uuid: ChosenConv | null) {
    if (uuid) this.socket?.emit("connectToChatRoom", uuid);
  }

  public leaveChatRoom(uuid: ChosenConv | null) {
    if (uuid) this.socket?.emit("leaveChatRoom", uuid);
  }

  ////////////////////////////////////////listeners////////////////////////////////////////////////
  public getMessage(messages: Array<TMessage>) {
    this.socket?.on("getMessage", (data: TMessage) => {
      this.reduxDispatch(messagesAcitons.messageInit([...messages, data]));
    });
  }

  public getChangedEditedMessage(messages: Array<TMessage>) {
    this.socket?.on("getChangedEditedMessage", (message: TMessage) => {
      console.log(message);

      this.reduxDispatch(
        messagesAcitons.messageInit([
          ...messages.map((msg) => {
            if (msg.id === message.id) return { ...message };
            return msg;
          })
        ])
      );
    });
  }
}
