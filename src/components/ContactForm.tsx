"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { submitContact } from "@/actions/contact";
import type { ContactFormState } from "@/types/contact";

const ContactForm = () => {
  const t = useTranslations("contact.form");
  const [state, action, pending] = useActionState<ContactFormState, FormData>(submitContact, {
    success: false,
    message: "",
  });
  return (
    <form action={action} className="space-y-6 rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          required
          placeholder={t("name")}
          className="w-full rounded-xl border-none bg-gray-100 p-4 outline-none transition-all placeholder:text-rhistle/50 focus:ring-2 focus:ring-rhistle"
        />
        <input
          type="text"
          name="company"
          required
          placeholder={t("company")}
          className="w-full rounded-xl border-none bg-gray-100 p-4 outline-none transition-all placeholder:text-rhistle/50 focus:ring-2 focus:ring-rhistle"
        />
      </div>

      <input
        type="email"
        name="email"
        required
        placeholder={t("email")}
        className="w-full rounded-xl border-none bg-gray-100 p-4 outline-none transition-all placeholder:text-rhistle/50 focus:ring-2 focus:ring-rhistle"
      />

      <select
        name="category"
        required
        defaultValue=""
        className="w-full rounded-xl border-none bg-gray-100 p-4 text-rhistle/50 outline-none transition-all valid:text-black focus:ring-2 focus:ring-rhistle"
      >
        <option value="" disabled hidden>
          {t("categoryPlaceholder")}
        </option>
        <option value={t("categories.solution")}>{t("categories.solution")}</option>
        <option value={t("categories.support")}>{t("categories.support")}</option>
        <option value={t("categories.etc")}>{t("categories.etc")}</option>
      </select>

      {/* 고정 높이 Textarea */}
      <textarea
        name="content"
        required
        placeholder={t("contentPlaceholder")}
        className="h-45 w-full resize-none rounded-xl border-none bg-gray-100 p-4 outline-none transition-all placeholder:text-rhistle/50 focus:ring-2 focus:ring-rhistle"
      />
      <button
        type="submit"
        disabled={pending}
        className={`w-full rounded-xl py-4 font-bold ${pending ? "cursor-not-allowed bg-gray-100" : "cursor-pointer bg-rhistle text-white hover:bg-rhistle/90"}`}
      >
        {pending ? t("submitting") : t("submit")}
      </button>
      {state?.message && (
        <p className={` ${state.success ? "text-green-600" : "text-red-500"}`}>
          {t(state.message)}
        </p>
      )}
    </form>
  );
};
export default ContactForm;
