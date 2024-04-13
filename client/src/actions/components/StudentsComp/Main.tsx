import { Spinner, Button } from "@nextui-org/react";

import { Plus } from "lucide-react";

import type { TMainStudents } from "../../interfaces/Students/Main";

export const Main = ({
  students,
  isLoading,
  isError,
  setChosenUser
}: TMainStudents) => {
  return (
    <main className="mt-3 h-full bg-[#050615] rounded-2xl shadow-2xl px-6 mb-3 border-slate-900 border-2 overflow-auto">
      {isLoading && (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner classNames={{ circle1: "yellow" }} size="lg"></Spinner>
        </div>
      )}

      {!isError && (
        <ul className="divide-y divide-dashed divide-slate-800">
          {students?.map((student, idx) => {
            return (
              <li className="flex items-center py-1 gap-2" key={idx}>
                <Button
                  className="text-sm text-slate-500 font-semibold w-full bg-transparent justify-start text-start h-unit-2xl hover:bg-gray-600 hover:text-white flex-1"
                  onClick={() => setChosenUser(idx)}
                >
                  <span className="flex-[2]">
                    {student.name} {student.lastname} {student.surname}
                  </span>
                  <span className="flex-1">{student.id}</span>
                  <span className="flex-[2]">{student.email}</span>
                  <span className="flex-1">
                    {student.end_semester}/{student.now_semester}
                  </span>
                  <span>{student.department}</span>
                </Button>
                <Button className="min-w-0 p-0 px-2.5 bg-transparent hover:bg-green-500 text-slate-500 hover:text-white">
                  <Plus width={20} height={20}></Plus>
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};
