import { Button } from "@nextui-org/react";

import type { TAsideFooter } from "../../interfaces/Students/Aside";
import useStudentsContext from "../../hooks/useStudentsContext";

export const AsideFooter = ({ onClickCreateFriends }: TAsideFooter) => {
  const { chosenUser } = useStudentsContext();

  console.log(chosenUser);

  return (
    <div className="flex-1 flex items-end">
      <Button
        className="w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-lg font-semibold"
        onClick={onClickCreateFriends}
      >
        Be friends!
      </Button>
    </div>
  );
};
