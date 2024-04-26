import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

export const AsideAcademicInfo = () => {
  const { chosenUser } = useSelector((cu: RootState) => cu.chosenUserChat);

  return (
    <div className="p-5 bg-[#00010d] rounded-lg flex flex-col gap-4 shadow-xl">
      <div className="font-semibold text-lg">Academic info.</div>

      <div className="font-semibold">
        <span className="text-xs text-slate-500">Semester</span>
        <br />
        <span className="text-sm">
          {chosenUser!.end_semester}th year - {chosenUser!.now_semester}nd
          semester
        </span>
      </div>

      <div className="font-semibold">
        <span className="text-xs text-slate-500">Batch Department</span>
        <br />
        <span className="text-sm">2010-2011; {chosenUser!.department}</span>
      </div>

      <div className="font-semibold">
        <span className="text-xs text-slate-500">Cumulative GPA/Grade</span>
        <br />
        <span className="text-sm">3.80 (A)</span>
      </div>
    </div>
  );
};
