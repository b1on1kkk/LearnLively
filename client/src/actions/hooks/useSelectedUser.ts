import { useEffect, useState } from "react";
import { ExtendedStudents, Student } from "../interfaces/Students/Main";

const useStudentSelection = <T>(
  students: Array<Student> | null,
  trigger: T
) => {
  const [extendedStudents, setExtendedStudents] = useState<
    Array<ExtendedStudents>
  >([]);
  const [createGroupIndexes, setCreateGroupIndexes] = useState<Array<number>>(
    []
  );

  useEffect(() => {
    if (students && students.length > 0) {
      setExtendedStudents([
        ...students.map((student) => {
          return { ...student, chosen_status: false };
        })
      ]);
    }
  }, [students, trigger]);

  useEffect(() => {
    if (!trigger) setCreateGroupIndexes([]);
  }, [trigger]);

  const selectedUser = (id: number) => {
    setExtendedStudents([
      ...extendedStudents.map((student) => {
        if (student.id === id) {
          const extended_student = {
            ...student,
            chosen_status: !student.chosen_status
          };

          if (extended_student.chosen_status) {
            setCreateGroupIndexes([...createGroupIndexes, extended_student.id]);
          } else {
            setCreateGroupIndexes(
              createGroupIndexes.filter((group_student) => {
                if (group_student !== extended_student.id) {
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
