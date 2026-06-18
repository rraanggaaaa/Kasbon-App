import { z } from "zod";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const loginSchema = z.object({
  email: z.email("Format email tidak valid"),

  password: z

    .string()

    .min(
      1,

      "Password wajib diisi",
    ),
});

export const registerSchema = z

  .object({
    email: z.email("Format email tidak valid"),

    password: z

      .string()

      .regex(
        PASSWORD_REGEX,

        "Password minimal 8 karakter, mengandung huruf besar, huruf kecil, angka dan simbol",
      ),

    confirmPassword: z.string(),
  })

  .refine(
    (data) => data.password === data.confirmPassword,

    {
      path: ["confirmPassword"],

      message: "Konfirmasi password tidak cocok",
    },
  );

export type LoginSchema = z.infer<typeof loginSchema>;

export type RegisterSchema = z.infer<typeof registerSchema>;
