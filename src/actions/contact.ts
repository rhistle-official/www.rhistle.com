"use server";

import DOMPurify from "isomorphic-dompurify";
import nodemailer from "nodemailer";
import { z } from "zod";
import type { ContactFormState } from "@/types/contact";

const contactSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다.").max(20),
  company: z.string().min(1, "회사명은 필수입니다."),
  email: z.email("올바른 이메일 형식이 아닙니다."),
  category: z.string(),
  content: z.string().min(10, "문의 내용을 10자 이상 입력해주세요."),
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

const stripHtml = (str: string) =>
  DOMPurify.sanitize(str, { ALLOWED_TAGS: [] });

export async function submitContact(
  prevState: ContactFormState,
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
      from: `"${cleanName}" <${process.env.MAIL_USER}>`,
      to: "seokjun.ham@rhistle.com",
      replyTo: email,
      subject: `[문의] ${cleanCategory} - ${cleanCompany}`,
      html: `
        <div>
          <h2>새로운 문의가 접수되었습니다.</h2>
          <hr />
          <div style="font-size:16px">
            <p><strong>이름:</strong> ${cleanName}</p>
            <p><strong>회사:</strong> ${cleanCompany}</p>
            <p><strong>이메일:</strong> ${email}</p>
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

    return { success: true, message: "문의가 성공적으로 전송되었습니다." };
  } catch (error) {
    console.error("Mail send error:", error);
    return {
      success: false,
      message: "메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
}
