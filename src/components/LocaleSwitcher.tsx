"use client";

import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";

const LocaleSwitcher = () => {
  const pathName = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const handleChange = (value: string) => {
    router.push(pathName, { locale: value });
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger size="sm" className="cursor-pointer focus-visible:ring-0 [&_svg]:opacity-100">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        position="popper"
        align="start"
        className="min-w-0 text-white"
      >
        <SelectGroup>
          <SelectItem value="ko" className="cursor-pointer">
            KOR
          </SelectItem>
          <SelectItem value="en" className="cursor-pointer">
            ENG
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default LocaleSwitcher;
