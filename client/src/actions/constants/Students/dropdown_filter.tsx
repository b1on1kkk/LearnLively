import { UsersRound, CircleEllipsis } from "lucide-react";
import type { TDropdownFilter } from "../../interfaces/Students/Header";

export const DROPDOWN_FILTER: Array<TDropdownFilter> = [
  {
    key: "friends",
    description: "You'll see only your friends.",
    startContent: <UsersRound />,
    text: "Friends."
  },
  {
    key: "pending_requests",
    description: "You'll see students you sent request.",
    startContent: <CircleEllipsis />,
    text: "All friend requests."
  },
  {
    key: "all_students",
    description: "You'll see all students.",
    startContent: <UsersRound />,
    text: "All students."
  }
];
