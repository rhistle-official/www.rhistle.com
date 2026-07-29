"use server";

import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import type { ContactFormState } from "@/types/contact";

// Messages are returned as i18n keys (relative to the "contact.form" namespace)
// and translated on the client so feedback follows the viewer's locale.
const contactSchema = z.object({
  name: z.string().min(1, "errors.name").max(20),
  company: z.string().min(1, "errors.company"),
  email: z.email("errors.email"),
  category: z.string(),
  content: z.string().min(10, "errors.content"),
});

async function sendSlackMessage(payload: {
  name: string;
  company: string;
  email: string;
  category: string;
  content: string;
}) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const message = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*새로운 문의가 접수되었습니다.*`,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*이름:*\n${payload.name}` },
          { type: "mrkdwn", text: `*회사:*\n${payload.company}` },
          { type: "mrkdwn", text: `*카테고리:*\n${payload.category}` },
          { type: "mrkdwn", text: `*이메일:*\n${payload.email}` },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*내용:*\n${payload.content}`,
        },
      },
    ],
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
}

const stripHtml = (str: string) => sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} });

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const rawData = Object.fromEntries(formData);
  const validated = contactSchema.safeParse(rawData);

  if (!validated.success) {
    return { success: false, message: validated.error.issues[0].message };
  }

  const { name, company, email, category, content } = validated.data;

  const cleanName = stripHtml(name);
  const cleanCompany = stripHtml(company);
  const cleanCategory = stripHtml(category);
  const cleanContent = stripHtml(content);
  const htmlContent = cleanContent.replace(/\n/g, "<br/>");

  const transporter = nodemailer.createTransport({
    host: "outbound.daouoffice.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${cleanName}" <noreply@rhistle.com>`,
      to: process.env.MAIL_USER,
      subject: `[문의] ${cleanCategory} - ${cleanCompany}`,
      replyTo: email,
      html: `
        <div>
          <h2>새로운 문의가 접수되었습니다.</h2>
          <hr />
          <div style="font-size:16px">
            <p><strong>이름:</strong> ${cleanName}</p>
            <p><strong>회사:</strong> ${cleanCompany}</p>
            <p><strong>카테고리:</strong> ${cleanCategory}</p>
            <p><strong>내용:</strong></p>
            <p>
              ${htmlContent}
            </p>
          </div>
        </div>
      `,
    });

    await sendSlackMessage({
      name: cleanName,
      company: cleanCompany,
      email,
      category: cleanCategory,
      content: cleanContent,
    });

    return { success: true, message: "success" };
  } catch (error) {
    console.error("Mail send error:", error);
    return {
      success: false,
      message: "sendFail",
    };
  }
}
