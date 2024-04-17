import { TooltipProps } from "@nextui-org/react";
import { ReactElement } from "react";

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
}

export interface TMainStudents {
  isLoading: boolean;
  isError: boolean;
  students: Student[] | undefined;
}

export interface TStudentsContext {
  chosenUser: number | null;
  setChosenUser: (c: number) => void;
}

export interface TRequestsButton extends TooltipProps {
  onClick: () => void;
  status: "accept" | "reject";
  image: ReactElement;
}
