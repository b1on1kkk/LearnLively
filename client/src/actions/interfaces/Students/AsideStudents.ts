import { SocketController } from "../../api/socket-controllers";
import { Student } from "./Main";

export interface TAsideStudentInf {
  chosenUser: Student | null;
  socketController: SocketController;
}
