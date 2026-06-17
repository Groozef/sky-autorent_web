"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/core/i18n/navigation";
import { locales, type Locale } from "@/core/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  kz: "KZ",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={cn("flex items-center gap-0.5 rounded-full border border-slate-200 bg-white p-0.5", className)}>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition",
            locale === l
              ? "bg-[#0b2545] text-white"
              : "text-slate-500 hover:text-[#0070e0]",
          )}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
