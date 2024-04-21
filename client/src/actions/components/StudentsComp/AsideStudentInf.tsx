import { UserSearch } from "lucide-react";

import { AsideHeader } from "./AsideHeader";
import { AsideUserButtons } from "./AsideUserButtons";
import { AsideAcademicInfo } from "./AsideAcademicInfo";
import { AsideFooter } from "./AsideFooter";
import { Notification } from "../Notification";

import { QUERY_ROOT } from "../../constants/Query/query";
import type { TAsideStudentInf } from "../../interfaces/Students/AsideStudents";
import useStudentsContext from "../../hooks/useStudentsContext";

export const AsideStudentInf = ({ socketController }: TAsideStudentInf) => {
  const { chosenUser } = useStudentsContext();

  return (
    <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-5 flex flex-col max-w-72">
      {chosenUser ? (
        <>
          {/* image and name */}
          <AsideHeader
            image_link={`${QUERY_ROOT}api/avatars/${chosenUser.img_hash_name}.jpg`}
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
        <Notification
          icon={<UserSearch width={80} height={80} />}
          message="Select a student!"
        />
      )}
    </div>
  );
};
