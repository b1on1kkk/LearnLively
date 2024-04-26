import { ChatSocket } from "./chat-socket";

import { ChatType } from "../../interfaces/api/chatType";

export class ChatSocketController {
  private socket: ChatSocket | null;

  constructor(socket: ChatSocket | null) {
    this.socket = socket;
  }

  public startChat(users_idx: number[], chat_type: ChatType, message: string) {
    this.socket?.startChat(users_idx, chat_type, message);
  }
}
