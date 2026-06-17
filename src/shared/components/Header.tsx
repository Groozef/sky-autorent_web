"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { publicEnv } from "@/core/config/env";
import { Link, usePathname } from "@/core/i18n/navigation";
import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/catalog" as const, label: t("catalog") },
    { href: "/contacts" as const, label: t("contacts") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-sm shadow-blue-900/5" : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className="container-wide section-padding flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link href="/" className="group flex items-center gap-2.5 sm:gap-3">
          <Image
            src={publicEnv.logoPath}
            alt={publicEnv.siteName}
            width={600}
            height={450}
            className="h-8 w-auto object-contain sm:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-[#0b2545] text-white"
                  : "text-slate-600 hover:bg-[#eef6ff] hover:text-[#0070e0]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher className="ml-2" />
          <Link href="/contacts#form" className="btn-primary ml-2 px-5 py-2.5">
            {t("book")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? t("menuClose") : t("menuOpen")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex flex-col gap-1.5">
              <span className={cn("h-0.5 w-5 bg-[#0b2545] transition", open && "translate-y-2 rotate-45")} />
              <span className={cn("h-0.5 w-5 bg-[#0b2545] transition", open && "opacity-0")} />
              <span className={cn("h-0.5 w-5 bg-[#0b2545] transition", open && "-translate-y-2 -rotate-45")} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium",
                  isActive(link.href) ? "bg-[#0b2545] text-white" : "text-slate-700",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contacts#form" className="btn-primary mt-2 text-center">
              {t("book")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
