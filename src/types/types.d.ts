interface User {
  id: string;
  name?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  status?: 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other';
  user_id?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

interface AvatarSelectProps {
  value: string;
  onChange: (value: string) => void;
}

interface Flashcard {
  id?: string | number;
  deck_id?: string | undefined;
  question: string;
  answer: string;
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
  thema: string;
}
// Removed duplicate User interface

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
  thema: string;
}

type PhoneInputProps = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value' | 'ref'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

interface ThemaProps {
  setThema: (value: string) => void;
  value: string;
}

interface BackendType {
  signUp(email: string, password: string);
  signInWithEmail(email: string, password: string);
  signInWithProvider(provider: 'google'): Promise<void>;
  signOut(): Promise<void>;
  getUser();
  getUserId(): Promise<string>;
  hasUserProfile(userId: string);

  // User Methods
  getUserDecks(): Promise<Folder[]>;
  createDeck(deckData: {
    title: string;
    description: string;
    is_public: boolean;
  }): Promise<void>;
  upsertUser(userData: User | ({ user_id: string } & Partial<User>));
  getUserProfile(userId: string);

  // Folder Methods
  getPublicFolders(): Promise<Folder[]>;
  getFolderById(id: string): Promise<Folder>;
  deleteFolder(id: string): Promise<void>;

  // Flashcard Methods
  createFlashcard(flashcardData: Flashcard): Promise<void>;
  getFlashcards(deckId: string): Promise<Flashcard[]>;
  generateFlashcards(topic: string): Promise<Flashcard[]>;
}
