import { User } from '../../domain/entities/User';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  hasProfile: boolean;
}
