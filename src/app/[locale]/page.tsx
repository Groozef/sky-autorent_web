import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/core/i18n/navigation";
import { getCars } from "@/features/catalog/lib/get-cars";
import { CarCard } from "@/shared/components/CarCard";
import { ContactSection } from "@/shared/components/ContactSection";
import { Hero } from "@/shared/components/Hero";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("catalog");
  const tBenefits = await getTranslations("benefits");
  const tCommon = await getTranslations("common");
  const cars = await getCars(locale);
  const featured = cars.filter((c) => c.featured);
  const currency = tCommon("currency");

  return (
    <>
      <Hero />

      <section className="py-16 lg:py-24">
        <div className="container-wide section-padding">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="label-upper">{t("label")}</p>
              <h2 className="font-display mt-3 text-3xl font-bold text-[#0b2545] sm:text-4xl">{t("popular")}</h2>
            </div>
            <Link
              href="/catalog"
              className="text-sm font-semibold text-[#0070e0] underline-offset-4 hover:underline"
            >
              {t("all")} →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((car) => (
              <CarCard key={car.slug} car={car} currency={currency} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-[#f8fbff] py-16 lg:py-24">
        <div className="container-wide section-padding">
          <div className="mb-12 text-center">
            <p className="label-upper">{tBenefits("label")}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-[#0b2545] sm:text-4xl">{tBenefits("title")}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {(["0", "1", "2"] as const).map((key) => (
              <div
                key={key}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <span className="font-display text-4xl font-bold text-[#0070e0]/20">0{Number(key) + 1}</span>
                <h3 className="font-display mt-4 text-xl font-bold text-[#0b2545]">
                  {tBenefits(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {tBenefits(`items.${key}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection locale={locale} />
    </>
  );
}
