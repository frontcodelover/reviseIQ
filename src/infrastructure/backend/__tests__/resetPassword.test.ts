// Unit tests for: resetPassword

import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { SupabaseAuthRepository } from '../SupabaseAuthRepository';

jest.mock('@/infrastructure/backend/SupabaseClient', () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: jest.fn(),
    },
  },
}));

describe('SupabaseAuthRepository.resetPassword() resetPassword method', () => {
  let authRepository: SupabaseAuthRepository;

  beforeEach(() => {
    authRepository = new SupabaseAuthRepository();
  });

  describe('Happy paths', () => {
    it('should successfully reset the password for a valid email', async () => {
      // Arrange: Mock the supabase response to simulate a successful password reset
      (supabase.auth.resetPasswordForEmail as jest.Mock).mockResolvedValue({ error: null });

      // Act: Call the resetPassword method
      await expect(authRepository.resetPassword('valid@example.com')).resolves.not.toThrow();

      // Assert: Ensure the supabase method was called with the correct email
      expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith('valid@example.com');
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if the email is invalid', async () => {
      // Arrange: Mock the supabase response to simulate an error
      const mockError = new Error('Invalid email');
      (supabase.auth.resetPasswordForEmail as jest.Mock).mockResolvedValue({ error: mockError });

      // Act & Assert: Ensure the method throws an error for an invalid email
      await expect(authRepository.resetPassword('invalid-email')).rejects.toThrow('Invalid email');
    });

    it('should handle unexpected errors gracefully', async () => {
      // Arrange: Mock the supabase response to simulate an unexpected error
      const unexpectedError = new Error('Unexpected error');
      (supabase.auth.resetPasswordForEmail as jest.Mock).mockRejectedValue(unexpectedError);

      // Act & Assert: Ensure the method throws the unexpected error
      await expect(authRepository.resetPassword('unexpected@example.com')).rejects.toThrow(
        'Unexpected error'
      );
    });

    it('should handle empty email input gracefully', async () => {
      // Arrange: Mock the supabase response to simulate an error for empty email
      const emptyEmailError = new Error('Email cannot be empty');
      (supabase.auth.resetPasswordForEmail as jest.Mock).mockResolvedValue({
        error: emptyEmailError,
      });

      // Act & Assert: Ensure the method throws an error for empty email input
      await expect(authRepository.resetPassword('')).rejects.toThrow('Email cannot be empty');
    });
  });
});

// End of unit tests for: resetPassword
