import { useEffect } from "react";
import { useSelector } from "react-redux";

import { ServiceSocket } from "../api/service-socket/service-socket";

import { AppDispatch, RootState } from "../store/store";
import { socketAcitons } from "../store/features/serviceSocket.slice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import { User } from "../interfaces/Registration/Validation";
import useLocalStorage from "./useLocalStorage";

const useConnectServiceSocket = (
  url: string,
  user: User | null,
  dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
) => {
  const { service_socket } = useSelector((s: RootState) => s.serviceSocket);
  const { storedValue } = useLocalStorage("device_id", "");

  const connectSocket = () => {
    dispatch(
      socketAcitons.serviceSocketInit(
        new ServiceSocket(url, user!.id, dispatch, storedValue)
      )
    );
  };

  useEffect(() => {
    if (!service_socket && user) connectSocket();
  }, [user]);

  return { service_socket };
};

export default useConnectServiceSocket;
