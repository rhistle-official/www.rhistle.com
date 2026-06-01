"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { submitContact } from "@/actions/contact";
import { buttonClass } from "@/components/ui/Button";
import type { ContactFormState } from "@/types/contact";

const ContactForm = () => {
  const t = useTranslations("contact.form");
  const [state, action, pending] = useActionState<ContactFormState, FormData>(submitContact, {
    success: false,
    message: "",
  });
  return (
    <form action={action} className="card space-y-6 p-8">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          required
          aria-label={t("name")}
          placeholder={t("name")}
          className="w-full rounded-md border border-line bg-surface-2 p-4 outline-none transition placeholder:text-mist focus:ring-2 focus:ring-rhistle"
        />
        <input
          type="text"
          name="company"
          required
          aria-label={t("company")}
          placeholder={t("company")}
          className="w-full rounded-md border border-line bg-surface-2 p-4 outline-none transition placeholder:text-mist focus:ring-2 focus:ring-rhistle"
        />
      </div>

      <input
        type="email"
        name="email"
        required
        aria-label={t("email")}
        placeholder={t("email")}
        className="w-full rounded-md border border-line bg-surface-2 p-4 outline-none transition placeholder:text-mist focus:ring-2 focus:ring-rhistle"
      />

      <select
        name="category"
        required
        defaultValue=""
        aria-label={t("categoryPlaceholder")}
        className="w-full rounded-md border border-line bg-surface-2 p-4 text-mist outline-none transition valid:text-ink focus:ring-2 focus:ring-rhistle"
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
        aria-label={t("contentPlaceholder")}
        placeholder={t("contentPlaceholder")}
        className="h-45 w-full resize-none rounded-md border border-line bg-surface-2 p-4 outline-none transition placeholder:text-mist focus:ring-2 focus:ring-rhistle"
      />
      <button
        type="submit"
        disabled={pending}
        className={buttonClass("primary", "w-full disabled:cursor-not-allowed disabled:opacity-60")}
      >
        {pending ? t("submitting") : t("submit")}
      </button>
      {state?.message && (
        <p
          role="status"
          aria-live="polite"
          className={` ${state.success ? "text-green-600" : "text-red-500"}`}
        >
          {t(state.message)}
        </p>
      )}
    </form>
  );
};
export default ContactForm;
