export const supabase = {
  auth: {
    signUp: jest.fn().mockImplementation(() => ({
      data: null,
      error: null,
    })),
    signInWithPassword: jest.fn().mockImplementation(() => ({
      data: null,
      error: null,
    })),
  },
};

export default supabase;
