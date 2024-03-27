import { Title } from "@solidjs/meta"
import Counter from "~/components/Counter"
import * as m from "~/paraglide/messages"

export default function Home() {
	return (
		<main>
			<Title>{m.greeting({ name: "World" })}</Title>
			<h1>{m.greeting({ name: "World" })}</h1>
			<Counter />
			<p>
				Visit{" "}
				<a href="https://start.solidjs.com" target="_blank">
					start.solidjs.com
				</a>{" "}
				to learn how to build SolidStart apps.
			</p>
		</main>
	)
}
