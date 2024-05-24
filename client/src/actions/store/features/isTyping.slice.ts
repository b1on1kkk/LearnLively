import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { whoIsTyping } from "../../interfaces/Message/Chats";

const initialState: {
  typed: Array<{
    conv_id: number;
    user: Array<{ id: number; name: string }>;
  }>;
} = {
  typed: []
};

export const isTyping = createSlice({
  name: "isTyping",
  initialState,
  reducers: {
    initTyping: (state, action: PayloadAction<whoIsTyping>) => {
      // find conv idx
      const convIndex = state.typed.findIndex(
        (conv) => conv.conv_id === action.payload.conv_id
      );

      // if conv exist - before inserting new person check if person is already in conv
      if (convIndex !== -1) {
        const userIndex = state.typed[convIndex].user.findIndex(
          (user) => user.id === action.payload.user.id
        );

        // if not - push new user
        if (userIndex === -1) {
          state.typed[convIndex].user.push(action.payload.user);
        }
      } else {
        state.typed.push({
          conv_id: action.payload.conv_id,
          user: [action.payload.user]
        });
      }
    },

    removeTyping: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        typed: state.typed.filter((type) => type.conv_id !== action.payload)
      };
    }
  }
});

export default isTyping.reducer;
export const isTypingActions = isTyping.actions;
