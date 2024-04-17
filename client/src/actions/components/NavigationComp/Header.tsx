import { Button } from "@nextui-org/react";
import { AlignJustify } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center justify-end">
      <Button
        isIconOnly
        aria-label="burger"
        className="p-0 min-w-10 bg-transparent hover:bg-gray-600 text-slate-600"
      >
        <AlignJustify color="white" width={20} height={20} fill="#4896ff" />
      </Button>
    </header>
  );
};
