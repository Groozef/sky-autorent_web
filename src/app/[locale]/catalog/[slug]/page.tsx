import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { publicEnv } from "@/core/config/env";
import { Link } from "@/core/i18n/navigation";
import { carsBase } from "@/features/catalog/data/cars";
import { getCarBySlug } from "@/features/catalog/lib/get-cars";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return carsBase.flatMap((car) =>
    ["ru", "en", "kz"].map((locale) => ({ locale, slug: car.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const car = await getCarBySlug(slug, locale);
  if (!car) return { title: "Not found" };
  return { title: `${car.brand} ${car.model}`, description: car.description };
}

export default async function CarDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const car = await getCarBySlug(slug, locale);
  if (!car) notFound();

  const t = await getTranslations("catalog");
  const tCommon = await getTranslations("common");
  const currency = tCommon("currency");

  const specs = [
    { label: t("specYear"), value: String(car.year) },
    { label: t("specCategory"), value: car.category },
    { label: t("specTransmission"), value: car.transmission },
    { label: t("specFuel"), value: car.fuelLabel },
    { label: t("specSeats"), value: String(car.seats) },
    { label: t("specPower"), value: car.powerLabel },
    { label: "Двигатель", value: car.engine },
    { label: "Цвет", value: car.color },
  ];

  return (
    <div className="pt-20 sm:pt-24">
      <div className="container-wide section-padding py-8 lg:py-12">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-[#0070e0]"
        >
          {t("back")}
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative h-[300px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,112,224,0.08),transparent_70%)]" />
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-8 sm:p-12"
            />
          </div>

          <div>
            <p className="label-upper">{car.brand}</p>
            <h1 className="font-display mt-2 text-4xl font-bold text-[#0b2545] sm:text-5xl">{car.model}</h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-[#0b2545] sm:text-4xl">
                {car.priceFormatted} {currency}
              </span>
              <span className="text-slate-500">{t("perDay")}</span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-600">{car.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{s.label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#0b2545]">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-[#0b2545]">{t("specs")}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {car.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-full bg-[#eef6ff] px-3 py-1.5 text-xs font-medium text-[#0b2545]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/contacts?car=${car.slug}#form`}
                className="btn-primary inline-flex flex-1 justify-center px-8 py-3.5"
              >
                {t("book")}
              </Link>
              <a
                href={publicEnv.phoneHref}
                className="btn-secondary inline-flex flex-1 justify-center px-8 py-3.5"
              >
                {t("call")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
