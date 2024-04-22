import { useDispatch, useSelector } from "react-redux";
import useStudents from "../../hooks/useStudents";
import { useEffect, useMemo, useState } from "react";

import { AppDispatch, RootState } from "../../store/store";

import { Header } from "../../components/StudentsComp/Header";
import { Main } from "../../components/StudentsComp/Main";
import { AsideStudentInf } from "../../components/StudentsComp/AsideStudentInf";

import { SocketController } from "../../api/socket-controllers";

import type { Student } from "../../interfaces/Students/Main";

export const Students = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isError, isLoading } = useStudents();
  const { socket } = useSelector((s: RootState) => s.socket);
  const { chosenUser } = useSelector((u: RootState) => u.students);

  const [tempStudents, setTempStudents] = useState<Array<Student> | null>(null);

  const socketController = useMemo(() => {
    return new SocketController(socket);
  }, [socket]);

  useEffect(() => {
    if (data) {
      if (!tempStudents) setTempStudents(data);
    }
  }, [data]);

  // listen if new data comes
  useEffect(() => {
    console.log(socket);
    socket?.getNewStudents(chosenUser, setTempStudents, dispatch);
  }, [socket, chosenUser]);

  return (
    <div className="flex h-screen relative px-8 pb-6 pt-12 gap-8">
      {/* main block of users */}
      <div className="flex-[4] z-10 flex flex-col bg-transparent">
        {/* filtration and users header */}
        <Header tempStudents={tempStudents} />

        {/* users list */}
        <Main
          isLoading={isLoading}
          isError={isError}
          socketController={socketController}
        />
      </div>

      {/* aside menu about each user */}
      <AsideStudentInf socketController={socketController} />
    </div>
  );
};
