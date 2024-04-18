import { createContext } from "react";

import type { TStudentsContext } from "../../interfaces/Students/Main";

export const StudentsContext = createContext<TStudentsContext>({
  chosenUser: null,
  setChosenUser: () => {}
});
