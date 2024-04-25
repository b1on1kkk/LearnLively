import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ChatSocket } from "../../api/chat-socket/chat-socket";

import type { TChatSocketSlice } from "../interfaces/chatSocket.interface";

const initialState: TChatSocketSlice = {
  chat_socket: null
};

export const chatSocketSlice = createSlice({
  name: "chatSocketSlice",
  initialState,
  reducers: {
    chatSocketInit: (state, action: PayloadAction<ChatSocket | null>) => {
      console.log("chat init");

      return {
        ...state,
        chat_socket: action.payload
      };
    }
  }
});

export default chatSocketSlice.reducer;
export const chatSocketAcitons = chatSocketSlice.actions;
