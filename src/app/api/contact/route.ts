import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { serverEnv } from "@/core/config/env";
import { escapeHtml } from "@/lib/sanitize";
import { isRateLimited } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validation";

const MIN_FORM_TIME_MS = 2_500;
const MAX_FORM_TIME_MS = 2 * 60 * 60 * 1_000;
const MAX_BODY_BYTES = 10_000;

function getRequestHost(request: Request): string {
  return (
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    request.headers.get("host") ??
    ""
  );
}

function hasValidOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === getRequestHost(request);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again in a minute." },
        { status: 429 },
      );
    }

    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request is too large" }, { status: 413 });
    }

    const body: unknown = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, phone, email, message, car, website, startedAt } = parsed.data;

    if (website) {
      return NextResponse.json({ message: "OK" });
    }

    if (!startedAt) {
      return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
    }

    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_FORM_TIME_MS || elapsed > MAX_FORM_TIME_MS) {
      return NextResponse.json({ message: "OK" });
    }

    if (!serverEnv.smtpUser || !serverEnv.smtpPass) {
      console.error("[contact] SMTP not configured");
      return NextResponse.json(
        {
          error: `Email not configured. Write to ${serverEnv.contactEmail} directly.`,
        },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: serverEnv.smtpHost,
      port: serverEnv.smtpPort,
      secure: false,
      auth: { user: serverEnv.smtpUser, pass: serverEnv.smtpPass },
    });

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeCar = escapeHtml(car || "-");
    const safeMessage = escapeHtml(message || "-");

    await transporter.sendMail({
      from: `"Sky AutoRent" <${serverEnv.smtpUser}>`,
      to: serverEnv.contactEmail,
      replyTo: email,
      subject: `New request: ${name}${car ? ` - ${car}` : ""}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Car: ${car || "-"}`,
        `Message: ${message || "-"}`,
        `IP: ${ip}`,
        `Time: ${new Date().toISOString()}`,
      ].join("\n"),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0b2545">Sky AutoRent - New Request</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#5a6478">Name</td><td><strong>${safeName}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5a6478">Phone</td><td><strong>${safePhone}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5a6478">Email</td><td><strong>${safeEmail}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5a6478">Car</td><td><strong>${safeCar}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5a6478;vertical-align:top">Message</td><td>${safeMessage}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ message: "Sent" });
  } catch (error) {
    console.error("[contact] error:", error);
    return NextResponse.json({ error: "Send failed. Try again later." }, { status: 500 });
  }
}
