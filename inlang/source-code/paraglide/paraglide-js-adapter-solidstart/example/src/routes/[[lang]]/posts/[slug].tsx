import { useParams } from "@solidjs/router"

export default function Post() {
	const params = useParams()
	return <div>{params.slug}</div>
}
