export interface findUserByIdPayload {
  id: number;
  name: string;
  lastname: string;
  email: string;
  surname: string;
  role: 'student' | 'teacher';
  img_hash_name: string;
}
