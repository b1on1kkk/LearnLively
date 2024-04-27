import { ChatSocket } from "./chat-socket";

export class ChatSocketController {
  private socket: ChatSocket | null;

  constructor(socket: ChatSocket | null) {
    this.socket = socket;
  }
}
