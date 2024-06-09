import { useEffect, useState } from "react";

import { ChatSocket } from "../api/chat-socket/chat-socket";
import { ServiceSocket } from "../api/service-socket/service-socket";

import type { SocketUnauthError } from "../interfaces/api/socketUnauthError";

const useSocketError = (socket: ChatSocket | ServiceSocket | null) => {
  const [error, setError] = useState<SocketUnauthError | null>(null);

  useEffect(() => {
    if (socket) {
      socket.connectionErrorHandler((error) => {
        setError(error);
      });
    }
  }, [socket]);

  return { error };
};

export default useSocketError;
