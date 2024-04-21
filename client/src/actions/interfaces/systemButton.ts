import { ReactElement } from "react";

export interface TSystemButton {
  icon: ReactElement;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
