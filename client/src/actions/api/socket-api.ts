import { Socket, io } from "socket.io-client";

import type { User } from "../interfaces/Registration/Validation";
import type { TSendFriendRequest } from "./interfaces/sendFriendRequest";

export class SocketAPI {
  private socket: Socket | null;

  constructor(url: string) {
    this.socket = io(url);
  }

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

  public getNewUser(setUser: (c: User | null) => void) {
    this.socket?.on("newUser", (data: User) => {
      setUser(data);
    });
  }
}
