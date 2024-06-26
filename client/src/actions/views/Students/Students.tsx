import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import useStudents from "../../hooks/useStudents";

import { RootState } from "../../store/store";

import { Main } from "../../components/StudentsComp/Main";
import { Header } from "../../components/StudentsComp/Header";
import { AsideStudentInf } from "../../components/StudentsComp/AsideStudentInf";

import { SocketController } from "../../api/service-socket/service-socket-controllers";

import { MySocketControllerContext } from "../../context/SocketControllerContext/socketControllerContext";

import type { Student } from "../../interfaces/Students/Main";

export const Students = () => {
  const { data, isError, isLoading } = useStudents();

  const { user } = useSelector((u: RootState) => u.user);
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);
  const { service_socket } = useSelector((s: RootState) => s.serviceSocket);

  const [tempStudents, setTempStudents] = useState<Array<Student> | null>(null);

  const socketController = useMemo(() => {
    return new SocketController(service_socket);
  }, [service_socket]);

  useEffect(() => {
    if (data) if (!tempStudents) setTempStudents(data);
  }, [data]);

  // listen if new data comes
  useEffect(() => {
    if (user && service_socket) {
      service_socket.getNewStudents(user.id, chosenUser, setTempStudents);
    }
  }, [service_socket, chosenUser, user]);

  return (
    <div className="flex h-screen relative px-8 pb-6 pt-12 gap-8">
      <MySocketControllerContext.Provider value={{ socketController }}>
        {/* main block of users */}
        <div className="flex-[4] z-10 flex flex-col bg-transparent">
          {/* filtration and users header */}
          <Header tempStudents={tempStudents} />

          {/* users list */}
          <Main isLoading={isLoading} isError={isError} />
        </div>

        {/* aside menu about each user */}
        <AsideStudentInf />
      </MySocketControllerContext.Provider>
    </div>
  );
};
