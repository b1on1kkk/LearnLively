import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAVIGATION_TABS } from "../../constants/MainApp/navigation";
import type { TNavigationTabs } from "../../interfaces/MainApp/TNavigationTabs";

export const Navigation = () => {
  const [navigationTabs, setNavigationTabs] =
    useState<Array<TNavigationTabs>>(NAVIGATION_TABS);

  return (
    <div className="flex-1 flex flex-col mt-2 gap-2">
      {navigationTabs.map((tab) => {
        return (
          <NavLink
            key={tab.id}
            to={tab.link_to}
            className={({ isActive }) =>
              isActive
                ? "px-6 py-3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex items-center gap-5 rounded-full text-white transition-background duration-200"
                : "px-6 py-3 gap-5 flex items-center text-slate-600 rounded-full hover:bg-gray-600 hover:text-white transition-colors duration-200"
            }
          >
            <span className="font-semibold">{tab.picture}</span>
            <span className="font-semibold flex-1">{tab.title}</span>
            {tab.notifications > 0 && (
              <span className="bg-red-600 rounded-full text-[11px] text-white h-5 w-5 flex items-center justify-center">
                2
              </span>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};
