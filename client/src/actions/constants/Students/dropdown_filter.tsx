import { UserRound, UsersRound } from "lucide-react";
import type { TDropdownFilter } from "../../interfaces/Students/SortReducer";

export const DROPDOWN_FILTER: Array<TDropdownFilter> = [
  {
    key: "friends",
    description: "You'll see only your friends.",
    startContent: <UsersRound />,
    text: "All my friends."
  },
  {
    key: "not_my_friends",
    description: "You'll see only new people to you.",
    startContent: <UserRound />,
    text: "People new to me."
  }
];
