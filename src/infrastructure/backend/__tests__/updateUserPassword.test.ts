// Unit tests for: updateUserPassword

import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { SupabaseAuthRepository } from '../SupabaseAuthRepository';

jest.mock('@/infrastructure/backend/SupabaseClient', () => ({
  supabase: {
    auth: {
      updateUser: jest.fn(),
    },
  },
}));

describe('SupabaseAuthRepository.updateUserPassword() updateUserPassword method', () => {
  let authRepository: SupabaseAuthRepository;

  beforeEach(() => {
    authRepository = new SupabaseAuthRepository();
  });

  describe('Happy paths', () => {
    it('should successfully update the user password', async () => {
      // Arrange: Mock the supabase.auth.updateUser to resolve without error
      (supabase.auth.updateUser as jest.Mock).mockResolvedValue({ error: null });

      // Act: Call the updateUserPassword method
      await authRepository.updateUserPassword('newSecurePassword123');

      // Assert: Ensure supabase.auth.updateUser was called with the correct parameters
      expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: 'newSecurePassword123' });
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if supabase.auth.updateUser returns an error', async () => {
      // Arrange: Mock the supabase.auth.updateUser to resolve with an error
      const mockError = new Error('Update failed');
      (supabase.auth.updateUser as jest.Mock).mockResolvedValue({ error: mockError });

      // Act & Assert: Call the updateUserPassword method and expect it to throw an error
      await expect(authRepository.updateUserPassword('newSecurePassword123')).rejects.toThrow(
        'Update failed'
      );
    });

    it('should handle empty password input gracefully', async () => {
      // Arrange: Mock the supabase.auth.updateUser to resolve without error
      (supabase.auth.updateUser as jest.Mock).mockResolvedValue({ error: null });

      // Act: Call the updateUserPassword method with an empty string
      await authRepository.updateUserPassword('');

      // Assert: Ensure supabase.auth.updateUser was called with an empty password
      expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: '' });
    });

    it('should handle very long password input', async () => {
      // Arrange: Mock the supabase.auth.updateUser to resolve without error
      (supabase.auth.updateUser as jest.Mock).mockResolvedValue({ error: null });

      // Act: Call the updateUserPassword method with a very long password
      const longPassword = 'a'.repeat(1000);
      await authRepository.updateUserPassword(longPassword);

      // Assert: Ensure supabase.auth.updateUser was called with the long password
      expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: longPassword });
    });
  });
});

// End of unit tests for: updateUserPassword
