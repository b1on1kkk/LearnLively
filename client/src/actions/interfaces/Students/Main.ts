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
}

export interface TMainStudents {
  isLoading: boolean;
  isError: boolean;
  students: Student[] | undefined;
  setChosenUser: (c: number) => void;
}
