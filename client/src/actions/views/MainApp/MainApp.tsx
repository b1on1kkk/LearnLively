import { Outlet } from "react-router";

import { Header } from "../../components/NavigationComp/Header";
import { Main } from "../../components/NavigationComp/Main";
import { Navigation } from "../../components/NavigationComp/Navigation";

export const MainApp = () => {
  return (
    <main className="flex h-screen">
      {/* aside navigation tab */}
      <aside className="w-[280px] border-r-2 border-slate-900">
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
        {/* just background */}
        <div className="absolute h-40 w-screen right-0 top-0 bg-gradient-to-r from-10% via-sky-500 via-30% to-90% from-pink-500 to-red-500 rounded-tr-3xl mr-3 mt-3"></div>

        <Outlet></Outlet>
      </div>
    </main>
  );
};
