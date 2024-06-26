import { NavLink } from "react-router-dom";

import { NAVIGATION_TABS } from "../../constants/MainApp/navigation";

export const Navigation = () => {
  return (
    <div className="flex-1 flex flex-col mt-2 gap-2">
      {NAVIGATION_TABS.map((tab) => {
        return (
          <NavLink
            key={tab.id}
            to={tab.link_to}
            className={({ isActive }) =>
              isActive
                ? "px-5 py-3 bg-indigo-500 flex items-center gap-5 rounded-full text-white transition-background duration-200 w-[220px]"
                : "px-5 py-3 gap-5 flex items-center text-slate-600 rounded-full hover:bg-indigo-500 hover:text-white transition-colors duration-200 w-[220px]"
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
