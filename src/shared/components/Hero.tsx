"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { publicEnv } from "@/core/config/env";
import { Link } from "@/core/i18n/navigation";
import { CarViewer3D } from "@/shared/components/CarViewer3D";

export function Hero() {
  const t = useTranslations("hero");
  const tMeta = useTranslations("meta");

  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,112,224,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#0070e0]/5 blur-3xl" />

      <div className="container-wide section-padding pb-8 pt-8 lg:pb-16 lg:pt-12">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-[#0070e0]/25 bg-[#eef6ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#0070e0]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0070e0]" />
              {t("badge")}
            </p>

            <h1 className="font-display mt-6 text-4xl font-bold italic leading-[1.05] text-[#0b2545] sm:text-5xl lg:text-6xl">
              {t("title")}
              <span className="block not-italic text-[#0070e0]">{t("titleAccent")}</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/catalog" className="btn-primary inline-flex justify-center px-8 py-3.5">
                {t("ctaCatalog")}
              </Link>
              <Link href="/contacts#form" className="btn-secondary inline-flex justify-center px-8 py-3.5">
                {t("ctaContact")}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              {[
                { value: "6+", label: t("statCars") },
                { value: "24/7", label: t("statSupport") },
                { value: "0%", label: t("statFees") },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-[#0b2545] sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <CarViewer3D
              src={publicEnv.model3dPath}
              alt={tMeta("title")}
              className="h-[280px] sm:h-[360px] lg:h-[480px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
