import { useEffect, useState } from "react";

import { SocketAPI } from "../api/socket-api";
import { User } from "../interfaces/Registration/Validation";

const useConnectSocket = (url: string, user: User | null) => {
  const [socket, setSocket] = useState<SocketAPI | null>(null);

  const connectSocket = () => {
    if (!socket && user) {
      setSocket(new SocketAPI(url));
    }
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return { socket };
};

export default useConnectSocket;
