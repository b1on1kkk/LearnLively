import { useContext } from "react";
import { StudentsContext } from "../context/Students/StudentsContext";

export const useStudentsContext = () => useContext(StudentsContext);
