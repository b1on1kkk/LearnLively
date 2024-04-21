import { AlignJustify } from "lucide-react";

import { SystemButton } from "../SystemButton";

export const Header = () => {
  return (
    <header className="flex items-center justify-end">
      <SystemButton
        label="burger"
        icon={<AlignJustify width={18} height={18} />}
        onClick={() => {}}
      />
    </header>
  );
};
