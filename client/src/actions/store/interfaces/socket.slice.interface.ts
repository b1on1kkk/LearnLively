import { ChatSocket } from "../../api/chat-socket/chat-socket";
import { ServiceSocket } from "../../api/service-socket/service-socket";

export interface SocketContent {
  service_socket: ServiceSocket | null;
  chat_socket: ChatSocket | null;
}
