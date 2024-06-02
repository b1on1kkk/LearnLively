import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCheckUserAuth from "../../hooks/useCheckUserAuth";

import { Loading } from "../Loading/Loading";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const { data, isError, isLoading } = useCheckUserAuth(location.pathname);

  if (isLoading) return <Loading></Loading>;

  if (isError) return <Navigate to="/registration/login" replace />;

  if (data && data!.result) return children;

  if (data && !data.result) {
    return <Navigate to="/registration/login" replace />;
  }
};
