import { Socket, io } from "socket.io-client";

import { User } from "../interfaces/Registration/Validation";

interface TSendFriendRequest {
  sender_id: number;
  recipient: number;
}

export class SocketAPI {
  private socket: Socket | null;

  constructor(url: string) {
    this.socket = io(url);
  }

  public connectUser(user_id: number) {
    this.socket?.on("connect", () => {
      this.socket?.emit("userConnected", {
        user_id: user_id,
        socket_id: this.socket.id
      });
      console.log("frontend connect", this.socket?.id);
    });
  }

  public disconnectUser() {
    this.socket?.on("disconnect", () => {
      console.log("frontend disconnect");
    });
  }

  public sendFriendRequest(dto: TSendFriendRequest) {
    this.socket?.emit("sendFriendRequest", dto);
  }

  public getNewUser(setUser: (c: User | null) => void) {
    this.socket?.on("newUser", (data: User) => {
      console.log(data, "----------new user---------");

      setUser(data);
    });
  }
}
