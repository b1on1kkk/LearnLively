import { ChosenConv } from "../../interfaces/Message/Chats";
import { TMessage } from "../../interfaces/api/newChat";
import { ChatSocket } from "./chat-socket";

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
        meta_data: {
          uuid: chosenConv.uuid,
          conversation_id: chosenConv.id
        },
        message: message
      });
    }
  }
}
