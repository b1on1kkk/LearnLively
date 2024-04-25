import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ServiceSocket } from "../api/service-socket/service-socket";

import { AppDispatch, RootState } from "../store/store";
import { socketAcitons } from "../store/features/serviceSocket.slice";

import type { User } from "../interfaces/Registration/Validation";

const useConnectServiceSocket = (url: string, user: User) => {
  const dispatch = useDispatch<AppDispatch>();
  const { service_socket } = useSelector((s: RootState) => s.serviceSocket);

  const connectSocket = () => {
    dispatch(
      socketAcitons.serviceSocketInit(new ServiceSocket(url, dispatch, user.id))
    );
  };

  useEffect(() => {
    if (!service_socket) connectSocket();
  }, []);

  return { service_socket };
};

export default useConnectServiceSocket;
