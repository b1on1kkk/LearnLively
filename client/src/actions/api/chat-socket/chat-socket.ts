import { Socket, io } from "socket.io-client";

import WebSocket from "../abstract/webSocket";
import { AppDispatch } from "../../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import { chatSocketAcitons } from "../../store/features/chatSocket.slice";

import { DispatchActionsHandler } from "../../utils/handlers/dispatchActionsHandler";

import type { TMessage } from "../../interfaces/api/newChat";
import type { ChosenConv } from "../../interfaces/Message/Chats";
import type { MessageData } from "../../interfaces/api/messageData";
import type { TReadMessage } from "../../interfaces/api/readMessage";
import type { TDeleteMessages } from "../../interfaces/api/deleteMessages";
import { onlineUsersActions } from "../../store/features/onlineUsers.slice";

export class ChatSocket implements WebSocket {
  private socket: Socket | null;
  private reduxDispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>;
  private actionsHandler: DispatchActionsHandler;

  constructor(
    url: string,
    user_id: number,
    dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
  ) {
    this.socket = io(url);
    this.reduxDispatch = dispatch;
    this.actionsHandler = new DispatchActionsHandler(dispatch);
    this.connectUser(user_id);
  }

  ////////////////////////////////////////emitters////////////////////////////////////////////////
  public connectUser(user_id: number) {
    if (!this.socket?.connected) this.socket?.connect();

    this.socket?.emit("userChatConnected", {
      id: user_id
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

  public sendMessage(message: MessageData) {
    this.socket?.emit("sendMessage", message);
  }

  public changeEditedMessage(message: MessageData) {
    this.socket?.emit("changeEditedMessage", message);
  }

  public deleteMessages(message: TDeleteMessages) {
    this.socket?.emit("deleteMessages", message);
  }

  public connectToChatRoom(conv_id: ChosenConv | null) {
    if (conv_id) this.socket?.emit("connectToChatRoom", conv_id);
  }

  public leaveChatRoom(conv_id: ChosenConv | null) {
    if (conv_id) this.socket?.emit("leaveChatRoom", conv_id);
  }

  public readMessage(readed_user: TReadMessage) {
    this.socket?.emit("readMessage", readed_user);
  }

  ////////////////////////////////////////listeners////////////////////////////////////////////////
  public getMessage(messages: Array<TMessage>) {
    this.socket?.on("getMessage", (data: TMessage) => {
      this.actionsHandler.messageInitHandler({
        messages: [...messages, data],
        chosenMessage: null
      });
    });
  }

  public getChangedEditedMessage(messages: Array<TMessage>) {
    this.socket?.on("getChangedEditedMessage", (message: TMessage) => {
      this.actionsHandler.messageInitHandler({
        messages: [
          ...messages.map((msg) => {
            if (msg.id === message.id) return { ...message };
            return msg;
          })
        ],
        chosenMessage: null
      });
    });
  }

  // this function uses also for seen message, change it name
  public getDeletedMessages() {
    this.socket?.on("getDeletedMessages", (message: Array<TMessage>) => {
      this.actionsHandler.messageInitHandler({
        messages: message,
        chosenMessage: null
      });
    });
  }

  public getReadMessage() {
    this.socket?.on("getReadMessage", (readed_messages: Array<TMessage>) => {
      this.actionsHandler.messageInitHandler({
        messages: readed_messages,
        chosenMessage: null
      });
    });
  }

  public getOnlineUsers() {
    this.socket?.on("onlineUsers", (indexes: Array<number>) => {
      this.reduxDispatch(onlineUsersActions.onlineUsersInit(indexes));
    });
  }
}
