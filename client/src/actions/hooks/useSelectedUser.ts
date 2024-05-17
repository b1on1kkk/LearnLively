import { useEffect, useState } from "react";
import { ExtendedStudents, Student } from "../interfaces/Students/Main";

const useStudentSelection = (students: Array<Student> | null) => {
  const [extendedStudents, setExtendedStudents] = useState<
    Array<ExtendedStudents>
  >([]);
  const [createGroupIndexes, setCreateGroupIndexes] = useState<
    Array<ExtendedStudents>
  >([]);

  useEffect(() => {
    if (students && students.length > 0 && extendedStudents.length === 0) {
      setExtendedStudents([
        ...students.map((student) => {
          return { ...student, chosen_status: false };
        })
      ]);
    }
  }, [students]);

  const selectedUser = (id: number) => {
    setExtendedStudents([
      ...extendedStudents.map((student) => {
        if (student.id === id) {
          const extended_student = {
            ...student,
            chosen_status: !student.chosen_status
          };

          if (extended_student.chosen_status) {
            setCreateGroupIndexes([...createGroupIndexes, extended_student]);
          } else {
            setCreateGroupIndexes(
              createGroupIndexes.filter((group_student) => {
                if (group_student.id !== extended_student.id) {
                  return group_student;
                }
              })
            );
          }

          return extended_student;
        }
        return { ...student };
      })
    ]);
  };

  return {
    extendedStudents,
    createGroupIndexes,
    selectedUser
  };
};

export default useStudentSelection;
