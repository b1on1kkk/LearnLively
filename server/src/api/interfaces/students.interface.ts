import { Exclude } from 'class-transformer';

export class Students {
  id: number;
  name: string;
  lastname: string;
  surname: string;
  role: 'student' | 'teacher';

  @Exclude()
  email: string;

  end_semester: number;
  now_semester: number;
  department: string;

  @Exclude()
  password: string;

  img_hash_name: string;

  @Exclude()
  created_at: Date;
}
