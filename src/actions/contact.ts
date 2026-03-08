import type { ContactFormState } from "@/types/contact";

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // const name = formData.get("name");
  // const company = formData.get("company");
  // const email = formData.get("email");
  // const category = formData.get("category");
  // const content = formData.get("content");

  // console.log(name);
  // console.log(company);
  // console.log(email);
  // console.log(category);
  // console.log(content);

  const data = Object.fromEntries(formData)
  console.log(data)

  return { success: true };
}
