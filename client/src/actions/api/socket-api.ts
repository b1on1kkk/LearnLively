import { Socket, io } from "socket.io-client";

export class SocketAPI {
  private socket: Socket | null;

  constructor(url: string) {
    this.socket = io(url);

    this.socket.on("connect", () => {
      console.log("frontend connect");
    });

    this.socket.on("disconnect", () => {
      console.log("frontend disconnect");
    });
  }

  public SendTestMessage() {
    return "test here";
  }
}
