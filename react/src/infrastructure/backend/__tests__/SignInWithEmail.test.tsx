import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';

jest.mock('@/infrastructure/backend/SupabaseClient');
const mockedSignInWithPassword = jest.fn();
(supabase.auth.signInWithPassword as jest.Mock) = mockedSignInWithPassword;

describe('SupabaseAuthRepository.signInWithEmail() method', () => {
  let authRepository: SupabaseAuthRepository;

  beforeEach(() => {
    authRepository = new SupabaseAuthRepository();
    mockedSignInWithPassword.mockClear();
  });

  describe('Happy paths', () => {
    it('should successfully sign in a user with valid credentials', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const mockUser = { id: '123', email };

      mockedSignInWithPassword.mockResolvedValueOnce({
        data: { user: mockUser },
        error: null,
      });

      const result = await authRepository.signInWithEmail(email, password);
      expect(result).toEqual(mockUser);
      expect(mockedSignInWithPassword).toHaveBeenCalledWith({ email, password });
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if credentials are invalid', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const mockError = new Error('Invalid credentials');

      mockedSignInWithPassword.mockResolvedValueOnce({
        data: null,
        error: mockError,
      });

      await expect(authRepository.signInWithEmail(email, password)).rejects.toThrow(mockError);
    });

    it('should return a user with empty fields if data is undefined', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      mockedSignInWithPassword.mockResolvedValueOnce({
        data: { user: null },
        error: null,
      });

      const result = await authRepository.signInWithEmail(email, password);
      expect(result).toEqual({ id: '', email: '' });
    });

    it('should handle unexpected errors gracefully', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const mockError = new Error('Network error');

      mockedSignInWithPassword.mockRejectedValueOnce(mockError);

      await expect(authRepository.signInWithEmail(email, password)).rejects.toThrow(mockError);
    });
  });
});
