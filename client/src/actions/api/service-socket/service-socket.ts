import { Socket, io } from "socket.io-client";

import WebSocket from "../abstract/webSocket";
import { AppDispatch } from "../../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { studentsActions } from "../../store/features/students.slice";

import type { Student } from "../../interfaces/Students/Main";
import type { TSendFriendRequest } from "../../interfaces/api/sendFriendRequest";
import type { TFriendRequest } from "../../interfaces/api/acceptFriendRequest";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";
import { TGroups } from "../../interfaces/Message/Chats";
import { groupsActions } from "../../store/features/groups.slice";
import { ChatType } from "../../interfaces/api/chatType";

export class ServiceSocket implements WebSocket {
  private socket: Socket | null;
  private reduxDispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>;

  constructor(
    url: string,
    user_id: number,
    dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>,
    device_id: string
  ) {
    this.socket = io(url, {
      withCredentials: true,
      auth: { device_id: device_id, user_id: user_id }
    });

    this.connectUser(user_id);
    this.reduxDispatch = dispatch;

    this.connectionErrorHandler();
  }

  ////////////////////////////////////////emitters////////////////////////////////////////////////
  public connectUser(user_id: number) {
    if (!this.socket?.connected) this.socket?.connect();

    this.socket?.emit("userConnected", {
      id: user_id
    });
  }

  public disconnectUser() {
    this.socket?.emit("userDisconnect");

    setTimeout(() => {
      this.socket?.disconnect();
    }, 1000);
  }

  public sendFriendRequest(dto: TSendFriendRequest) {
    this.socket?.emit("sendFriendRequest", dto);
  }

  public acceptFriendRequest(dto: TFriendRequest) {
    this.socket?.emit("acceptFriendRequest", dto);
  }

  public rejectFriendRequest(dto: TFriendRequest) {
    this.socket?.emit("rejectFriendRequest", dto);
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

  ////////////////////////////////////////listeners////////////////////////////////////////////////

  public getNewStudents(
    chosenUser: Student | null,
    setTempStudents: (c: Array<Student> | null) => void
  ) {
    this.socket?.on("newStudents", (data: Array<Student>) => {
      if (chosenUser) {
        const student = data.find((student) => student.id === chosenUser.id);
        this.reduxDispatch(
          chosenUserChatActions.chosenUserInit({
            chosenGroup: null,
            chosenUser: student!
          })
        );
      }

      this.reduxDispatch(studentsActions.initStudents(data));

      setTempStudents(data);
    });
  }

  public getGroups() {
    this.socket?.on("getGroups", (data: Array<TGroups>) => {
      console.log(data);

      this.reduxDispatch(groupsActions.initGroups([...data]));
    });
  }

  // service listeners
  private connectionErrorHandler() {
    this.socket?.on("error", (err) => {
      console.error("Socket.IO general error:", err);
    });
  }
}
