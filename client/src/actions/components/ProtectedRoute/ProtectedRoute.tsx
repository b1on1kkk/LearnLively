import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCheckUserAuth from "../../hooks/useCheckUserAuth";

import { Loading } from "../Loading/Loading";

// THIS ALL WILL BE FIXED!!! WORKS NOT PROPERLY!
export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { pathname } = useLocation();

  // if message and length of the path is equal to 3 therefore user is verified and can access to this page
  if (pathname.includes("message") && pathname.split("/").length === 3) {
    return children;
  }

  const { data, isError, isLoading } = useCheckUserAuth(location.pathname);

  if (isLoading) return <Loading></Loading>;

  if (isError) return <Navigate to="/registration/login" replace />;

  if (data && data!.result) return children;

  if (data && !data.result) {
    return <Navigate to="/registration/login" replace />;
  }
};
