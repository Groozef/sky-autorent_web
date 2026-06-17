/**
 * Sky AutoRent Web — модульная архитектура фронтенда
 *
 * core/       — конфиг, i18n, env (общее для всего приложения)
 * features/   — бизнес-модули (catalog, contact, позже booking, transfer, admin)
 * shared/     — переиспользуемые UI-компоненты
 * messages/   — переводы (ru, en, kz)
 *
 * Будущая экосистема:
 * - sky-autorent-web     (этот репо) — Next.js, свой Docker
 * - sky-autorent-api     — REST/GraphQL, свой Docker
 * - sky-autorent-mobile  — React Native / Expo, свой Docker/CI
 *
 * Фронты общаются с API как независимые клиенты.
 * Сейчас landing работает автономно (статические данные + форма).
 */

export {};
