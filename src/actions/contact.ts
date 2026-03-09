import nodemailer from "nodemailer";
import type { ContactFormState } from "@/types/contact";

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const data = Object.fromEntries(formData);
  const { name, company, email, category, content } = data;

  // 1. 트랜스포터 설정
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
    // 2. 메일 발송
    await transporter.sendMail({
      // from의 이메일 주소는 auth.user와 동일하게 맞추는 것이 가장 안전합니다.
      from: `"${name} (홈페이지 문의)" <${process.env.MAIL_USER}>`,
      to: "tjrwns1007@naver.com",
      replyTo: email as string, // 관리자가 답장 버튼 누를 때 사용자의 메일로 연결
      subject: `[문의] ${category} - ${company} / ${name}님`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>새로운 문의가 접수되었습니다.</h2>
          <hr />
          <p><strong>이름:</strong> ${name}</p>
          <p><strong>회사:</strong> ${company}</p>
          <p><strong>이메일:</strong> ${email}</p>
          <p><strong>카테고리:</strong> ${category}</p>
          <p><strong>내용:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${String(content).replace(/\n/g, "<br/>")}
          </div>
        </div>
      `,
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
