import { Student } from "../../interfaces/Students/Main";

export function checkFriendship(students: Array<Student>, user_id: number) {
  for (let i = 0; i < students.length; i++) {
    const {
      id,
      friends_friends_friend_idTousers: friend,
      friends_friends_user_idTousers: user
    } = students[i];

    if (id === user_id) {
      if (
        (friend.length > 0 && friend[0].status === "accepted") ||
        (user.length > 0 && user[0].status === "accepted")
      ) {
        return true;
      }
    }
  }

  return false;
}
