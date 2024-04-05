export function createI18n<T extends string>({
	availableLanguageTags,
}: {
	availableLanguageTags: readonly T[]
}) {
	return {
		availableLanguageTags,
	}
}
