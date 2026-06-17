import { getTranslations } from "next-intl/server";
import { Link } from "@/core/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-20 text-center">
      <p className="font-display text-8xl font-bold text-[#0070e0]/15">404</p>
      <h1 className="font-display mt-4 text-3xl font-bold text-[#0b2545]">{t("title")}</h1>
      <p className="mt-2 text-slate-500">{t("desc")}</p>
      <Link href="/" className="btn-primary mt-8 px-8 py-3">
        {t("home")}
      </Link>
    </div>
  );
}
