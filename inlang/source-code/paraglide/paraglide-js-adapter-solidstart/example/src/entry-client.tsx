// @refresh reload
import { mount, StartClient } from "@solidjs/start/client"
import { AvailableLanguageTag, setLanguageTag } from "./paraglide/runtime"

setLanguageTag(() => document.documentElement.lang as AvailableLanguageTag)

const rootElement = document.getElementById("app")
if (!rootElement) {
	throw new Error("rootElement not found")
}


mount(() => {
	return <StartClient />
}, rootElement)
