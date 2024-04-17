import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import useGlobalContext from "../../hooks/useGlobalContext";
import useCheckUserAuth from "../../hooks/useCheckUserAuth";

import { Loading } from "../../views/Loading/Loading";

export const RegistrationGuard = ({ children }: { children: ReactElement }) => {
  const { userSetter } = useGlobalContext();
  const { data, isError, isLoading } = useCheckUserAuth(userSetter);

  if (isLoading) return <Loading></Loading>;

  if (isError) return <Navigate to="/registration/login" replace />;

  if (data && data.result) return <Navigate to="/students" replace />;

  return children;
};
