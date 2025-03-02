// Unit tests for: signOut

import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { SupabaseAuthRepository } from '../SupabaseAuthRepository';

jest.mock('@/infrastructure/backend/SupabaseClient', () => ({
  supabase: {
    auth: {
      signOut: jest.fn(),
    },
  },
}));

describe('SupabaseAuthRepository.signOut() signOut method', () => {
  let authRepository: SupabaseAuthRepository;

  beforeEach(() => {
    authRepository = new SupabaseAuthRepository();
  });

  describe('Happy paths', () => {
    it('should sign out successfully without errors', async () => {
      // Arrange: Mock the signOut method to return no error
      (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });

      // Act: Call the signOut method
      await expect(authRepository.signOut()).resolves.not.toThrow();

      // Assert: Ensure the signOut method was called
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if signOut fails', async () => {
      // Arrange: Mock the signOut method to return an error
      const mockError = new Error('Sign out failed');
      (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: mockError });

      // Act & Assert: Call the signOut method and expect it to throw an error
      await expect(authRepository.signOut()).rejects.toThrow('Sign out failed');

      // Assert: Ensure the signOut method was called
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });
});

// End of unit tests for: signOut
