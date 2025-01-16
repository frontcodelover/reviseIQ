// interface User {
//   id: string;
//   name?: string;
//   email: string;
//   firstname?: string;
//   lastname?: string;
//   phone?: string;
//   status?: 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other';
//   user_id?: string;
//   avatar?: string;
// }

// interface AvatarSelectProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// interface Flashcard {
//   id?: string | number;
//   deck_id?: string | number;
//   question: string;
//   answer: string;
// }

// interface FirstTimeFormProps {
//   user: User;
//   onSubmit: () => void;
// }

// interface Deck {
//   id?: string;
//   name: string;
//   description: string;
//   is_public: boolean;
//   color: string;
//   thema: string;
//   user_id?: string | undefined;
// }

// interface Validation {
// 	minLength: boolean;
// 	hasLowerCase: boolean;
// 	hasUpperCase: boolean;
// 	hasNumber: boolean;
// 	hasSpecialChar: boolean;
// }

// interface EmailInputProps {
// 	email: string;
// 	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// 	touched: boolean;
// 	isValid: boolean;
//   }

// interface ColorPickerProps {
//   selectedColor: string;
//   onSelectColor: (color: string) => void;
//   colors: string[];
// }

// interface CardFolderProps {
//   id: string;
//   name: string;
//   description: string;
//   color: string;
//   is_public: boolean;
//   thema: string;
// }

// type PhoneInputProps = Omit<
//   React.ComponentProps<'input'>,
//   'onChange' | 'value' | 'ref'
// > &
//   Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
//     onChange?: (value: RPNInput.Value) => void;
//   };

// type CountryEntry = { label: string; value: RPNInput.Country | undefined };

// type CountrySelectProps = {
//   disabled?: boolean;
//   value: RPNInput.Country;
//   options: CountryEntry[];
//   onChange: (country: RPNInput.Country) => void;
// };

// interface CountrySelectOptionProps extends RPNInput.FlagProps {
//   selectedCountry: RPNInput.Country;
//   onChange: (country: RPNInput.Country) => void;
// }

// interface ThemaGroupProps {
//   thema: string;
//   decks: Deck[];
// }

// interface ThemaProps {
//   setThema: (value: string) => void;
//   value: string;
// }

// interface BadgeData {
//   unlocked_at: string;
//   badges: {
//     id: string;
//     name: string;
//     description: string;
//     image_url: string;
//   };
// }

// interface Badge {
//   id: string;
//   name: string;
//   description: string;
//   image_url: string;
//   obtained_at: string;
// }

// interface DailyActions {
//   flashcard_reviewed?: number;
//   folder_viewed?: number;
//   [key: string]: number | undefined;
// }

// interface LogsAndBadgesManagerProps {
//   userId: string | null;
//   onLogsUpdate: (logs: Record<string, number>) => void;
//   onBadgesUpdate: (badges: Badge[]) => void;
//   onLastBadgeUpdate?: (badge: Badge | null) => void;
// }

// interface BackendType {
//   signUp(email: string, password: string);
//   signInWithEmail(email: string, password: string);
//   signInWithProvider(provider: 'google'): Promise<void>;
//   signOut(): Promise<void>;
//   getUser();
//   getUserId(): Promise<string>;
//   hasUserProfile(userId: string);

//   // User Methods
//   getUserDecks(): Promise<Folder[]>;
//   createDeck(deckData: Deck);
//   upsertUser(userData: User | ({ user_id: string } & Partial<User>));
//   getUserProfile(userId: string);

//   // Folder Methods
//   getPublicFolders(): Promise<Folder[]>;
//   getLastPublicFolders(): Promise<Folder[]>;
//   getFolderById(id: string): Promise<Folder>;
//   deleteFolder(id: string): Promise<void>;

//   // Flashcard Methods
//   createFlashcard(flashcardData: Flashcard): Promise<void>;
//   getFlashcards(deckId: string): Promise<Flashcard[]>;
//   generateFlashcards(topic: string): Promise<Flashcard[]>;

//   // Log Methods
//   getUsageLogsByDay(
//     userId: string
//   ): Promise<Record<string, Record<string, number>>>;
//   logAction(userId: string, action: string, count?: number): Promise<void>;

//   // Badge Methods
//   getUserBadges(userId: string): Promise<Badge[]>;
//   checkAndUnlockBadges(
//     userId: string,
//     stats: { flashcards_viewed: number; folders_viewed: number }
//   ): Promise<void>;
// }
