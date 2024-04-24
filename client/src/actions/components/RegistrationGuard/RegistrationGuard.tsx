import { ReactElement } from "react";
import useCheckUserAuth from "../../hooks/useCheckUserAuth";

import { Navigate } from "react-router-dom";

import { Loading } from "../Loading/Loading";

export const RegistrationGuard = ({ children }: { children: ReactElement }) => {
  const { data, isError, isLoading } = useCheckUserAuth();

  if (isLoading) return <Loading></Loading>;

  if (isError) return <Navigate to="/registration/login" replace />;

  if (data && data.result) return <Navigate to="/students" replace />;

  return children;
};
