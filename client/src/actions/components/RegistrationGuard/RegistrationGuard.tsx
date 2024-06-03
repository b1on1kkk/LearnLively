import { ReactElement } from "react";
import useCheckUserAuth from "../../hooks/useCheckUserAuth";

import { Navigate, useLocation } from "react-router-dom";

import { Loading } from "../Loading/Loading";

export const RegistrationGuard = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const { data, isError, isLoading } = useCheckUserAuth(location.pathname);

  if (isLoading) return <Loading></Loading>;

  if (isError) return <Navigate to="/registration/login" replace />;

  if (data && data.result) return <Navigate to="/dashboard" replace />;

  return children;
};
