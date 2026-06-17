function env(key: string, fallback = ""): string {
  return process.env[key]?.trim() || fallback;
}

function versionedPublicPath(path: string, version: string): string {
  if (!version || path.includes("?")) return path;
  return `${path}?v=${encodeURIComponent(version)}`;
}

const logoPath = process.env.NEXT_PUBLIC_LOGO_PATH?.trim() || "/logo-big.png";
const logoVersion = process.env.NEXT_PUBLIC_LOGO_VERSION?.trim() || "";


/** Public runtime config - safe for client components */
export const publicEnv = {
  siteName: env("NEXT_PUBLIC_SITE_NAME", "Sky AutoRent"),
  logoPath: versionedPublicPath(logoPath, logoVersion),
  logoDarkPath: env("NEXT_PUBLIC_LOGO_DARK_PATH", ""),
  logoVersion,
  model3dPath: env("NEXT_PUBLIC_MODEL_3D_PATH", "/models/maserati.glb"),
  enableDarkTheme: env("NEXT_PUBLIC_ENABLE_DARK_THEME", "false") === "true",

  phone: env("NEXT_PUBLIC_CONTACT_PHONE", "+7 (777) 257 33 03"),
  phoneHref: env("NEXT_PUBLIC_CONTACT_PHONE_HREF", "tel:+77772573303"),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL", "info@skyautorent.kz"),
  address: env("NEXT_PUBLIC_CONTACT_ADDRESS", "Shymkent, Utepova 15"),
  workingHours: env("NEXT_PUBLIC_CONTACT_WORKING_HOURS", "Daily, 09:00 - 21:00"),

  social: {
    telegram: env("NEXT_PUBLIC_SOCIAL_TELEGRAM", "https://t.me/sky_autorent_test"),
    instagram: env(
      "NEXT_PUBLIC_SOCIAL_INSTAGRAM",
      "https://www.instagram.com/sky_autorent?igsh=MWF5dGt0bzM4YXppYw%3D%3D&utm_source=qr",
    ),
    whatsapp: env("NEXT_PUBLIC_SOCIAL_WHATSAPP", "https://wa.me/77772573303"),
    tiktok: env("NEXT_PUBLIC_SOCIAL_TIKTOK", "https://www.tiktok.com/@sky_autorent?_r=1&_t=ZS-97G2p8tz4BJ"),
  },

  socialLabels: {
    telegram: env("NEXT_PUBLIC_SOCIAL_TELEGRAM_LABEL", "@sky_autorent_test"),
    instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM_LABEL", "@sky_autorent"),
    whatsapp: env("NEXT_PUBLIC_SOCIAL_WHATSAPP_LABEL", "+7 (777) 257 33 03"),
    tiktok: env("NEXT_PUBLIC_SOCIAL_TIKTOK_LABEL", "@sky_autorent"),
  },
} as const;

/** Server-only config */
export const serverEnv = {
  contactEmail: env("CONTACT_EMAIL", "groozeff@gmail.com"),
  smtpHost: env("SMTP_HOST", "smtp.gmail.com"),
  smtpPort: Number(env("SMTP_PORT", "587")) || 587,
  smtpUser: env("SMTP_USER", "groozeff@gmail.com"),
  smtpPass: env("SMTP_PASS", ""),
} as const;
