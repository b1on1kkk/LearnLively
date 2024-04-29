import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { ChatSocket } from "../../api/chat-socket/chat-socket";
import type { ChosenConv } from "../../interfaces/Message/Chats";
import type { TChatSocketSlice } from "../interfaces/chatSocket.interface";

const initialState: TChatSocketSlice = {
  chat_socket: null,
  chosenConvId: null
};

export const chatSocketSlice = createSlice({
  name: "chatSocketSlice",
  initialState,
  reducers: {
    chatSocketInit: (state, action: PayloadAction<ChatSocket | null>) => {
      return { ...state, chat_socket: action.payload };
    },
    chosenConvIdInit: (state, action: PayloadAction<ChosenConv | null>) => {
      return {
        ...state,
        chosenConvId: action.payload
      };
    }
  }
});

export default chatSocketSlice.reducer;
export const chatSocketAcitons = chatSocketSlice.actions;
