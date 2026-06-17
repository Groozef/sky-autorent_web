import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCars } from "@/features/catalog/lib/get-cars";
import { CarCard } from "@/shared/components/CarCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return { title: t("pageTitle"), description: t("pageDesc") };
}

export default async function CatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("catalog");
  const tCommon = await getTranslations("common");
  const cars = await getCars(locale);
  const currency = tCommon("currency");
  const featured = cars.filter((c) => c.featured);
  const rest = cars.filter((c) => !c.featured);

  return (
    <div className="pt-20 sm:pt-24">
      <section className="border-b border-slate-100 bg-[#f8fbff] py-12 lg:py-16">
        <div className="container-wide section-padding">
          <p className="label-upper">{t("label")}</p>
          <h1 className="font-display mt-3 text-4xl font-bold text-[#0b2545] sm:text-5xl">{t("pageTitle")}</h1>
          <p className="mt-4 max-w-2xl text-slate-600">{t("pageDesc")}</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide section-padding">
          <h2 className="mb-6 font-display text-2xl font-bold text-[#0b2545]">{t("featured")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((car) => (
              <CarCard key={car.slug} car={car} currency={currency} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-[#f8fbff] py-12 lg:py-16">
        <div className="container-wide section-padding">
          <h2 className="mb-6 font-display text-2xl font-bold text-[#0b2545]">{t("more")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((car) => (
              <CarCard key={car.slug} car={car} currency={currency} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
