"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { CarView } from "@/features/catalog/lib/get-cars";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  cars: CarView[];
  currency: string;
  className?: string;
}

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm({ cars, currency, className }: ContactFormProps) {
  const t = useTranslations("form");
  const tCatalog = useTranslations("catalog");
  const searchParams = useSearchParams();
  const carFromUrl = searchParams.get("car") ?? "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [car, setCar] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [hpReadOnly, setHpReadOnly] = useState(true);

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (carFromUrl) {
      const found = cars.find((c) => c.slug === carFromUrl);
      setCar(found ? `${found.brand} ${found.model}` : carFromUrl);
    }
  }, [carFromUrl, cars]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (state === "loading") return;

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          car,
          website: honeypot,
          startedAt,
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setState("error");
        setErrorMsg(data.error ?? t("submitError"));
        return;
      }

      setState("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setHoneypot("");
      setStartedAt(Date.now());
      if (!carFromUrl) setCar("");
    } catch {
      setState("error");
      setErrorMsg(t("networkError"));
    }
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className={cn("relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8", className)}
      noValidate
    >
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-[#0b2545] sm:text-3xl">{t("title")}</h2>
        <p className="mt-2 text-sm text-slate-500">{t("subtitle")}</p>
      </div>

      {state === "success" && (
        <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {t("success")}
        </div>
      )}

      {state === "error" && errorMsg && (
        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMsg}
        </div>
      )}

      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="b_hp_field">Do not fill this field</label>
        <input
          id="b_hp_field"
          name="b_hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="new-password"
          readOnly={hpReadOnly}
          onFocus={() => setHpReadOnly(false)}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t("name")} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0070e0] focus:bg-white focus:ring-2 focus:ring-[#0070e0]/20"
            placeholder={t("namePlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t("phone")} *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={20}
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0070e0] focus:bg-white focus:ring-2 focus:ring-[#0070e0]/20"
            placeholder={t("phonePlaceholder")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t("email")} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0070e0] focus:bg-white focus:ring-2 focus:ring-[#0070e0]/20"
            placeholder={t("emailPlaceholder")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="car" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t("car")}
          </label>
          <select
            id="car"
            name="car"
            value={car}
            onChange={(e) => setCar(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0070e0] focus:bg-white focus:ring-2 focus:ring-[#0070e0]/20"
          >
            <option value="">{t("carNone")}</option>
            {cars.map((c) => (
              <option key={c.slug} value={`${c.brand} ${c.model}`}>
                {c.brand} {c.model} - {c.priceFormatted} {currency}{tCatalog("perDay")}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t("message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0070e0] focus:bg-white focus:ring-2 focus:ring-[#0070e0]/20"
            placeholder={t("messagePlaceholder")}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
