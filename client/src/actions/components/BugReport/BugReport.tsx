import { Bug } from "lucide-react";

export const BugReport = () => {
  return (
    <a
      href={"https://github.com/b1on1kkk/LearnLively/issues"}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute right-5 bottom-5 z-50 p-2 bg-[#050615] rounded-lg flex items-center justify-center shadow-xl text-slate-400 transition-colors border-2 border-slate-900 hover:text-primary-500 hover:border-primary-500"
    >
      <Bug width={18} height={18} />
    </a>
  );
};
