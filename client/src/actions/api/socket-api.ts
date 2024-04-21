import { Socket, io } from "socket.io-client";

import type { Student } from "../interfaces/Students/Main";
import type { TSendFriendRequest } from "../interfaces/api/sendFriendRequest";
import type { TFriendRequest } from "../interfaces/api/acceptFriendRequest";

import { AppDispatch } from "../store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { studentsActions } from "../store/features/students.slice";

export class SocketAPI {
  private socket: Socket | null;
  private reduxDispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>;

  constructor(
    url: string,
    dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
  ) {
    this.socket = io(url);
    this.reduxDispatch = dispatch;
  }

  ////////////////////////////////////////emitters////////////////////////////////////////////////
  public connectUser(user_id: number) {
    this.socket?.emit("userConnected", {
      user_id
    });
  }

  public disconnectUser(user_id: number) {
    this.socket?.emit("userDisconnect", { user_id });
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
    setChosenUser: (c: Student) => void,
    setTempStudents: (c: Array<Student> | null) => void
  ) {
    this.socket?.on("newStudents", (data: Array<Student>) => {
      if (chosenUser) {
        const student = data.find((student) => student.id === chosenUser.id);
        setChosenUser(student!);
      }

      this.reduxDispatch(studentsActions.initStudents(data));

      setTempStudents(data);
    });
  }
}
