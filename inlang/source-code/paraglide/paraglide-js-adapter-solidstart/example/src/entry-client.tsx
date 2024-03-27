// @refresh reload
import { mount, StartClient } from "@solidjs/start/client"
import { isAvailableLanguageTag, setLanguageTag, sourceLanguageTag } from "./paraglide/runtime"

const rootElement = document.getElementById("app")
if (!rootElement) {
	throw new Error("rootElement not found")
}

mount(() => {
	setLanguageTag(() => {
		const lang = document.documentElement.lang
		return isAvailableLanguageTag(lang) ? lang : sourceLanguageTag
	})
	return <StartClient />
}, rootElement)
