import { languageTag } from "~/paraglide/runtime"

export function GET() {
	return new Response("Hello World" + languageTag())
}
