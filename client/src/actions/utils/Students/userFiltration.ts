import type { Student } from "../../interfaces/Students/Main";

export function userFiltration(
  filterStatus: string,
  tempAllStudents: Array<Student> | null,
  setStudents: (c: Array<Student> | null) => void
) {
  if (filterStatus && tempAllStudents) {
    switch (filterStatus) {
      case "friends":
        setStudents([
          ...tempAllStudents.filter((student) => {
            if (
              (student.friends_friends_friend_idTousers.length > 0 &&
                student.friends_friends_friend_idTousers[0].status ===
                  "accepted") ||
              (student.friends_friends_user_idTousers.length > 0 &&
                student.friends_friends_user_idTousers[0].status === "accepted")
            ) {
              return student;
            }
          })
        ]);
        break;

      case "pending_requests":
        setStudents([
          ...tempAllStudents.filter((student) => {
            if (
              (student.friends_friends_friend_idTousers.length > 0 &&
                student.friends_friends_friend_idTousers[0].status ===
                  "pending") ||
              (student.friends_friends_user_idTousers.length > 0 &&
                student.friends_friends_user_idTousers[0].status === "pending")
            ) {
              return student;
            }
          })
        ]);
        break;

      case "all_students":
        setStudents([...tempAllStudents]);
        break;
    }
  }
}
