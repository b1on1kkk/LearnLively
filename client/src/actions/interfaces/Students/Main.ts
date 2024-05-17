import { ReactElement } from "react";
import { TooltipProps } from "@nextui-org/react";

interface RequestInitiator {
  id: number;
  user_id: number;
  friend_id: number;
  status: "pending" | "rejected" | "accepted";
}

export interface Student {
  id: number;
  name: string;
  lastname: string;
  surname: string;
  role: string;
  email: string;
  end_semester: number;
  now_semester: number;
  department: string;
  img_hash_name: string;
  created_at: Date;
  friends_friends_friend_idTousers: Array<RequestInitiator>;
  friends_friends_user_idTousers: Array<RequestInitiator>;
}

export interface TMainStudents {
  isError: boolean;
  isLoading: boolean;
}

export interface TRequestsButton extends TooltipProps {
  onClick: () => void;
  status: "accept" | "reject";
  image: ReactElement;
  classNameStatus: "positive" | "negative";
}

export interface ExtendedStudents extends Student {
  chosen_status: boolean;
}

export interface GroupModalSteps {
  title: string;
  backButton: boolean;
  nextButton: boolean;
  createButton: boolean;
  slide: boolean;
  tooltip_text: string;
}

export interface GroupData {
  title: string;
  description: string;
}

export interface TBodyGroupChatModal {
  next: GroupModalSteps;
  groupHandler: GroupData;
  extendedStudents: Array<ExtendedStudents>;

  selectedUser: (id: number) => void;
  groupDataHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
