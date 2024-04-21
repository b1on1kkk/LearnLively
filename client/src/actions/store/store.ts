import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/user.slice";
import socketSlice from "./features/socket.slice";
import studentsSlice from "./features/students.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    socket: socketSlice,
    students: studentsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
