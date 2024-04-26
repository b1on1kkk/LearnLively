import { useContext } from "react";
import { MySocketControllerContext } from "../context/SocketControllerContext/socketControllerContext";

const useSocketControllerContext = () => useContext(MySocketControllerContext);

export default useSocketControllerContext;
