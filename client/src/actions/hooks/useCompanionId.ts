import { useEffect, useState } from "react";
import { Student } from "../interfaces/Students/Main";

const useCompanionId = (students: Student[] | null, id: number) => {
  const [companionId, setCompanionId] = useState<number>(-1);

  useEffect(() => {
    if (students) {
      setCompanionId(students.findIndex((student) => student.id === id));
    } else {
      setCompanionId(-1);
    }
  }, [students, id]);

  return companionId;
};

export default useCompanionId;
