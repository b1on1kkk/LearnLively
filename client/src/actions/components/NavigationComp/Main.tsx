import { Image } from "@nextui-org/react";

export const Main = () => {
  return (
    <div className="flex justify-center flex-col items-center py-6 border-b-1 border-slate-800">
      <Image
        isBlurred
        alt="user avatar"
        width={160}
        src="http://localhost:3000/api/avatars/_29ae5d7d-5ce6-479e-b750-7aee6db7870e.jpg"
      ></Image>

      <div className="flex flex-col items-center mt-4">
        <span className="text-xl text-white font-semibold">Haris Ahmed</span>
        <span className="text-xs text-slate-500 font-semibold mt-1">
          Assistant professor
        </span>
      </div>
    </div>
  );
};
