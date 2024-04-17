import { Image } from "@nextui-org/react";

import useGlobalContext from "../../hooks/useGlobalContext";

export const Main = () => {
  const { user } = useGlobalContext();

  return (
    <div className="flex justify-center flex-col items-center py-6 border-b-1 border-slate-800 h-[280px]">
      {user && (
        <>
          <Image
            isBlurred
            alt="user avatar"
            width={160}
            src="http://localhost:3000/api/avatars/_29ae5d7d-5ce6-479e-b750-7aee6db7870e.jpg"
          />

          <div className="flex flex-col items-center mt-4">
            <span className="text-xl text-white font-semibold">
              {user.name} {user.lastname}
            </span>
            <span className="text-xs text-slate-500 font-semibold mt-1">
              {user.role}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
