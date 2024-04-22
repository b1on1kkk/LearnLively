import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { UserSearch } from "lucide-react";

import { AsideHeader } from "./AsideHeader";
import { AsideUserButtons } from "./AsideUserButtons";
import { AsideAcademicInfo } from "./AsideAcademicInfo";
import { AsideFooter } from "./AsideFooter";
import { Notification } from "../Notification";

import { QUERY_ROOT } from "../../constants/Query/query";
import type { TAsideStudentInf } from "../../interfaces/Students/AsideStudents";

export const AsideStudentInf = ({ socketController }: TAsideStudentInf) => {
  const { chosenUser, students } = useSelector((u: RootState) => u.students);

  return (
    <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-5 flex flex-col max-w-72">
      {/*  небольшая пасхалка от разработчика :) вдруг, кто-то увидит это, но тут говнокод, его по хорошему переделать надо :) 
           как и везде, где есть такое длинное условие
      */}
      {chosenUser !== null && students && students.length > 0 ? (
        <>
          {/* image and name */}
          <AsideHeader
            image_link={`${QUERY_ROOT}api/avatars/${students[chosenUser].img_hash_name}.jpg`}
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
          <AsideFooter socketController={socketController} />
        </>
      ) : (
        <Notification
          icon={<UserSearch width={80} height={80} />}
          message="Select a student!"
        />
      )}
    </div>
  );
};
