import { ChatSocket } from "./chat-socket";

import type { TMessage } from "../../interfaces/api/newChat";
import type { ChosenConv } from "../../interfaces/Message/Chats";

export class ChatSocketController {
  private socket: ChatSocket | null;

  constructor(socket: ChatSocket | null) {
    this.socket = socket;
  }

  public deleteMsgController(
    chosenConv: ChosenConv | null,
    message: Array<TMessage>
  ) {
    if (chosenConv) {
      this.socket?.deleteMessages({
        conv_id: chosenConv.id,
        message: [
          ...message.map((msg) => {
            if (!msg.selected) return { ...msg, selected: true };
            return { ...msg };
          })
        ]
      });
    }
  }
}
