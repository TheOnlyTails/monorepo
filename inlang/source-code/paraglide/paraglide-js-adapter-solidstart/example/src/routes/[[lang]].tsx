import { availableLanguageTags, sourceLanguageTag } from "~/paraglide/runtime"
import { AlternateLinks } from "@inlang/paraglide-js-adapter-solidstart"

export default function Layout({ children }: { children: import("solid-js").JSX.Element }) {
	return (
		<>
			<AlternateLinks
				defaultLanguage={sourceLanguageTag}
				availableLanguages={availableLanguageTags}
			/>
			{children}
		</>
	)
}
