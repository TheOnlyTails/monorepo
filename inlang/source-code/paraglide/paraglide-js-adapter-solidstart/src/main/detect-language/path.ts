import type { FetchEvent } from "@solidjs/start/dist/server/types"
import type { Paraglide } from "../../shared/types"

export function detectLanguageFromPath<T extends string>(
	runtime: Paraglide<T>,
	event: FetchEvent
): T | undefined {
	const [, maybeLang] = new URL(event.request.url).pathname.split("/")
	return runtime.isAvailableLanguageTag(maybeLang) ? maybeLang : undefined
}
