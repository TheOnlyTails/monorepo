import { action, useAction, useSubmission } from "@solidjs/router"
import { languageTag } from "~/paraglide/runtime"

const echo = action(async (message: string) => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return message + " - " + languageTag()
})

export function ActionDemo() {
	const myEcho = useAction(echo)
	const echoing = useSubmission(echo)
	myEcho("Hello from solid!")
	setTimeout(() => myEcho("This is a second submission!"), 1500)
	return <p>{echoing.result}</p>
}
