import type { TNotification } from "../interfaces/notification";

export const Notification = ({ icon, message }: TNotification) => {
  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-3 text-slate-400">
      <div>{icon}</div>
      <div className="px-4 py-1 bg-slate-900 rounded-full flex items-center justify-center">
        <h2 className="font-semibold text-sm">{message}</h2>
      </div>
    </div>
  );
};
