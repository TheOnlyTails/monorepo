export function AlternateLinks<T extends string>(props: {
	availableLanguages: readonly T[]
	defaultLanguage: T
}) {
	return (
		<>
			{props.availableLanguages.map((tag) => (
				<link rel="alternate" href="/de" hreflang={tag} />
			))}
		</>
	)
}
