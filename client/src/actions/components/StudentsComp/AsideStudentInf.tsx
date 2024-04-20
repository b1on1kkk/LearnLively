import { UserSearch } from "lucide-react";

import { AsideHeader } from "./AsideHeader";
import { AsideUserButtons } from "./AsideUserButtons";
import { AsideAcademicInfo } from "./AsideAcademicInfo";
import { AsideFooter } from "./AsideFooter";

import { QUERY_ROOT } from "../../constants/Query/query";
import type { TAsideStudentInf } from "../../interfaces/Students/AsideStudents";

export const AsideStudentInf = ({
  chosenUser,
  socketController
}: TAsideStudentInf) => {
  return (
    <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-5 flex flex-col max-w-72">
      {chosenUser ? (
        <>
          {/* image and name */}
          <AsideHeader
            image_link={`${QUERY_ROOT}api/avatars/_29ae5d7d-5ce6-479e-b750-7aee6db7870e.jpg`}
            name={chosenUser.name}
            lastname={chosenUser.lastname}
            surname={chosenUser.surname}
            id={chosenUser.id}
          />

          {/* call and message */}
          <AsideUserButtons onClickCall={() => {}} onClickChat={() => {}} />

          {/* academic info */}
          <AsideAcademicInfo
            semester_now={chosenUser.now_semester}
            semester_end={chosenUser.end_semester}
            department={chosenUser.department}
          />

          {/* footer */}
          <AsideFooter socketController={socketController} />
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
  );
};
