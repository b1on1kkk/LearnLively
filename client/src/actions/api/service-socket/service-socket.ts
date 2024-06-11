import { Socket, io } from "socket.io-client";

import WebSocket from "../abstract/webSocket";

import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../store/store";
import { groupsActions } from "../../store/features/groups.slice";
import { studentsActions } from "../../store/features/students.slice";
import { chosenUserChatActions } from "../../store/features/chosenUserChat.slice";

import { ServiceNotificationHandler } from "../../utils/Students/serviceNotificationHandler";

import type { TGroups } from "../../interfaces/Message/Chats";
import type { ChatType } from "../../interfaces/api/chatType";
import type { Student } from "../../interfaces/Students/Main";
import type { TFriendRequest } from "../../interfaces/api/acceptFriendRequest";
import type { SocketUnauthError } from "../../interfaces/api/socketUnauthError";
import type { TSendFriendRequest } from "../../interfaces/api/sendFriendRequest";

export class ServiceSocket implements WebSocket {
  private socket: Socket | null;
  private notificationHandler: ServiceNotificationHandler;
  private reduxDispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>;

  constructor(
    url: string,
    user_id: number,
    dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
  ) {
    // create first handshake with credentials to make it secure
    this.socket = io(url, { withCredentials: true });

    this.connectUser(user_id);
    this.reduxDispatch = dispatch;

    this.notificationHandler = new ServiceNotificationHandler(dispatch);
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
    id: number,
    chosenUser: Student | null,
    setTempStudents: (c: Array<Student> | null) => void
  ) {
    this.socket?.on(
      "newStudents",
      (data: { students: Array<Student>; user_id: number }) => {
        const { students, user_id } = data;

        if (chosenUser) {
          const student = students.find(
            (student) => student.id === chosenUser.id
          );
          this.reduxDispatch(
            chosenUserChatActions.chosenUserInit({
              chosenGroup: null,
              chosenUser: student!
            })
          );

          // initialize service notifications modal
          if (user_id === id) {
            this.notificationHandler.confirmFriendRequest(student!.name);
          }
        }

        this.reduxDispatch(studentsActions.initStudents(students));

        setTempStudents(students);
      }
    );
  }

  public getGroups(id: number) {
    this.socket?.on(
      "getGroups",
      (data: { groups: Array<TGroups>; user_id: number }) => {
        const { groups, user_id } = data;

        this.reduxDispatch(groupsActions.initGroups([...groups]));

        // initialize service notifications modal
        if (user_id === id) this.notificationHandler.createGroupRequest();
      }
    );
  }

  // service listeners
  public connectionErrorHandler() {
    this.socket?.on("error", (err: SocketUnauthError) => {
      if (err) this.notificationHandler.errorHandler();
    });
  }
}
