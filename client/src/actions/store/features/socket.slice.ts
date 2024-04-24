import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ServiceSocket } from "../../api/service-socket/service-socket";

import type { SocketContent } from "../interfaces/socket.slice.interface";
import { ChatSocket } from "../../api/chat-socket/chat-socket";

const initialState: SocketContent = {
  service_socket: null,
  chat_socket: null
};

export const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    serviceSocketInit: (state, action: PayloadAction<ServiceSocket | null>) => {
      return {
        ...state,
        service_socket: action.payload
      };
    },
    chatSocketInit: (state, action: PayloadAction<ChatSocket | null>) => {
      return {
        ...state,
        chat_socket: action.payload
      };
    }
  }
});

export default socketSlice.reducer;
export const socketAcitons = socketSlice.actions;
