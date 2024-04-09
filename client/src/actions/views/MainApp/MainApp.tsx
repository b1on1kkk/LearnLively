import { Outlet } from "react-router";

export const MainApp = () => {
  return (
    <div>
      <div>here is the app page</div>
      <Outlet></Outlet>
    </div>
  );
};
