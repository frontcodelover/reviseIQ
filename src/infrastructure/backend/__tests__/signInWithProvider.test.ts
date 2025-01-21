// Unit tests for: signInWithProvider

import { supabase } from '@/infrastructure/backend/SupabaseClient';
import { SupabaseAuthRepository } from '../SupabaseAuthRepository';
import '../__mocks__/window.mock';

jest.mock('@/infrastructure/backend/SupabaseClient', () => ({
  supabase: {
    auth: {
      signInWithOAuth: jest.fn(),
    },
  },
}));

describe('SupabaseAuthRepository.signInWithProvider() signInWithProvider method', () => {
  let authRepository: SupabaseAuthRepository;

  beforeEach(() => {
    authRepository = new SupabaseAuthRepository();
  });

  describe('Happy paths', () => {
    it('should successfully sign in with Google provider', async () => {
      // Arrange: Mock the supabase response to simulate a successful sign-in
      (supabase.auth.signInWithOAuth as jest.Mock).mockResolvedValue({ error: null });

      // Act: Call the signInWithProvider method
      await authRepository.signInWithProvider('google');

      // Assert: Ensure the signInWithOAuth method was called with the correct parameters
      expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if signInWithOAuth returns an error', async () => {
      // Arrange: Mock the supabase response to simulate an error during sign-in
      const mockError = new Error('OAuth error');
      (supabase.auth.signInWithOAuth as jest.Mock).mockResolvedValue({ error: mockError });

      // Act & Assert: Call the signInWithProvider method and expect it to throw an error
      await expect(authRepository.signInWithProvider('google')).rejects.toThrow('OAuth error');
    });

    it('should handle unexpected errors gracefully', async () => {
      // Arrange: Mock the supabase response to throw an unexpected error
      const unexpectedError = new Error('Unexpected error');
      (supabase.auth.signInWithOAuth as jest.Mock).mockRejectedValue(unexpectedError);

      // Act & Assert: Call the signInWithProvider method and expect it to throw the unexpected error
      await expect(authRepository.signInWithProvider('google')).rejects.toThrow('Unexpected error');
    });
  });
});

// End of unit tests for: signInWithProvider
