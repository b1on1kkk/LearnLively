import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import useCheckUserAuth from "../../hooks/useCheckUserAuth";

import { Loading } from "../Loading/Loading";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { data, isError, isLoading } = useCheckUserAuth();

  if (isLoading) return <Loading></Loading>;

  if (isError) return <Navigate to="/registration/login" replace />;

  if (data && data!.result) return children;

  if (data && !data.result) {
    return <Navigate to="/registration/login" replace />;
  }
};
