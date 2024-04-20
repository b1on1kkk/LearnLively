import type { Student } from "./Main";

export interface THeader {
  tempStudents: Array<Student> | null;
  setStudents: (c: Array<Student> | null) => void;
}
