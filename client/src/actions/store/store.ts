import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/user.slice";
import serviceSocketSlice from "./features/serviceSocket.slice";
import studentsSlice from "./features/students.slice";
import chatSocketSlice from "./features/chatSocket.slice";
import chosenUserChatSlice from "./features/chosenUserChat.slice";
import messagesSlice from "./features/messages.slice";
import chatsSlice from "./features/chats.slice";
import groupsSlice from "./features/groups.slice";
import onlineUsersSlice from "./features/onlineUsers.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    serviceSocket: serviceSocketSlice,
    chatSocket: chatSocketSlice,
    students: studentsSlice,
    chosenUserChat: chosenUserChatSlice,
    messages: messagesSlice,
    chats: chatsSlice,
    groups: groupsSlice,
    onlineUsers: onlineUsersSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
