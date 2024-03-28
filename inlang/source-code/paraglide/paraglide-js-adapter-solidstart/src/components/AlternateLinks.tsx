import { Link } from "@solidjs/meta"

export function AlternateLinks<T extends string>(props: {
	availableLanguages: readonly T[]
	defaultLanguage: T
}) {
	return (
		<>
			{props.availableLanguages.map((tag) => (
				<Link rel="alternate" href="/de" hreflang={tag} />
			))}
		</>
	)
}
