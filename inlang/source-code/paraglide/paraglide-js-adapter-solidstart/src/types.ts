/**
 * The compiled paraglide runtime module.
 * (e.g. "paraglide/runtime.js")
 */
export interface Paraglide<T extends string> {
	readonly setLanguageTag: (language_tag: T | (() => T)) => void
	readonly languageTag: () => T
	readonly onSetLanguageTag: (callback: (language_tag: T) => void) => void
	readonly availableLanguageTags: readonly T[]
	readonly sourceLanguageTag: T
}
