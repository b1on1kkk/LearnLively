import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { ActionPayload } from "../interfaces/messagesActionPayload";

const initialState: ActionPayload = {
  messages: [],
  chosenMessage: null
};

export const messagesSlice = createSlice({
  name: "messagesSlice",
  initialState,
  reducers: {
    messageInit: (state, action: PayloadAction<ActionPayload>) => {
      return {
        ...state,
        chosenMessage: action.payload.chosenMessage,
        messages: action.payload.messages
      };
    }
  }
});

export default messagesSlice.reducer;
export const messagesActions = messagesSlice.actions;
