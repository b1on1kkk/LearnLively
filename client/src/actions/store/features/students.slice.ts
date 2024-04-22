import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { Student } from "../../interfaces/Students/Main";

const initialState: {
  students: Array<Student> | null;
  chosenUser: number | null;
} = {
  students: null,
  chosenUser: null
};

export const studentsSlice = createSlice({
  name: "studentsSlice",
  initialState,
  reducers: {
    initStudents: (state, action: PayloadAction<Array<Student> | null>) => {
      return {
        ...state,
        students: action.payload
      };
    },
    initChosenUser: (state, action: PayloadAction<number | null>) => {
      return {
        ...state,
        chosenUser: action.payload
      };
    }
  }
});

export default studentsSlice.reducer;
export const studentsActions = studentsSlice.actions;
