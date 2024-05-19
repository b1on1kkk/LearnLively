import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TGroups } from "../../interfaces/Message/Chats";

const initialState: {
  groups: Array<TGroups>;
} = {
  groups: []
};

export const groupsSlice = createSlice({
  name: "groupsSlice",
  initialState,
  reducers: {
    initGroups: (state, action: PayloadAction<Array<TGroups>>) => {
      return {
        ...state,
        groups: action.payload
      };
    }
  }
});

export default groupsSlice.reducer;
export const groupsActions = groupsSlice.actions;
