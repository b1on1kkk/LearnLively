import { Header } from "../../components/StudentsComp/Header";
import { Main } from "../../components/StudentsComp/Main";
import { Footer } from "../../components/StudentsComp/Footer";

import { Button, Divider, Image } from "@nextui-org/react";
import { MessageSquareMore, PhoneOutgoing } from "lucide-react";

export const Students = () => {
  return (
    <div className="flex h-screen relative px-8 pb-6 pt-12 gap-8">
      {/* main block of users */}
      <div className="flex-[4] z-10 flex flex-col bg-transparent">
        <Header />

        <Main />

        <Footer />
      </div>

      {/* aside menu about each user */}
      <div className="z-10 flex-1 bg-[#050615] rounded-2xl shadow-2xl border-2 border-slate-900 p-5 flex flex-col">
        {/* image and name */}
        <div>
          <Image
            isZoomed
            removeWrapper={false}
            src="http://localhost:3000/api/avatars/_29ae5d7d-5ce6-479e-b750-7aee6db7870e.jpg"
            alt="student avatar"
          ></Image>
          <div className="bg-[#050615] backdrop-opacity-25 block rounded-lg p-3 -mt-[130px] z-10 relative m-4 bg-opacity-90 border-2 border-slate-900">
            <div className="text-2xl text-center font-bold mb-3">
              <span>
                <h1>Nura Aalvina</h1>
              </span>
              <span>
                <h1>Fatehi</h1>
              </span>
            </div>

            <div className="text-center text-xs text-slate-500">
              <span>Student ID: 123123134</span>
            </div>
          </div>
        </div>

        {/* call and message */}
        <div className="flex gap-3 p-5 items-center">
          <Button
            startContent={<MessageSquareMore width={18} height={18} />}
            className="bg-transparent text-xs font-semibold flex-1 hover:bg-gray-600 text-slate-600 hover:text-white"
          >
            Chat
          </Button>
          <Divider orientation="vertical" className="h-5" />
          <Button
            startContent={<PhoneOutgoing width={18} height={18} />}
            className="bg-transparent text-xs font-semibold flex-1 hover:bg-gray-600 text-slate-600 hover:text-white"
          >
            Call
          </Button>
        </div>

        {/* academic info */}
        <div className="p-5 bg-[#00010d] rounded-lg flex flex-col gap-4 shadow-xl">
          <div className="font-semibold text-lg">Academic info.</div>

          <div className="font-semibold">
            <span className="text-xs text-slate-500">Semester</span>
            <br />
            <span className="text-sm">4th year - 2nd semester</span>
          </div>

          <div className="font-semibold">
            <span className="text-xs text-slate-500">Batch Department</span>
            <br />
            <span className="text-sm">4th year - 2nd semester</span>
          </div>

          <div className="font-semibold">
            <span className="text-xs text-slate-500">Cumulative GPA/Grade</span>
            <br />
            <span className="text-sm">3.80 (A)</span>
          </div>
        </div>

        {/* footer */}
        <div className="flex-1 flex items-end">
          <Button className="w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-lg font-semibold">
            Be friends!
          </Button>
        </div>
      </div>
    </div>
  );
};
