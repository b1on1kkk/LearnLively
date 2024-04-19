import { useContext } from "react";
import { MySocketContext } from "../context/SocketContext/SocketContext";

const useSocketContext = () => useContext(MySocketContext);

export default useSocketContext;
