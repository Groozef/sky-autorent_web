import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/core/i18n/navigation";
import type { CarView } from "@/features/catalog/lib/get-cars";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: CarView;
  className?: string;
  currency: string;
}

export async function CarCard({ car, className, currency }: CarCardProps) {
  const t = await getTranslations("catalog");

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-white via-[#f8fbff] to-[#eef6ff]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,112,224,0.08),transparent_70%)]" />
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain px-5 pb-5 pt-12 transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0b2545] shadow-sm">
          {car.category}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#0070e0]">{car.brand}</p>
            <h3 className="font-display mt-1 text-xl font-bold text-[#0b2545] sm:text-2xl">{car.model}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {car.year} / {car.transmission} / {car.engine}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-xl font-bold text-[#0b2545] sm:text-2xl">
              {car.priceFormatted} {currency}
            </p>
            <p className="text-xs text-slate-500">{t("perDay")}</p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{car.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {car.features.slice(0, 3).map((f) => (
            <span
              key={f}
              className="rounded-full bg-[#eef6ff] px-2.5 py-1 text-[11px] font-medium text-[#0b2545]"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-5">
          <Link
            href={`/catalog/${car.slug}`}
            className="flex-1 rounded-full border border-slate-200 py-2.5 text-center text-sm font-semibold text-[#0b2545] transition hover:border-[#0070e0]/40 hover:bg-[#eef6ff]"
          >
            {t("details")}
          </Link>
          <Link
            href={`/contacts?car=${car.slug}#form`}
            className="flex-1 rounded-full bg-[#0b2545] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#061528]"
          >
            {t("book")}
          </Link>
        </div>
      </div>
    </article>
  );
}
