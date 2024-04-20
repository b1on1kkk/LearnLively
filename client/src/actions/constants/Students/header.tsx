import { GraduationCap, Landmark, Mail, UserRound } from "lucide-react";
import { ReactElement } from "react";

type Filter = "name" | "id" | "none";

export interface THeader {
  id: number;
  className: string;
  filter: Filter;
  title: string;
  icon: ReactElement;
}

export const HEADER: Array<THeader> = [
  {
    id: 0,
    className: "flex-[3] flex items-center gap-1 text-slate-400 font-semibold",
    filter: "name",
    title: "student name",
    icon: <UserRound width={16} height={16} />
  },
  {
    id: 1,
    className: "flex-[3] flex items-center gap-1 text-slate-400 font-semibold",
    filter: "id",
    title: "id number",
    icon: <UserRound width={16} height={16} />
  },
  {
    id: 2,
    className: "flex-[3] flex items-center gap-1 text-slate-400 font-semibold",
    filter: "none",
    title: "email",
    icon: <Mail width={16} height={16} />
  },
  {
    id: 3,
    className: "flex-[3] flex items-center gap-1 text-slate-400 font-semibold",
    filter: "none",
    title: "semester",
    icon: <GraduationCap width={16} height={16} />
  },
  {
    id: 4,
    className: "flex items-center gap-1 text-slate-400 font-semibold",
    filter: "none",
    title: "departament",
    icon: <Landmark width={16} height={16} />
  }
];
