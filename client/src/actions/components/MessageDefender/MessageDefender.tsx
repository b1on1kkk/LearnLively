import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

export const MessageDefender = ({ children }: { children: ReactElement }) => {
  const { chosenUser, chosenGroup } = useSelector(
    (cu: RootState) => cu.chosenUserChat
  );

  if (!chosenUser && !chosenGroup) return <Navigate to="/message" replace />;

  return children;
};
