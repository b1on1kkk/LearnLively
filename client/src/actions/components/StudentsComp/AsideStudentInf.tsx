import { UserRoundSearch } from "lucide-react";

import { useSelector } from "react-redux";

import { AsideFooter } from "./AsideFooter";
import { AsideHeader } from "./AsideHeader";
import { Notification } from "../Notification";
import { AsideUserButtons } from "./AsideUserButtons";
import { AsideAcademicInfo } from "./AsideAcademicInfo";

import { RootState } from "../../store/store";

export const AsideStudentInf = () => {
  const { students } = useSelector((u: RootState) => u.students);
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  return (
    <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-5 flex flex-col max-w-72">
      {chosenUser && students ? (
        <>
          {/* image and name */}
          <AsideHeader />

          {/* call and message */}
          <AsideUserButtons />

          {/* academic info */}
          <AsideAcademicInfo />

          {/* footer */}
          <AsideFooter />
        </>
      ) : (
        <Notification
          icon={<UserRoundSearch width={80} height={80} />}
          message="Select a student!"
        />
      )}
    </div>
  );
};
