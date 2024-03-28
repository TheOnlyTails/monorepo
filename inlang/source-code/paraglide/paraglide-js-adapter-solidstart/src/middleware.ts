import { createMiddleware as createSolidMiddleware } from "@solidjs/start/middleware"
import { getRequestEvent } from "solid-js/web"
import type { Paraglide } from "./types"
import type { FetchEvent } from "@solidjs/start/dist/server/types"
import { detectLanguageFromCookie, setLanguageCookie } from "./detect-language/cookie"
import { detectLanguageFromAcceptLanguage } from "./detect-language/acceptLanguage"
import { detectLanguageFromPath } from "./detect-language/path"

export function createMiddleware<T extends string>(
	runtime: Paraglide<T>,
	opts: {
		prefix?: "always"
		detectLanguage?: (event: FetchEvent) => T | undefined
	} = {}
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
				const lang: T =
					opts.detectLanguage?.(event) ||
					detectLanguageFromPath(runtime, event) ||
					detectLanguageFromCookie(runtime, event) ||
					detectLanguageFromAcceptLanguage(runtime, event) ||
					runtime.sourceLanguageTag

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
		onBeforeResponse: [
			(event) => {
				//Make sure the langauge cookie matches the language
				const detectedCookieLang = detectLanguageFromCookie(runtime, event)
				if (detectedCookieLang !== event.locals.paraglide.lang) {
					setLanguageCookie(event.locals.paraglide.lang, event.response)
				}
			},
		],
	})
}
