export const StartChat = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="p-4 flex flex-col text-center gap-2 bg-[#00010d] rounded-2xl border-slate-900 border-2">
        <span className="font-semibold">No messages here yet...</span>
        <span className="text-sm">
          Send your first message
          <br />
          and start chatting!
        </span>
      </div>
    </div>
  );
};
