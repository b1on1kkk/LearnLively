export interface UserFriend {
  status: "pending" | "rejected" | "accepted";
  user_id: number;
  friend_id: number;
}

export interface Student {
  id: number;
  name: string;
  lastname: string;
  surname: string;
  role: string;
  email: string;
  end_semester: number;
  now_semester: number;
  department: string;
  img_hash_name: string;
  friends_friends_friend_idTousers: UserFriend[];
  friends_friends_user_idTousers: UserFriend[];
}

export interface TMainStudents {
  isLoading: boolean;
  isError: boolean;
  students: Student[] | null;
}

export interface TStudentsContext {
  chosenUser: number | null;
  setChosenUser: (c: number) => void;
}
