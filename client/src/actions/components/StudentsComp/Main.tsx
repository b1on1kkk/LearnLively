import { Button } from "@nextui-org/react";

import { Plus } from "lucide-react";

export const Main = () => {
  const fakeArray = new Array(11).fill(0);

  return (
    <main className="mt-3 h-full bg-[#050615] rounded-2xl shadow-2xl px-6 divide-y divide-dashed divide-slate-800 mb-3 border-slate-900 border-2 overflow-auto">
      {fakeArray.map((_, idx) => {
        return (
          <div className="flex items-center py-1" key={idx}>
            <Button
              className="text-sm text-slate-500 font-semibold w-full bg-transparent justify-start text-start h-unit-2xl hover:bg-gray-600 hover:text-white flex-1"
              onClick={() => {}}
            >
              <span className="flex-[2]">Arafat Ahmed Chowdhury</span>
              <span className="flex-1">1</span>
              <span className="flex-[2]">arafat.nayeem@gmail.com</span>
              <span className="flex-1">4/2</span>
              <span>Graphic D.</span>
            </Button>
            <Button className="min-w-0 p-0 px-2.5 bg-transparent hover:bg-green-500 text-slate-500 hover:text-white">
              <Plus width={20} height={20}></Plus>
            </Button>
          </div>
        );
      })}
    </main>
  );
};
