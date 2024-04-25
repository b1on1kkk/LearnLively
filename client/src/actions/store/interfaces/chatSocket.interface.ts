import { ChatSocket } from "../../api/chat-socket/chat-socket";

export interface TChatSocketSlice {
  chat_socket: ChatSocket | null;
}
