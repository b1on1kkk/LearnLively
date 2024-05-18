import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type Group } from "../../interfaces/Message/Chats";

const initialState: {
  groups: Array<Group>;
} = {
  groups: []
};

export const groupsSlice = createSlice({
  name: "groupsSlice",
  initialState,
  reducers: {
    initGroups: (state, action: PayloadAction<Array<Group>>) => {
      return {
        ...state,
        groups: action.payload
      };
    }
  }
});

export default groupsSlice.reducer;
export const groupsActions = groupsSlice.actions;
