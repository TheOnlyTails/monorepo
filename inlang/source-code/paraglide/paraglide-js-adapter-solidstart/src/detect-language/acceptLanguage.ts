import type { FetchEvent } from "@solidjs/start/dist/server/types"
import type { Paraglide } from "../types"
import { preferredLanguages } from "../utils/language-negotiation"

export function detectLanguageFromAcceptLanguage<T extends string>(
	runtime: Paraglide<T>,
	event: FetchEvent
): T | undefined {
	const acceptLanguageValue = event.request.headers.get("accept-language") ?? undefined
	const langaugePreferences = preferredLanguages(acceptLanguageValue, runtime.availableLanguageTags)
	return langaugePreferences.at(0)
}
