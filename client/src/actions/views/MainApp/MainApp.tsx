import { Outlet } from "react-router";

import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import useMessages from "../../hooks/useMessages";
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
import { Navigate, useLocation } from "react-router-dom";
import useCheckUserAuth from "../../hooks/useCheckUserAuth";
import { Loading } from "../../components/Loading/Loading";

export const MainApp = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  // check user authentication
  const { data, isError, isLoading } = useCheckUserAuth(pathname);

  const { user } = useSelector((u: RootState) => u.user);
  const { chat_socket, chosenConvId } = useSelector(
    (s: RootState) => s.chatSocket
  );
  const { service_socket } = useSelector((s: RootState) => s.serviceSocket);

  const chosenConvIdRef = useRef<ChosenConv | null>(chosenConvId);
  useEffect(() => {
    if (chosenConvId) chosenConvIdRef.current = chosenConvId;
  }, [chosenConvId]);

  const { refetch } = useMessages(chosenConvId);

  // connections
  useConnectChatSocket(SOCKETS_ROOT.chat_socket, user, dispatch);
  useConnectServiceSocket(SOCKETS_ROOT.service_logic_socket, user, dispatch);

  // get indexes of users that online
  useEffect(() => {
    if (chat_socket) chat_socket.getOnlineUsers();
  }, [chat_socket]);

  // callback is used if user reconnects and user is in chat - connect new socket id into the room and refetch messages
  const reconnectCB = useCallback(() => {
    chat_socket?.connectUser(user!.id);
    if (chosenConvIdRef.current) {
      refetch();
      chat_socket?.connectToChatRoom(chosenConvIdRef.current);
    }
  }, [chat_socket, user, dispatch, chosenConvId]);

  // callback that disconnects socket and leave from the room
  const disconnectCB = useCallback(() => {
    chat_socket?.disconnectUser();
    if (chosenConvIdRef.current) {
      chat_socket?.leaveChatRoom(chosenConvIdRef.current);
    }
  }, [chat_socket]);

  // hooks that disconnect users or track its activity
  useChatActivity(user, chat_socket, dispatch, reconnectCB, disconnectCB);
  usePageHideMainListener(
    user,
    chat_socket,
    service_socket,
    dispatch,
    disconnectCB
  );

  // if user is not logged in redirect to log in page
  if ((data && !data.result) || isError) {
    return <Navigate to="/registration/login" replace />;
  }

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

        {isLoading ? <Loading /> : <Outlet />}
      </div>
    </main>
  );
};
