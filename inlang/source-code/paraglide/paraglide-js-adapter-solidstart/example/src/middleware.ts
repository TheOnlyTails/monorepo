import { createMiddleware } from "@inlang/paraglide-js-adapter-solidstart"
import * as runtime from "~/paraglide/runtime"

export default createMiddleware(runtime, {
	detectLanguage(request) {
		const [, lang] = new URL(request.url).pathname.split("/")
		return runtime.isAvailableLanguageTag(lang) ? lang : runtime.sourceLanguageTag
	},
})
