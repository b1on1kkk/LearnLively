import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/user.slice";
import serviceSocketSlice from "./features/serviceSocket.slice";
import studentsSlice from "./features/students.slice";
import chatSocketSlice from "./features/chatSocket.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    serviceSocket: serviceSocketSlice,
    chatSocket: chatSocketSlice,
    students: studentsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
