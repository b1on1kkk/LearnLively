import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { Student } from "../../interfaces/Students/Main";
import { Group } from "../../interfaces/Message/Chats";

interface ChosenUserChatSlice {
  chosenUser: Student | null;
  chosenGroup: Group | null;
}

const initialState: ChosenUserChatSlice = {
  chosenUser: null,
  chosenGroup: null
};

export const chosenUserChat = createSlice({
  name: "chosenUserChat",
  initialState,
  reducers: {
    chosenUserInit: (state, action: PayloadAction<ChosenUserChatSlice>) => {
      return {
        chosenGroup: action.payload.chosenGroup,
        chosenUser: action.payload.chosenUser
      };
    }
  }
});

export default chosenUserChat.reducer;
export const chosenUserChatActions = chosenUserChat.actions;
