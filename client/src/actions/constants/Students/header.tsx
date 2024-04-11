import { GraduationCap, Landmark, Mail } from "lucide-react";

import {
  SortingActionKind,
  THeader
} from "../../interfaces/Students/SortReducer";

export const HEADER: Array<THeader> = [
  {
    id: 0,
    className: "flex-[3] flex items-center gap-1 text-slate-400 font-semibold",
    filter: "name",
    title: "student name",
    type: SortingActionKind.NAME
  },
  {
    id: 1,
    className: "flex-[3] flex items-center gap-1 text-slate-400 font-semibold",
    filter: "id",
    title: "id number",
    type: SortingActionKind.ID
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
    className: "flex-[2] flex items-center gap-1 text-slate-400 font-semibold",
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
