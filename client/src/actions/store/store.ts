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
import isTypingSlice from "./features/isTyping.slice";
import serviceMsgPayloadSlice from "./features/serviceMsgPayload.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    chats: chatsSlice,
    groups: groupsSlice,
    typed: isTypingSlice,
    students: studentsSlice,
    messages: messagesSlice,
    chatSocket: chatSocketSlice,
    onlineUsers: onlineUsersSlice,
    serviceSocket: serviceSocketSlice,
    chosenUserChat: chosenUserChatSlice,
    serviceMessage: serviceMsgPayloadSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
