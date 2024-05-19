import { Socket, io } from "socket.io-client";

import WebSocket from "../abstract/webSocket";
import { AppDispatch } from "../../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { studentsActions } from "../../store/features/students.slice";

import type { Student } from "../../interfaces/Students/Main";
import type { TSendFriendRequest } from "../../interfaces/api/sendFriendRequest";
import type { TFriendRequest } from "../../interfaces/api/acceptFriendRequest";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";

export class ServiceSocket implements WebSocket {
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
}
