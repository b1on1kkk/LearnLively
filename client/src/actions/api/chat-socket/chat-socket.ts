import { Socket, io } from "socket.io-client";

import WebSocket from "../abstract/webSocket";
import { AppDispatch } from "../../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import { chatsActions } from "../../store/features/chats.slice";
import { chatSocketAcitons } from "../../store/features/chatSocket.slice";

import { DispatchActionsHandler } from "../../utils/handlers/dispatchActionsHandler";

import type {
  ChosenConv,
  TConversations
} from "../../interfaces/Message/Chats";
import type { TMessage } from "../../interfaces/api/newChat";
import type { ChatType } from "../../interfaces/api/chatType";
import type { MessageData } from "../../interfaces/api/messageData";
import type { TReadMessage } from "../../interfaces/api/readMessage";
import type { TDeleteMessages } from "../../interfaces/api/deleteMessages";

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

  public createGroupChat(
    users_idx: number[],
    chat_type: ChatType,
    group_name: string,
    description: string,
    owner_id: number
  ) {
    this.socket?.emit("startGroupChat", {
      users_idx,
      chat_type,
      group_name,
      description,
      owner_id
    });
  }

  public sendMessage(message: MessageData) {
    this.socket?.emit("sendMessage", message);
  }

  public changeEditedMessage(message: { uuid: string; message: TMessage }) {
    this.socket?.emit("changeEditedMessage", message);
  }

  public deleteMessages(message: TDeleteMessages) {
    this.socket?.emit("deleteMessages", message);
  }

  public connectToChatRoom(uuid: ChosenConv | null) {
    if (uuid) this.socket?.emit("connectToChatRoom", uuid);
  }

  public leaveChatRoom(uuid: ChosenConv | null) {
    if (uuid) this.socket?.emit("leaveChatRoom", uuid);
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

  public getJustCreatedChats() {
    this.socket?.on("getJustCreatedChats", (data: Array<TConversations>) => {
      this.reduxDispatch(chatsActions.initChats(data));
      this.reduxDispatch(
        chatSocketAcitons.chosenConvIdInit({
          id: data[data.length - 1].conversations.id,
          uuid: data[data.length - 1].conversations.group_uuid
        })
      );
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
}
