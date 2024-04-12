import { Button, Divider } from "@nextui-org/react";
import { MessageSquareMore, PhoneOutgoing } from "lucide-react";
import type { TAsideUserButtons } from "../../interfaces/Students/Aside";

export const AsideUserButtons = ({
  onClickCall,
  onClickChat
}: TAsideUserButtons) => {
  return (
    <div className="flex gap-3 p-5 items-center">
      <Button
        startContent={<MessageSquareMore width={18} height={18} />}
        className="bg-transparent text-xs font-semibold flex-1 hover:bg-gray-600 text-slate-600 hover:text-white"
        onClick={onClickChat}
      >
        Chat
      </Button>
      <Divider orientation="vertical" className="h-5" />
      <Button
        startContent={<PhoneOutgoing width={18} height={18} />}
        className="bg-transparent text-xs font-semibold flex-1 hover:bg-gray-600 text-slate-600 hover:text-white"
        onClick={onClickCall}
      >
        Call
      </Button>
    </div>
  );
};
