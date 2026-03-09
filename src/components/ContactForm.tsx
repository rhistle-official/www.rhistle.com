"use client";

import { useActionState } from "react";
import { submitContact } from "@/actions/contact";
import type { ContactFormState } from "@/types/contact";

const ContactForm = () => {
  const [state, action, pending] = useActionState<ContactFormState, FormData>(
    submitContact,
    { success: false, message: "" },
  );
  return (
    <form
      action={action}
      className="space-y-6 rounded-3xl border border-gray-100 p-8 shadow-sm"
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          required
          placeholder="성함"
          className="w-full rounded-xl border-none bg-gray-100 p-4 outline-none transition-all placeholder:text-rhistle/50 focus:ring-2 focus:ring-rhistle"
        />
        <input
          type="text"
          name="company"
          required
          placeholder="회사명"
          className="w-full rounded-xl border-none bg-gray-100 p-4 outline-none transition-all placeholder:text-rhistle/50 focus:ring-2 focus:ring-rhistle"
        />
      </div>

      <input
        type="email"
        name="email"
        required
        placeholder="이메일 주소"
        className="w-full rounded-xl border-none bg-gray-100 p-4 outline-none transition-all placeholder:text-rhistle/50 focus:ring-2 focus:ring-rhistle"
      />

      <select
        name="category"
        required
        defaultValue=""
        className="w-full rounded-xl border-none bg-gray-100 p-4 text-rhistle/50 outline-none transition-all valid:text-black focus:ring-2 focus:ring-rhistle"
      >
        <option value="" disabled hidden>
          문의 유형 선택
        </option>
        <option value="솔루션 도입 문의">솔루션 도입 문의</option>
        <option value="기술 지원">기술 지원</option>
        <option value="기타">기타</option>
      </select>

      {/* 고정 높이 Textarea */}
      <textarea
        name="content"
        required
        placeholder="문의 내용을 입력해 주세요"
        className="h-45 w-full resize-none rounded-xl border-none bg-gray-100 p-4 outline-none transition-all placeholder:text-rhistle/50 focus:ring-2 focus:ring-rhistle"
      />

      {/* <button
          type="submit"
          disabled={!agreed}
          className={`w-full rounded-xl py-4 font-bold transition-all duration-300 ${
            agreed
              ? "bg-blue-600 text-white shadow-blue-100 shadow-lg hover:bg-blue-700"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          문의하기
        </button> */}
      <button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer rounded-xl bg-rhistle py-4 font-bold text-white"
      >
        {pending ? "전송 중..." : "문의하기"}
      </button>
      {state?.success && (
        <p className="text-green-500">문의가 정상적으로 접수되었습니다.</p>
      )}
      {/* {state?.error && <p className="text-red-500">{state.error}</p>} */}
    </form>
  );
};
export default ContactForm;
