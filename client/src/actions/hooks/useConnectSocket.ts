import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SocketAPI } from "../api/socket-api";

import { AppDispatch, RootState } from "../store/store";
import { socketAcitons } from "../store/features/socket.slice";

import type { User } from "../interfaces/Registration/Validation";

const useConnectSocket = (url: string, user: User | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const { socket } = useSelector((s: RootState) => s.socket);

  const connectSocket = () => {
    if (!socket && user) {
      dispatch(socketAcitons.socketInit(new SocketAPI(url, dispatch)));
    }
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return { socket };
};

export default useConnectSocket;
