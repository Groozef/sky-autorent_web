import { z } from "zod";
import { sanitizeEmail, sanitizePhone, sanitizeText } from "./sanitize";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(80, "Name is too long")
    .transform((v) => sanitizeText(v, 80)),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20)
    .transform(sanitizePhone)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").max(254).transform(sanitizeEmail),
  message: z
    .string()
    .max(2000, "Message is too long")
    .optional()
    .transform((v) => (v ? sanitizeText(v, 2000) : "")),
  car: z
    .string()
    .max(100)
    .optional()
    .transform((v) => (v ? sanitizeText(v, 100) : "")),
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().int().positive().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
