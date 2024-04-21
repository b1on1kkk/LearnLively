import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import type { Student } from "../../interfaces/Students/Main";
import { AppDispatch } from "../../store/store";
import { studentsActions } from "../../store/features/students.slice";

export function userFiltration(
  filterStatus: string,
  tempAllStudents: Array<Student> | null,
  reduxDispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction>
) {
  if (filterStatus && tempAllStudents) {
    switch (filterStatus) {
      case "friends":
        reduxDispatch(
          studentsActions.initStudents([
            ...tempAllStudents.filter((student) => {
              if (
                (student.friends_friends_friend_idTousers.length > 0 &&
                  student.friends_friends_friend_idTousers[0].status ===
                    "accepted") ||
                (student.friends_friends_user_idTousers.length > 0 &&
                  student.friends_friends_user_idTousers[0].status ===
                    "accepted")
              ) {
                return student;
              }
            })
          ])
        );
        break;

      case "pending_requests":
        reduxDispatch(
          studentsActions.initStudents([
            ...tempAllStudents.filter((student) => {
              if (
                (student.friends_friends_friend_idTousers.length > 0 &&
                  student.friends_friends_friend_idTousers[0].status ===
                    "pending") ||
                (student.friends_friends_user_idTousers.length > 0 &&
                  student.friends_friends_user_idTousers[0].status ===
                    "pending")
              ) {
                return student;
              }
            })
          ])
        );
        break;

      case "all_students":
        reduxDispatch(studentsActions.initStudents([...tempAllStudents]));
        break;
    }
  }
}
