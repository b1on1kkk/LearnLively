import type { ChosenConv } from "../../interfaces/Message/Chats";
import type { ChatSocket } from "../../api/chat-socket/chat-socket";

export interface TChatSocketSlice {
  chat_socket: ChatSocket | null;
  chosenConvId: ChosenConv | null;
}
