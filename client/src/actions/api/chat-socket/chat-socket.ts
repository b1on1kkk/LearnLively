import { Socket, io } from "socket.io-client";

import WebSocket from "../abstract/webSocket";
import { AppDispatch } from "../../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";
import { ChatType } from "../../interfaces/api/chatType";
import { TConversations } from "../../interfaces/Message/Chats";
import { TMessage, TStartChat } from "../../interfaces/api/newChat";
import { messagesAcitons } from "../../store/features/messages.slice";

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

  public sendMessage(
    users_idx: number[],
    content: string,
    conversation_id: number,
    img_hash_name: string,
    name: string,
    lastname: string
  ) {
    this.socket?.emit("sendMessage", {
      users_idx,
      content,
      conversation_id,
      img_hash_name,
      name,
      lastname
    });
  }

  ////////////////////////////////////////listeners////////////////////////////////////////////////
  public justCreatedChats(setChats: (c: Array<TConversations>) => void) {
    this.socket?.on("startChat", (data: TStartChat) => {
      setChats([...data.chats]);

      this.reduxDispatch(messagesAcitons.messageInit([...data.message]));
    });
  }

  public getMessage(messages: Array<TMessage>) {
    this.socket?.on("getMessage", (data: TMessage) => {
      this.reduxDispatch(messagesAcitons.messageInit([...messages, data]));
    });
  }
}
