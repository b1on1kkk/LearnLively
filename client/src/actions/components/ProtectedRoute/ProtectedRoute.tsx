import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { Loading } from "../../views/Loading/Loading";

import useCheckUserAuth from "../../hooks/useCheckUserAuth";
import useGlobalContext from "../../hooks/useGlobalContext";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user, userSetter } = useGlobalContext();

  const userValues = Object.values(user).length;

  if (userValues === 0) {
    const { isError, isLoading } = useCheckUserAuth(userSetter);

    if (isLoading) return <Loading></Loading>;

    if (isError) return <Navigate to="/registration/login" replace />;
  }

  if (userValues > 0) return children;

  return <Navigate to="/registration/login" replace />;
};
