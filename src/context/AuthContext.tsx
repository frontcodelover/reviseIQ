import { createContext, useContext, useEffect, useState } from 'react';
import { getBackend } from '@/services/backend';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => undefined,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const backend = getBackend();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await backend.getUser();
        console.log(currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
