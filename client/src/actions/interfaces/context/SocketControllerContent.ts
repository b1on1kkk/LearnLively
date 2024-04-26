import { SocketController } from "../../api/service-socket/service-socket-controllers";

export interface SocketControllerContent {
  socketController: SocketController | null;
  chosenUser: number | null;
  setChosenUser: (c: number | null) => void;
}
