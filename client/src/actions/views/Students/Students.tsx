import { Header } from "../../components/StudentsComp/Header";
import { Main } from "../../components/StudentsComp/Main";
import { Footer } from "../../components/StudentsComp/Footer";

import { AsideHeader } from "../../components/StudentsComp/AsideHeader";
import { AsideUserButtons } from "../../components/StudentsComp/AsideUserButtons";
import { AsideAcademicInfo } from "../../components/StudentsComp/AsideAcademicInfo";
import { AsideFooter } from "../../components/StudentsComp/AsideFooter";

import { QUERY_ROOT } from "../../constants/Query/query";

export const Students = () => {
  return (
    <div className="flex h-screen relative px-8 pb-6 pt-12 gap-8">
      {/* main block of users */}
      <div className="flex-[4] z-10 flex flex-col bg-transparent">
        {/* filtration and users header */}
        <Header />

        {/* users list */}
        <Main />

        {/* pagination */}
        <Footer />
      </div>

      {/* aside menu about each user */}
      <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-5 flex flex-col">
        {/* image and name */}
        <AsideHeader
          image_link={`${QUERY_ROOT}api/avatars/_29ae5d7d-5ce6-479e-b750-7aee6db7870e.jpg`}
          name="Nura"
          lastname="Aalvina"
          surname="Fatehi"
          id={123123134}
        />

        {/* call and message */}
        <AsideUserButtons onClickCall={() => {}} onClickChat={() => {}} />

        {/* academic info */}
        <AsideAcademicInfo
          semester_now={2}
          semester_end={4}
          department="Graphics Design"
        />

        {/* footer */}
        <AsideFooter onClickCreateFriends={() => {}} />
      </div>
    </div>
  );
};
