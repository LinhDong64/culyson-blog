import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim()
    .min(1, "Vui lòng nhập họ và tên.")
    .max(120, "Họ và tên không được vượt quá 120 ký tự."),
  email: z.string().trim()
    .min(1, "Vui lòng nhập email.")
    .max(254, "Email không được vượt quá 254 ký tự.")
    .pipe(z.email({ error: "Vui lòng nhập địa chỉ email hợp lệ." })),
  message: z.string().trim()
    .min(1, "Vui lòng nhập nội dung tin nhắn.")
    .max(2000, "Nội dung không được vượt quá 2000 ký tự."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;