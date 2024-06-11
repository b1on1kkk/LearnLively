import { icons } from "lucide-react";

interface IconPayload {
  icon_name: string;
  width?: number;
  height?: number;
}

export function Icon({ icon_name, width = 20, height = 20 }: IconPayload) {
  if (icon_name) {
    const Icon = icons[icon_name as keyof typeof icons];

    return <Icon width={width} height={height} />;
  }
  return <></>;
}
