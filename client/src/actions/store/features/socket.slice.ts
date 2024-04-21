import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SocketAPI } from "../../api/socket-api";

import type { SocketContent } from "../interfaces/socket.slice.interface";

const initialState: SocketContent = {
  socket: null
};

export const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    socketInit: (state, action: PayloadAction<SocketAPI | null>) => {
      return {
        ...state,
        socket: action.payload
      };
    }
  }
});

export default socketSlice.reducer;
export const socketAcitons = socketSlice.actions;
