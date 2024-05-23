import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface OnlineUsersPayload {
  online_users: Array<number>;
}

const initialState: OnlineUsersPayload = {
  online_users: []
};

export const onlineUsersSlice = createSlice({
  name: "onlineUsersSlice",
  initialState,
  reducers: {
    onlineUsersInit: (state, action: PayloadAction<Array<number>>) => {
      return {
        ...state,
        online_users: action.payload
      };
    }
  }
});

export default onlineUsersSlice.reducer;
export const onlineUsersActions = onlineUsersSlice.actions;
