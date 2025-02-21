import { Folder } from './Folder';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  status?: 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other';
  user_id?: string;
  avatar?: string;
  created_at?: string;
}

export interface FirstTimeFormProps {
  user: User;
  onSubmit: (success: boolean) => void;
}

export interface EmailInputProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  touched: boolean;
  isValid: boolean;
}

export interface Validation {
  minLength: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface ThemaGroupProps {
  thema: string; // C'est maintenant la valeur traduite
  decks: Folder[];
}

export interface AvatarSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export interface PhoneInputProps {
  phoneNumber: string; // renommé de 'value' à 'phoneNumber' pour plus de clarté
  onPhoneChange: (phone: string) => void; // renommé de 'onChange' pour plus de clarté
}
