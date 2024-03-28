import type { FetchEvent } from "@solidjs/start/dist/server/types"
import { parse } from "cookie"
import type { Paraglide } from "../types"

export const COOKIE_NAME = "PARAGLIDE_LANG"

export function detectLanguageFromCookie<T extends string>(
	runtime: Paraglide<T>,
	event: FetchEvent
): T | undefined {
	const cookieHeader = event.request.headers.get("cookie")
	if (!cookieHeader) return

	const cookies = parse(cookieHeader)
	const langCookie = cookies[COOKIE_NAME]

	if (!runtime.isAvailableLanguageTag(langCookie)) return
	return langCookie
}

export function setLanguageCookie<T extends string>(lang: T, response: FetchEvent["response"]) {
	response.headers.append("set-cookie", `${COOKIE_NAME}=${lang}; Path=/; HttpOnly; SameSite=strict`)
}
