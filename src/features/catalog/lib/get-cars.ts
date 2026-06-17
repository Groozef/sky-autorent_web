import { getTranslations } from "next-intl/server";
import { publicEnv } from "@/core/config/env";
import { carsBase, type CarBase, formatPrice, resolveLocale } from "../data/cars";

export interface CarView extends Omit<CarBase, "category" | "transmission" | "description" | "features"> {
  category: string;
  transmission: string;
  description: string;
  features: string[];
  fuelLabel: string;
  powerLabel: string;
  priceFormatted: string;
  model3d: string;
}

export async function getCars(locale: string): Promise<CarView[]> {
  const t = await getTranslations({ locale, namespace: "cars" });
  const resolvedLocale = resolveLocale(locale);

  return carsBase.map((car) => ({
    ...car,
    category: car.category[resolvedLocale],
    transmission: car.transmission[resolvedLocale],
    fuelLabel: t(`fuel.${car.fuel}`),
    powerLabel: t("powerUnit", { value: car.power }),
    description: car.description[resolvedLocale],
    features: car.features[resolvedLocale],
    priceFormatted: formatPrice(car.pricePerDay, locale),
    model3d: publicEnv.model3dPath,
  }));
}

export async function getCarBySlug(slug: string, locale: string): Promise<CarView | undefined> {
  const cars = await getCars(locale);
  return cars.find((c) => c.slug === slug);
}
