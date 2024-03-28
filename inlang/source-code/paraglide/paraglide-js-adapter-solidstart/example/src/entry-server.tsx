// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"
import {
	AvailableLanguageTag,
	availableLanguageTags,
	languageTag,
	sourceLanguageTag,
} from "~/paraglide/runtime"
import { AlternateLinks } from "@inlang/paraglide-js-adapter-solidstart"

const dir: Record<AvailableLanguageTag, "ltr" | "rtl"> = {
	en: "ltr",
	de: "ltr",
}

export default createHandler(() => {
	return (
		<StartServer
			document={({ assets, children, scripts }) => (
				<html lang={languageTag()} dir={dir[languageTag()]}>
					<head>
						<meta charset="utf-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
						<link rel="icon" href="/favicon.ico" />
						<AlternateLinks
							defaultLanguage={sourceLanguageTag}
							availableLanguages={availableLanguageTags}
						/>
						{assets}
					</head>
					<body>
						<div id="app">{children}</div>
						{scripts}
					</body>
				</html>
			)}
		/>
	)
})
