import { createMiddleware } from "@inlang/paraglide-js-adapter-solidstart"
import * as runtime from "~/paraglide/runtime"

export default createMiddleware(runtime, {
	detectLanguage(request) {
		const cookies = request.headers
		console.log(request.headers)
		return "en"
	},
})
