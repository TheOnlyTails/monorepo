import { Title } from "@solidjs/meta"
import Counter from "~/components/Counter"
import * as m from "~/paraglide/messages"

export default function Home() {
	const greeting = m.greeting({ name: "SAds" })
	return (
		<main>
			{/* You can't use messages in <Title> components directly */}
			<Title>{greeting}</Title>
			<h1>{m.greeting({ name: "SolidStart" })}</h1>
			<Counter />
		</main>
	)
}
