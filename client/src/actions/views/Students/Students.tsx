import { useState } from "react";
import useStudents from "../../hooks/useStudents";

import { UserSearch } from "lucide-react";

import { Header } from "../../components/StudentsComp/Header";
import { Main } from "../../components/StudentsComp/Main";
import { Footer } from "../../components/StudentsComp/Footer";
import { AsideHeader } from "../../components/StudentsComp/AsideHeader";
import { AsideUserButtons } from "../../components/StudentsComp/AsideUserButtons";
import { AsideAcademicInfo } from "../../components/StudentsComp/AsideAcademicInfo";
import { AsideFooter } from "../../components/StudentsComp/AsideFooter";

import { StudentsContext } from "../../context/Students/StudentsContext";

import { QUERY_ROOT } from "../../constants/Query/query";

export const Students = () => {
  const { data: students, isError, isLoading } = useStudents();
  const [chosenUser, setChosenUser] = useState<null | number>(null);

  return (
    <div className="flex h-screen relative px-8 pb-6 pt-12 gap-8">
      <StudentsContext.Provider value={{ chosenUser, setChosenUser }}>
        {/* main block of users */}
        <div className="flex-[4] z-10 flex flex-col bg-transparent">
          {/* filtration and users header */}
          <Header />

          {/* users list */}
          <Main students={students} isLoading={isLoading} isError={isError} />

          {/* pagination */}
          <Footer />
        </div>

        {/* aside menu about each user */}
        <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-5 flex flex-col max-w-72">
          {chosenUser !== null && students ? (
            <>
              {/* image and name */}
              <AsideHeader
                image_link={`${QUERY_ROOT}api/avatars/_29ae5d7d-5ce6-479e-b750-7aee6db7870e.jpg`}
                name={students[chosenUser].name}
                lastname={students[chosenUser].lastname}
                surname={students[chosenUser].surname}
                id={students[chosenUser].id}
              />

              {/* call and message */}
              <AsideUserButtons onClickCall={() => {}} onClickChat={() => {}} />

              {/* academic info */}
              <AsideAcademicInfo
                semester_now={students[chosenUser].now_semester}
                semester_end={students[chosenUser].end_semester}
                department={students[chosenUser].department}
              />

              {/* footer */}
              <AsideFooter onClickCreateFriends={() => {}} />
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-5 text-slate-400">
              <div>
                <UserSearch width={80} height={80} />
              </div>
              <div className="text-center text-lg font-semibold">
                <h1>Select a student to see detailed information</h1>
              </div>
            </div>
          )}
        </div>
      </StudentsContext.Provider>
    </div>
  );
};
