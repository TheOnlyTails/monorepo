import type { FetchEvent } from "@solidjs/start/dist/server/types"
import type { Paraglide } from "../../shared/types"
import { preferredLanguages } from "../../shared/language-negotiation"

export function detectLanguageFromAcceptLanguage<T extends string>(
	runtime: Paraglide<T>,
	event: FetchEvent
): T | undefined {
	const acceptLanguageValue = event.request.headers.get("accept-language") ?? undefined
	const langaugePreferences = preferredLanguages(acceptLanguageValue, runtime.availableLanguageTags)
	return langaugePreferences.at(0)
}
