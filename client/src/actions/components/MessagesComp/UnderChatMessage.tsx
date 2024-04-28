import React, { ReactElement } from "react";
import { SystemButton } from "../SystemButton";
import { X } from "lucide-react";

interface TUnderChatMessage {
  icon: ReactElement;
  content: string;
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const UnderChatMessage = ({
  content,
  title,
  icon,
  onClick
}: TUnderChatMessage) => {
  return (
    <div className="flex pl-3 py-2 items-center gap-5 border-b-1 border-slate-900">
      <div>{icon}</div>
      <div className="truncate flex-1 text-sm">
        <h1 className="font-bold">{title}</h1>

        <span>{content}</span>
      </div>
      <div>
        <SystemButton
          icon={<X width={18} height={18} />}
          label="close"
          onClick={onClick}
        />
      </div>
    </div>
  );
};
