import { Outlet } from "react-router";

import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import useChatActivity from "../../hooks/useChatActivity";
import useConnectChatSocket from "../../hooks/useConnectChatSocket";
import useConnectServiceSocket from "../../hooks/useConnectServiceSocket";
import usePageHideMainListener from "../../hooks/usePageHideMainListener";

import { Main } from "../../components/NavigationComp/Main";
import { Header } from "../../components/NavigationComp/Header";
import { Navigation } from "../../components/NavigationComp/Navigation";

import { AppDispatch, RootState } from "../../store/store";
import { SOCKETS_ROOT } from "../../constants/Sockets/sockets";

import type { ChosenConv } from "../../interfaces/Message/Chats";

export const MainApp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((u: RootState) => u.user);
  const { chat_socket, chosenConvId } = useSelector(
    (s: RootState) => s.chatSocket
  );
  const { service_socket } = useSelector((s: RootState) => s.serviceSocket);

  const chosenConvIdRef = useRef<ChosenConv | null>(chosenConvId);
  useEffect(() => {
    if (chosenConvId) chosenConvIdRef.current = chosenConvId;
  }, [chosenConvId]);

  // connections
  useConnectChatSocket(SOCKETS_ROOT.chat_socket, user, dispatch);
  useConnectServiceSocket(SOCKETS_ROOT.service_logic_socket, user, dispatch);

  // callback is used if user reconnects and user is in chat - connect new socket id into the room
  const reconnectCB = useCallback(() => {
    chat_socket?.connectUser(user!.id);
    if (chosenConvIdRef.current) {
      chat_socket?.connectToChatRoom(chosenConvIdRef.current);
    }
  }, [chat_socket, user, dispatch]);

  // callback that disconnects socket and leave from the room
  const disconnectCB = useCallback(() => {
    chat_socket?.disconnectUser();
    if (chosenConvIdRef.current) {
      chat_socket?.leaveChatRoom(chosenConvIdRef.current);
    }
  }, [chat_socket]);

  // hooks that disconnect users
  useChatActivity(user, chat_socket, dispatch, reconnectCB, disconnectCB);
  usePageHideMainListener(
    user,
    chat_socket,
    service_socket,
    dispatch,
    disconnectCB
  );

  console.log(chosenConvId);

  return (
    <main className="flex h-screen">
      {/* aside navigation tab */}
      <aside className="border-r-2 border-slate-900 overflow-hidden transition-width duration-150">
        <div className="h-full p-7 flex flex-col">
          {/* header with label and hamburger */}
          <Header />

          {/* image and name */}
          <Main />

          {/* navigation tabs */}
          <Navigation />
        </div>
      </aside>

      {/* main visual part */}
      <div className="flex-1 relative overflow-hidden">
        {/* just header background */}
        <div className="absolute h-40 w-screen right-0 top-0 bg-gradient-to-r from-10% via-sky-500 via-30% to-90% from-pink-500 to-red-500 rounded-tr-3xl mr-3 mt-3"></div>

        <Outlet />
      </div>
    </main>
  );
};
