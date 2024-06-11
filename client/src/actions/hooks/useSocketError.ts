import { useEffect } from "react";

import { ChatSocket } from "../api/chat-socket/chat-socket";
import { ServiceSocket } from "../api/service-socket/service-socket";

const useSocketError = (socket: ChatSocket | ServiceSocket | null) => {
  useEffect(() => {
    if (socket) socket.connectionErrorHandler();
  }, [socket]);
};

export default useSocketError;
