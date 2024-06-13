import { ReactElement } from "react";

import { Navigate } from "react-router-dom";

import useCheckUserAuth from "../../hooks/useCheckUserAuth";
import { useLocation } from "react-router-dom";

import { Loading } from "../Loading/Loading";

export const RegistrationGuard = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const { data, isError, isLoading } = useCheckUserAuth(location.pathname);

  if (isLoading) return <Loading></Loading>;

  if (isError || !data?.user) return children;

  if (data) return <Navigate to="/dashboard" replace />;

  return children;
};
