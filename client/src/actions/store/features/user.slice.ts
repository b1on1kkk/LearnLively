import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/Registration/Validation";

const initialState: User = {
  id: 0,
  name: "",
  lastname: "",
  surname: "",
  role: "student",
  email: "",
  img_hash_name: ""
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload !== null) return { ...state, ...action.payload };

      return state;
    }
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
