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

interface Deck {
  id: string;
  name: string;
  description: string;
  is_public: boolean;
  color: string;
}

interface User {
  user_id: string;
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  status?: 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other';
}
