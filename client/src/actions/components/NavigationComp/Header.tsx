import { Button } from "@nextui-org/react";
import { AlignJustify } from "lucide-react";
import useGlobalContext from "../../hooks/useGlobalContext";

export const Header = () => {
  const { asideMenuResize, setAsideMenuResize } = useGlobalContext();

  return (
    <header
      className={`flex items-center  ${
        asideMenuResize ? "justify-center" : "justify-end"
      }`}
    >
      <Button
        isIconOnly
        aria-label="burger"
        className="p-0 min-w-10 bg-transparent hover:bg-gray-600 text-slate-600"
        onClick={() => setAsideMenuResize(!asideMenuResize)}
      >
        <AlignJustify color="white" width={20} height={20} fill="#4896ff" />
      </Button>
    </header>
  );
};
