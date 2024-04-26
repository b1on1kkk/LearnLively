import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { Student } from "../../interfaces/Students/Main";

interface ChosenUserChatSlice {
  chosenUser: Student | null;
}

const initialState: ChosenUserChatSlice = {
  chosenUser: null
};

export const chosenUserChat = createSlice({
  name: "chosenUserChat",
  initialState,
  reducers: {
    chosenUserInit: (state, action: PayloadAction<Student | null>) => {
      return {
        ...state,
        chosenUser: action.payload
      };
    }
  }
});

export default chosenUserChat.reducer;
export const chosenUserChatActions = chosenUserChat.actions;
