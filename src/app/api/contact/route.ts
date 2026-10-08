import { Resend } from "resend";
import { contactFormSchema } from "@/features/contact/schema";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Invalid contact details" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_EMAIL_API_TOKEN;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !from || !to) {
    return Response.json({ error: "Email service is not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { name, email, message } = result.data;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Lời nhắn từ ${name}`,
      text: `Họ và tên: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      return Response.json({ error: "Unable to send message" }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Unable to send message" }, { status: 502 });
  }
}