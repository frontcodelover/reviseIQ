interface User {
  id: string;
  name?: string;
  email?: string;
  firstname?: string;
  phone?: string;
  status?: 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other';
  user_id?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

interface FirstTimeFormProps {
  user: User;
  onSubmit: () => void;
}
