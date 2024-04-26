import { Image } from "@nextui-org/react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

export const Main = () => {
  const { user } = useSelector((u: RootState) => u.user);

  return (
    <div className="flex justify-center flex-col items-center py-6 border-b-1 border-slate-800 h-[280px]">
      {user && (
        <>
          <Image
            isBlurred
            alt="user avatar"
            width={160}
            src={`http://localhost:3000/api/avatars/${user.img_hash_name}.jpg`}
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
