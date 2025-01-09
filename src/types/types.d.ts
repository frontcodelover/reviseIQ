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

interface Backend {
  getPublicDecks(): Promise<Deck[]>;
  getUserDecks(): Promise<Deck[]>;
  createDeck(deckData: Partial<Deck>): Promise<void>;
  upsertUser(userData: Partial<User>): Promise<void>;
  getFolderById(id: string): Promise<CardFolderProps>;
  deleteFolder(id: string): Promise<void>;
  hasUserProfile(userId: string): Promise<boolean>;
  getUserProfile(userId: string): Promise<User | null>;
  createFlashcard(flashcardData: Flashcard): Promise<void>;
  getFlashcards(deckId: string): Promise<Flashcard[]>;
}
