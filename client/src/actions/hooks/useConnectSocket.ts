import { useEffect, useState } from "react";
import { SocketAPI } from "../api/socket-api";

const useConnectSocket = (url: string) => {
  const [socket, setSocket] = useState<SocketAPI | null>(null);

  const connectSocket = () => {
    if (!socket) {
      setSocket(new SocketAPI(url));
    }
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return { socket };
};

export default useConnectSocket;
