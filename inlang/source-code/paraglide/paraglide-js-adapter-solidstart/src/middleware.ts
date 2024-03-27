import { createMiddleware as createSolidMiddleware } from "@solidjs/start/middleware"
import { getRequestEvent } from "solid-js/web"
import type { Paraglide } from "./types"
import type { FetchEvent } from "@solidjs/start/dist/server/types"

export function createMiddleware<T extends string>(
	runtime: Paraglide<T>,
	{ detectLanguage }: { detectLanguage: (request: FetchEvent["request"]) => T }
): any {
	type Locals = {
		paraglide: {
			lang: T
		}
	}

	runtime.setLanguageTag(() => {
		const event = getRequestEvent()
		// @ts-ignore
		const locals: Locals | undefined = event?.locals
		if (!locals) return runtime.sourceLanguageTag
		return locals.paraglide?.lang || runtime.sourceLanguageTag
	})

	return createSolidMiddleware({
		onRequest: [
			(event) => {
				const lang = detectLanguage(event.request)

				const locals: Locals = {
					paraglide: {
						lang,
					},
				}

				event.locals = {
					...event.locals,
					...locals,
				}
			},
		],
	})
}
