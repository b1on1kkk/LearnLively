import { useSelector } from "react-redux";
import useStudents from "../../hooks/useStudents";

import { ReactElement, useEffect, useState } from "react";

import { Loading } from "../Loading/Loading";

import { RootState } from "../../store/store";
import { Navigate, useParams } from "react-router-dom";

import { checkFriendship } from "../../utils/Message/checkFriendship";

export const MessageDefender = ({ children }: { children: ReactElement }) => {
  const { id } = useParams();
  const { isLoading } = useStudents();
  const { students } = useSelector((s: RootState) => s.students);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (!show && students && id)
      setShow(checkFriendship(students, +id.split(":")[1]));
  }, [students]);

  if (isLoading && !show) return <Loading></Loading>;

  if (show) return children;

  return <Navigate to="/message" replace />;
};
