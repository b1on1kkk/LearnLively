import { useCallback } from "react";

import { Construction } from "lucide-react";

import { Notification } from "../Notification";

export const InDevelopmentTemplate = ({ route }: { route: string }) => {
  const capitalizeFirstLetter = useCallback(
    () => route.replace(/^[a-z]/, (match) => match.toUpperCase()),
    [route]
  );

  return (
    <div className="h-full flex items-center justify-center">
      <Notification
        icon={<Construction width={80} height={80} />}
        message={`${capitalizeFirstLetter()} route is in development`}
      />
    </div>
  );
};
