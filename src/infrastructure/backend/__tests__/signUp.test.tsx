import { SupabaseAuthRepository } from '@/infrastructure/backend/SupabaseAuthRepository';
import { supabase } from '@/infrastructure/backend/SupabaseClient';

jest.mock('@/infrastructure/backend/SupabaseClient');

describe('SupabaseAuthRepository.signUp() signUp method', () => {
  let authRepository: SupabaseAuthRepository;

  beforeEach(() => {
    authRepository = new SupabaseAuthRepository();
    jest.clearAllMocks();
  });

  describe('Happy paths', () => {
    it('should successfully sign up a user with valid email and password', async () => {
      const email = 'test@example.com';
      const password = 'securePassword123*';
      const mockUser = { id: '123', email };

      (supabase.auth.signUp as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const result = await authRepository.signUp(email, password);
      expect(result).toEqual(mockUser);
      expect(supabase.auth.signUp).toHaveBeenCalledWith({ email, password });
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if signUp fails due to invalid email format', async () => {
      const email = 'invalid-email';
      const password = 'password123';
      const mockError = new Error('Invalid email format');

      (supabase.auth.signUp as jest.Mock).mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(authRepository.signUp(email, password)).rejects.toThrow(mockError);
      expect(supabase.auth.signUp).toHaveBeenCalledWith({ email, password });
    });
  });
});
