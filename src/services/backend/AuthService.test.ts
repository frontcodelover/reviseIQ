import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { AuthService } from './AuthService';
import { supabase } from '@/services/supabaseClient';
import { User, Session, AuthError, Provider } from '@supabase/supabase-js';

vi.mock('@/services/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signInWithOAuth: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn(),
    },
  },
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    vi.clearAllMocks();
    // @ts-expect-error originalError
    originalError = console.error;
    console.error = vi.fn();
    vi.stubGlobal('window', {
      location: {
        origin: 'http://localhost:3000',
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    // @ts-expect-error originalError
    console.error = originalError;
  });

  describe('signUp', () => {
    it('should sign up successfully', async () => {
      const mockUser: User = {
        id: '123',
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        role: '',
        updated_at: new Date().toISOString(),
      };

      const mockSession: Session = {
        access_token: 'token',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'refresh_token',
        user: {
          id: '123',
          email: 'test@example.com',
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          role: '',
          updated_at: new Date().toISOString(),
        },
      };

      const mockResponse = {
        data: {
          user: mockUser,
          session: mockSession,
        },
        error: null,
      };

      vi.spyOn(supabase.auth, 'signUp').mockResolvedValue(mockResponse);

      const result = await authService.signUp('test@example.com', 'password');
      expect(result).toEqual(mockResponse.data);
    });
  });

  it('should throw an error if sign up fails', async () => {
    const mockError = new AuthError('Sign up error', 400);
    vi.spyOn(supabase.auth, 'signUp').mockResolvedValue({
      data: { user: null, session: null },
      error: mockError,
    });

    await expect(authService.signUp('test@example.com', 'password')).rejects.toThrow(
      'Sign up error'
    );
  });

  describe('signInWithEmail', () => {
    it('should sign in successfully with email', async () => {
      const mockUser: User = {
        id: '123',
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        role: '',
        updated_at: new Date().toISOString(),
      };

      const mockSession: Session = {
        access_token: 'token',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'refresh_token',
        user: mockUser,
      };

      const mockResponse = {
        data: {
          user: mockUser,
          session: mockSession,
        },
        error: null,
      };

      vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValue(mockResponse);

      const result = await authService.signInWithEmail('test@example.com', 'password');
      expect(result).toEqual(mockResponse.data);
    });
  });

  it('should throw an error if sign in fails', async () => {
    const mockError = new AuthError('Sign in error', 400);

    vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValue({
      data: { user: null, session: null },
      error: mockError,
    });

    await expect(authService.signInWithEmail('test@example.com', 'password')).rejects.toThrow(
      'Sign in error'
    );
  });

  describe('signInWithProvider', () => {
    it('should sign in successfully with provider', async () => {
      const mockOAuthResponse = {
        data: {
          provider: 'google' as Provider,
          url: 'https://accounts.google.com/oauth2/auth...',
        },
        error: null,
      };

      vi.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValue(mockOAuthResponse);

      await expect(authService.signInWithProvider('google')).resolves.not.toThrow();
    });

    it('should throw an error if provider sign in fails', async () => {
      const mockError = new AuthError('Provider sign in error', 400);
      vi.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValue({
        data: { provider: 'google', url: null },
        error: mockError,
      });

      await expect(authService.signInWithProvider('google')).rejects.toThrow(
        'Provider sign in error'
      );
    });
  });

  describe('signOut', () => {
    it('should sign out successfully', async () => {
      vi.spyOn(supabase.auth, 'signOut').mockResolvedValue({ error: null });

      await expect(authService.signOut()).resolves.not.toThrow();
    });

    it('should throw an error if sign out fails', async () => {
      const mockError = new AuthError('Sign out error', 400);
      vi.spyOn(supabase.auth, 'signOut').mockResolvedValue({ error: mockError });

      await expect(authService.signOut()).rejects.toThrow('Sign out error');
    });
  });

  describe('getUser', () => {
    it('should get user successfully', async () => {
      const mockUser: User = {
        id: '123',
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        role: '',
        updated_at: new Date().toISOString(),
      };
      vi.spyOn(supabase.auth, 'getSession').mockResolvedValue({
        data: {
          session: {
            access_token: 'token',
            token_type: 'bearer',
            expires_in: 3600,
            refresh_token: 'refresh_token',
            user: mockUser,
          },
        },
        error: null,
      });

      const result = await authService.getUser();
      expect(result).toEqual(mockUser);
    });

    it('should return null if no session', async () => {
      vi.spyOn(supabase.auth, 'getSession').mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const result = await authService.getUser();
      expect(result).toBeNull();
    });

    it('should throw an error if getting user fails', async () => {
      const mockError = new AuthError('Get user error', 400);
      vi.spyOn(supabase.auth, 'getSession').mockResolvedValue({
        data: { session: null },
        error: mockError,
      });

      await expect(authService.getUser()).rejects.toThrow('Get user error');
    });
  });
});
