import { ReactElement } from "react";

import useGlobalContext from "../../hooks/useGlobalContext";
import { Navigate } from "react-router-dom";
import useCheckUserAuth from "../../hooks/useCheckUserAuth";
import { Loading } from "../../views/Loading/Loading";

export const RegistrationGuard = ({ children }: { children: ReactElement }) => {
  const { user, userSetter } = useGlobalContext();

  const { isError, isLoading } = useCheckUserAuth(userSetter);

  if (isLoading) return <Loading></Loading>;

  if (isError) return <Navigate to="/registration/login" replace />;

  const userValues = Object.values(user).length;

  if (userValues !== 0) return <Navigate to="/students" replace />;

  return children;
};
