// @refresh reload
import { mount, StartClient } from "@solidjs/start/client"
import { isAvailableLanguageTag, setLanguageTag, sourceLanguageTag } from "./paraglide/runtime"

mount(() => {
	setLanguageTag(() => {
		const lang = document.documentElement.lang
		return isAvailableLanguageTag(lang) ? lang : sourceLanguageTag
	})
	return <StartClient />
}, document.getElementById("app")!)
