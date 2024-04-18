import { useContext } from "react";
import { MySocketContext } from "../context/SocketContext/SocketContext";

export const useSocketContext = () => useContext(MySocketContext);
