import { Title } from "@solidjs/meta"
import { getRequestEvent } from "solid-js/web"
import Counter from "~/components/Counter"
import * as m from "~/paraglide/messages.js"

export default function Home() {
	return (
		<main>
			{/* You can't use messages in <Title> components directly */}
			<Title>{m.heading()}</Title>
			<h1>{m.heading()}</h1>
			<Counter />
		</main>
	)
}
