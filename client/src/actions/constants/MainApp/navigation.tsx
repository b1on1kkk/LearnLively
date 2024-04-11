import {
  LayoutGrid,
  BookOpenText,
  NotepadText,
  NotebookPen,
  BookOpenCheck,
  UsersRound,
  MessageSquareMore,
  ClipboardList,
  Radio
} from "lucide-react";

import type { TNavigationTabs } from "../../interfaces/MainApp/TNavigationTabs";

export const NAVIGATION_TABS: Array<TNavigationTabs> = [
  {
    id: 0,
    picture: <LayoutGrid width={20} height={20} className="bg-transparent" />,
    title: "Dashboard",
    notifications: 0,
    link_to: "dashboard"
  },
  {
    id: 1,
    picture: <BookOpenText width={20} height={20} className="bg-transparent" />,
    title: "Courses",
    notifications: 0,
    link_to: "courses"
  },
  {
    id: 2,
    picture: <NotepadText width={20} height={20} className="bg-transparent" />,
    title: "Routine",
    notifications: 0,
    link_to: "routine"
  },
  {
    id: 3,
    picture: <NotebookPen width={20} height={20} className="bg-transparent" />,
    title: "Exam",
    notifications: 0,
    link_to: "exam"
  },
  {
    id: 4,
    picture: (
      <BookOpenCheck width={20} height={20} className="bg-transparent" />
    ),
    title: "Results",
    notifications: 0,
    link_to: "results"
  },
  {
    id: 5,
    picture: <UsersRound width={20} height={20} className="bg-transparent" />,
    title: "Students",
    notifications: 0,
    link_to: "students"
  },
  {
    id: 6,
    picture: (
      <MessageSquareMore width={20} height={20} className="bg-transparent" />
    ),
    title: "Message",
    notifications: 0,
    link_to: "message"
  },
  {
    id: 7,
    picture: (
      <ClipboardList width={20} height={20} className="bg-transparent" />
    ),
    title: "Notice Board",
    notifications: 0,
    link_to: "notice_board"
  },
  {
    id: 8,
    picture: <Radio width={20} height={20} className="bg-transparent" />,
    title: "Live Class",
    notifications: 0,
    link_to: "live_class"
  }
];
