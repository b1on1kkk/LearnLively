import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ServiceSocket } from "../../api/service-socket/service-socket";

import type { SocketContent } from "../interfaces/socket.slice.interface";

const initialState: SocketContent = {
  service_socket: null
};

export const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    socketInit: (state, action: PayloadAction<ServiceSocket | null>) => {
      return {
        ...state,
        service_socket: action.payload
      };
    }
  }
});

export default socketSlice.reducer;
export const socketAcitons = socketSlice.actions;
