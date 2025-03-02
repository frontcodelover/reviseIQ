import { z } from 'zod';

export const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .regex(/[A-Z]/, { message: 'Doit contenir une majuscule' })
      .regex(/[a-z]/, { message: 'Doit contenir une minuscule' })
      .regex(/[0-9]/, { message: 'Doit contenir un chiffre' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Doit contenir un caractère spécial' }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'Vous devez accepter les conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });
