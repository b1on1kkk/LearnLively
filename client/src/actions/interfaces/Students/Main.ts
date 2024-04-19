import { TooltipProps } from "@nextui-org/react";
import { ReactElement } from "react";

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
  isLoading: boolean;
  isError: boolean;
  students: Array<Student> | null;
  setStudents: (c: Array<Student> | null) => void;
}

export interface TStudentsContext {
  chosenUser: Student | null;
  setChosenUser: (c: Student) => void;
}

export interface TRequestsButton extends TooltipProps {
  onClick: () => void;
  status: "accept" | "reject";
  image: ReactElement;
  classNameStatus: "positive" | "negative";
}
