import { availableLanguageTags, languageTag } from "~/paraglide/runtime"
import { A, useLocation } from "~/i18n"

export function LanguageSwitcher() {
	const location = useLocation()
	const currentLang = languageTag()
	return (
		<>
			{availableLanguageTags.map((lang) => (
				<A
					href={location.pathname}
					hreflang={lang}
					aria-current={lang === currentLang ? "page" : undefined}
				>
					{lang} - {currentLang}
				</A>
			))}
		</>
	)
}
