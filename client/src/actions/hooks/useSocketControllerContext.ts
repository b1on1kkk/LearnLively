import { useContext } from "react";
import { MySocketControllerContext } from "../context/SocketControllerContext/socketControllerContext";

export const useSocketControllerContext = () =>
  useContext(MySocketControllerContext);
