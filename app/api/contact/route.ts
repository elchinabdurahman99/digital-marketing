import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message, service, budget } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `"Roivex Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fafaf8;border-radius:12px;">
          <h2 style="color:#1a1a18;margin-bottom:24px;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#888;font-size:13px;width:140px;">Name</td><td style="padding:10px 0;color:#1a1a18;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#888;font-size:13px;">Email</td><td style="padding:10px 0;color:#1a1a18;font-weight:600;">${email}</td></tr>
            ${company ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;">Company</td><td style="padding:10px 0;color:#1a1a18;font-weight:600;">${company}</td></tr>` : ""}
            ${service ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;">Service</td><td style="padding:10px 0;color:#1a1a18;font-weight:600;">${service}</td></tr>` : ""}
            ${budget ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;">Budget</td><td style="padding:10px 0;color:#1a1a18;font-weight:600;">${budget}</td></tr>` : ""}
            ${message ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px 0;color:#1a1a18;">${message.replace(/\n/g, "<br/>")}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Contact email error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
