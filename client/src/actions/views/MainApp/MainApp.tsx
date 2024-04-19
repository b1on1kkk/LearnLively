import { useEffect } from "react";
import useConnectSocket from "../../hooks/useConnectSocket";
import useGlobalContext from "../../hooks/useGlobalContext";

import { Outlet } from "react-router";

import { Header } from "../../components/NavigationComp/Header";
import { Main } from "../../components/NavigationComp/Main";
import { Navigation } from "../../components/NavigationComp/Navigation";

import { MySocketContext } from "../../context/SocketContext/SocketContext";

export const MainApp = () => {
  // create socket connection only when user is logged in
  const { user } = useGlobalContext();
  const { socket } = useConnectSocket("http://localhost:3001/", user);

  useEffect(() => {
    if (user) socket?.connectUser(user.id);
  }, [user, socket]);

  // if user close tab or leave - disable websocket connection
  useEffect(() => {
    function handlePageHide(e: PageTransitionEvent) {
      e.preventDefault();

      if (user) socket?.disconnectUser(user.id);
    }

    window.addEventListener("pagehide", handlePageHide);

    return () => window.removeEventListener("pagehide", handlePageHide);
  }, [socket, user]);

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

      <MySocketContext.Provider value={{ socket: socket }}>
        {/* main visual part */}
        <div className="flex-1 relative overflow-hidden">
          {/* just header background */}
          <div className="absolute h-40 w-screen right-0 top-0 bg-gradient-to-r from-10% via-sky-500 via-30% to-90% from-pink-500 to-red-500 rounded-tr-3xl mr-3 mt-3"></div>

          <Outlet></Outlet>
        </div>
      </MySocketContext.Provider>
    </main>
  );
};
