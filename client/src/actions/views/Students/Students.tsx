import { Header } from "../../components/StudentsComp/Header";
import { Main } from "../../components/StudentsComp/Main";
import { Footer } from "../../components/StudentsComp/Footer";

export const Students = () => {
  return (
    <div className="flex h-screen relative overflow-hidden px-8 pb-6 pt-12 gap-8">
      {/* main block of users */}
      <div className="flex-[3] z-10 flex flex-col bg-transparent">
        <Header />

        <Main />

        <Footer />
      </div>

      {/* aside menu about each user */}
      <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900">
        user inf here
      </div>
    </div>
  );
};
