import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { TConversations } from "../../interfaces/Message/Chats";

const initialState: {
  chats: Array<TConversations>;
} = {
  chats: []
};

export const chatsSlice = createSlice({
  name: "chatsSlice",
  initialState,
  reducers: {
    initChats: (state, action: PayloadAction<Array<TConversations>>) => {
      return {
        ...state,
        chats: action.payload
      };
    }
  }
});

export default chatsSlice.reducer;
export const chatsActions = chatsSlice.actions;
