import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Sila masukkan email yang valid'),
  password: z.string().min(1, 'Password harus diisi'),
  rememberMe: z.boolean().optional(),
})

export type SignInFormValues = z.infer<typeof signInSchema>

export const signUpSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Sila masukkan email yang valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi password harus diisi'),
    termsAccepted: z.literal<boolean>(true, {
      message: 'Anda harus menyetujui syarat & ketentuan',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email('Sila masukkan email yang valid'),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export const verifyEmailSchema = z.object({
  otp: z.string().length(6, 'OTP harus 6 digit'),
})

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>

export const resetPasswordSchema = z
  .object({
    otp: z.string().length(6, 'OTP harus 6 digit'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi password harus diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export const lockScreenSchema = z.object({
  password: z.string().min(1, 'Password harus diisi'),
})

export type LockScreenFormValues = z.infer<typeof lockScreenSchema>
