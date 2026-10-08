"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { contactFormSchema, type ContactFormValues } from "./schema";

const fieldClassName =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-base leading-6 transition-colors placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const ContactForm = () => {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const sendMessage: SubmitHandler<ContactFormValues> = async (values) => {
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setStatus("Không thể gửi tin nhắn lúc này. Vui lòng thử lại sau.");
        return;
      }

      reset();
      setStatus("Tin nhắn đã được gửi. Cảm ơn bạn!");
    } catch {
      setStatus("Không thể gửi tin nhắn lúc này. Vui lòng thử lại sau.");
    }
  };

  return (
    <form aria-label="Gửi tin nhắn" noValidate onSubmit={handleSubmit(sendMessage, () => setStatus(""))} className="min-w-0 space-y-6">
      <div className="space-y-2.5">
        <label htmlFor="contact-name" className="block text-sm font-medium">
          Họ và tên
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          placeholder="Tên của bạn"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClassName}
          {...register("name")}
        />
        {errors.name && <p id="contact-name-error" role="alert" className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2.5">
        <label htmlFor="contact-sender-email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="contact-sender-email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="ban@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClassName}
          {...register("email")}
        />
        {errors.email && <p id="contact-email-error" role="alert" className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2.5">
        <label htmlFor="contact-message" className="block text-sm font-medium">
          Nội dung
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          maxLength={2000}
          placeholder="Lời nhắn của bạn..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldClassName} min-h-44 resize-y`}
          {...register("message")}
        />
        {errors.message && <p id="contact-message-error" role="alert" className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50">
          <Send size={16} aria-hidden="true" />
          Gửi tin nhắn
        </button>
      </div>
      <p role="status" className="text-sm leading-6 text-muted-foreground">{status}</p>
    </form>
  );
};

export default ContactForm;