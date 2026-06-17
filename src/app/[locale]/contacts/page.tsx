import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactSection } from "@/shared/components/ContactSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacts" });
  return { title: t("pageTitle"), description: t("pageDesc") };
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contacts");

  return (
    <div className="pt-20 sm:pt-24">
      <section className="border-b border-slate-100 bg-[#f8fbff] py-12 lg:py-16">
        <div className="container-wide section-padding text-center">
          <p className="label-upper">{t("label")}</p>
          <h1 className="font-display mt-3 text-4xl font-bold text-[#0b2545] sm:text-5xl">{t("pageTitle")}</h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">{t("pageDesc")}</p>
        </div>
      </section>

      <ContactSection locale={locale} />
    </div>
  );
}
