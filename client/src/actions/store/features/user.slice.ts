import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { UserSlice } from "../../interfaces/Registration/Validation";

const initialState: UserSlice = {
  user: null
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<UserSlice | null>) => {
      if (action.payload !== null) return { ...state, ...action.payload };

      return state;
    }
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
