import { Socket, io } from "socket.io-client";
import WebSocket from "../abstract/webSocket";

export class ChatSocket implements WebSocket {
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
}
