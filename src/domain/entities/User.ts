export interface User {
  id?: string;
  name?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  status?: 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other';
  user_id?: string;
  avatar?: string;
}
