import { useEffect } from "react";
import { useSelector } from "react-redux";
import useConnectSocket from "../../hooks/useConnectSocket";

import { Outlet } from "react-router";

import { Header } from "../../components/NavigationComp/Header";
import { Main } from "../../components/NavigationComp/Main";
import { Navigation } from "../../components/NavigationComp/Navigation";

import { RootState } from "../../store/store";

export const MainApp = () => {
  const user = useSelector((u: RootState) => u.user);
  useConnectSocket("http://localhost:3001/service_logic", user);

  const { service_socket } = useSelector((s: RootState) => s.socket);

  useEffect(() => {
    if (user) service_socket?.connectUser(user.id);
  }, [user, service_socket]);

  // if user close tab or leave - disable websocket connection
  useEffect(() => {
    function handlePageHide(e: PageTransitionEvent) {
      e.preventDefault();

      if (user) service_socket?.disconnectUser(user.id);
    }

    window.addEventListener("pagehide", handlePageHide);

    return () => window.removeEventListener("pagehide", handlePageHide);
  }, [service_socket, user]);

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

        <Outlet></Outlet>
      </div>
    </main>
  );
};
