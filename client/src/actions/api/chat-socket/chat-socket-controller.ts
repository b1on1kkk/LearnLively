import { ChatSocket } from "./chat-socket";

import type { TMessage } from "../../interfaces/api/newChat";
import type { ChosenConv } from "../../interfaces/Message/Chats";

export class ChatSocketController {
  private socket: ChatSocket | null;

  constructor(socket: ChatSocket | null) {
    this.socket = socket;
  }

  // controller to delete one message
  private controllerDeleteOneMsg(
    message: Array<TMessage>,
    chosenMessage?: TMessage
  ) {
    // if chosenMessage exist - find message, change its selected type and remove from the conversation
    if (chosenMessage) {
      return [
        ...message.map((msg) => {
          if (msg.id === chosenMessage.id) return { ...msg, selected: true };
          return { ...msg };
        })
      ];
    }

    return message;
  }

  public deleteMsgController(
    chosenConv: ChosenConv | null,
    message: Array<TMessage>,
    chosenMessage?: TMessage
  ) {
    if (chosenConv) {
      this.socket?.deleteMessages({
        conv_id: chosenConv.id,
        message: this.controllerDeleteOneMsg(message, chosenMessage)
      });
    }
  }
}
