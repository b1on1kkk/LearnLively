import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

export const MessageDefender = ({ children }: { children: ReactElement }) => {
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  console.log(chosenUser);

  if (!chosenUser) return <Navigate to="/message" replace />;

  return children;
};
