import { Button } from "@nextui-org/react";
import { ArrowDownZa, ArrowUpZa, UserRound } from "lucide-react";

import type { THeaderFilterButton } from "../../interfaces/Students/SortReducer";

export const HeaderFilterButton = ({
  onClick,
  status,
  value,
  title
}: THeaderFilterButton) => {
  return (
    <Button
      className="uppercase bg-transparent text-slate-400 hover:bg-gray-600 hover:text-white"
      onClick={onClick}
    >
      <div>
        <UserRound width={16} height={16} />
      </div>
      <span>{title}</span>
      <div
        className={`p-1 rounded-full ${
          status && "bg-gray-700"
        } transition-colors duration-100`}
      >
        {value === "asc" ? (
          <ArrowDownZa width={18} height={18} />
        ) : (
          <ArrowUpZa width={18} height={18} />
        )}
      </div>
    </Button>
  );
};
