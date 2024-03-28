import { Title } from "@solidjs/meta"
import Counter from "~/components/Counter"
import * as m from "~/paraglide/messages.js"

export default function Home() {
	return (
		<main>
			{/* You can't use messages in <Title> components directly */}
			<Title>{m.heading()}</Title>
			<h1>{m.heading()}</h1>
			<a href="/about">About</a>
			<a href="/posts/123">Posts</a>
			<Counter />
		</main>
	)
}
