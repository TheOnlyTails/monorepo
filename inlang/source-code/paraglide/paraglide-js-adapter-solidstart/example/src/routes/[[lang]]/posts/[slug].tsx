import { useParams } from "@solidjs/router"
import { ActionDemo } from "~/components/ActionDemo"

export default function Post() {
	const params = useParams()
	return (
		<>
			<div>{params.slug}</div>
			<ActionDemo />
		</>
	)
}
