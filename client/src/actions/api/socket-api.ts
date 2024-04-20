import { Socket, io } from "socket.io-client";

import type { Student } from "../interfaces/Students/Main";
import type { TSendFriendRequest } from "../interfaces/api/sendFriendRequest";
import type { TFriendRequest } from "../interfaces/api/acceptFriendRequest";

export class SocketAPI {
  private socket: Socket | null;

  constructor(url: string) {
    this.socket = io(url);
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
    setStudents: (c: Array<Student> | null) => void,
    setTempStudents: (c: Array<Student> | null) => void
  ) {
    this.socket?.on("newStudents", (data: Array<Student>) => {
      if (chosenUser) {
        const student = data.find((student) => student.id === chosenUser.id);
        setChosenUser(student!);
      }

      setStudents(data);
      setTempStudents(data);
    });
  }
}
