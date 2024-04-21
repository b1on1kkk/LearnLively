import { ReactElement } from "react";

import type { Student } from "./Main";

export interface THeader {
  tempStudents: Array<Student> | null;
}

export interface TDropdownFilter {
  key: string;
  description: string;
  startContent: ReactElement;
  text: string;
}
