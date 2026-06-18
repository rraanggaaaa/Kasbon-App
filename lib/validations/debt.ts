import { z } from "zod";

export const debtTypeEnum = z.enum(["owed_to_me", "i_owe"]);

export const debtStatusEnum = z.enum(["all", "settled", "unsettled"]);

export const debtSchema = z.object({
  type: debtTypeEnum,

  counterpart_name: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .max(100, "Nama maksimal 100 karakter"),

  amount: z.number().int().positive("Jumlah harus lebih dari 0"),

  note: z
    .string()
    .max(200, "Catatan maksimal 200 karakter")
    .nullable()
    .optional(),

  due_date: z.string().nullable().optional(),
});

export const debtFilterSchema = z.object({
  status: debtStatusEnum

    .optional()

    .default("all"),

  type: debtTypeEnum.optional(),

  q: z
    .string()

    .optional(),
});
export const updateDebtSchema = debtSchema

  .partial()

  .extend({
    settled_at: z

      .string()

      .datetime()

      .nullable()

      .optional(),
  });

export type DebtInput = z.infer<typeof debtSchema>;
export type UpdateDebtInput = z.infer<typeof updateDebtSchema>;
