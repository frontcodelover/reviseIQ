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

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  colors: string[];
}

interface CardFolderProps {
  id: string;
  name: string;
  description: string;
  color: string;
  is_public: boolean;
}

interface Backend {
  getPublicDecks(): Promise<Deck[]>;
  getUserDecks(): Promise<Deck[]>;
  createDeck(deckData: Partial<Deck>): Promise<void>;
  upsertUser(userData: Partial<User>): Promise<void>;
  getFolderById(id: string): Promise<CardFolderProps>;
  deleteFolder(id: string): Promise<void>;
}
