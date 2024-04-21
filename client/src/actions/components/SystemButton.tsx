import { Button } from "@nextui-org/react";

import type { TSystemButton } from "../interfaces/systemButton";

export const SystemButton = ({ icon, label, onClick }: TSystemButton) => {
  return (
    <Button
      isIconOnly
      aria-label={label}
      className="p-0 min-w-10 bg-transparent hover:bg-gray-600 text-slate-400 hover:text-white"
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};
