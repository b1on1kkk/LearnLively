import { useContext } from "react";

import { StudentsContext } from "../context/StudentsContext/StudentsContext";

const useStudentsContext = () => useContext(StudentsContext);

export default useStudentsContext;
