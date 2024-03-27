// @refresh reload
import { mount, StartClient } from "@solidjs/start/client"

const rootElement = document.getElementById("app")
if (!rootElement) {
	throw new Error("rootElement not found")
}

mount(() => {
	return <StartClient />
}, rootElement)
