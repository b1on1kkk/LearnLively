export interface TAsideHeader {
  image_link: string;
  name: string;
  lastname: string;
  surname: string;
  id: number;
}

export interface TAsideUserButtons {
  onClickChat: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickCall: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface TAsideAcademicInfo {
  semester_now: number;
  semester_end: number;
  department: string;
}
