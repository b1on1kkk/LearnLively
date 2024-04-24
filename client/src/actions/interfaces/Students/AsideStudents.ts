import { SocketController } from "../../api/service-socket/service-socket-controllers";

export interface TAsideStudentInf {
  socketController: SocketController;
  chosenUser: number | null;
}
