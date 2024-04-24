export interface TAsideHeader {
  image_link: string;
  name: string;
  lastname: string;
  surname: string;
  id: number;
}

export interface TAsideUserButtons {
  chosenUser: number | null;
  onClickChat: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickCall: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface TAsideAcademicInfo {
  semester_now: number;
  semester_end: number;
  department: string;
}
