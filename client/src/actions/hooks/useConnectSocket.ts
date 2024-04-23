import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ServiceSocket } from "../api/service-socket/service-socket";

import { AppDispatch, RootState } from "../store/store";
import { socketAcitons } from "../store/features/socket.slice";

import type { User } from "../interfaces/Registration/Validation";

const useConnectSocket = (url: string, user: User | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const { service_socket } = useSelector((s: RootState) => s.socket);

  const connectSocket = () => {
    if (!service_socket && user) {
      dispatch(socketAcitons.socketInit(new ServiceSocket(url, dispatch)));
    }
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return { service_socket };
};

export default useConnectSocket;
