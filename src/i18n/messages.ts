import type { Locale } from "./routing";

export async function getLocaleMessages(locale: Locale) {
  return (await import(`../../i18n/${locale}.json`)).default;
}
