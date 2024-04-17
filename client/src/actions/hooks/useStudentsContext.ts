import { useContext } from "react";

import { StudentsContext } from "../context/Students/StudentsContext";

const useStudentsContext = () => useContext(StudentsContext);

export default useStudentsContext;
