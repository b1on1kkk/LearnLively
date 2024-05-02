import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { TMessage } from "../../interfaces/api/newChat";

const initialState: {
  messages: Array<TMessage>;
} = {
  messages: []
};

export const messagesSlice = createSlice({
  name: "messagesSlice",
  initialState,
  reducers: {
    messageInit: (state, action: PayloadAction<Array<TMessage>>) => {
      return {
        ...state,
        messages: action.payload
      };
    }
  }
});

export default messagesSlice.reducer;
export const messagesActions = messagesSlice.actions;
