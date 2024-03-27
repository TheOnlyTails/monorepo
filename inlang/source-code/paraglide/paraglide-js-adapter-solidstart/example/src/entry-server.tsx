// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"
import { AvailableLanguageTag, languageTag } from "~/paraglide/runtime"

const dir: Record<AvailableLanguageTag, "ltr" | "rtl"> = {
	en: "ltr",
	de: "ltr",
}

export default createHandler(() => {
	const lang = languageTag()

	return (
		<StartServer
			document={({ assets, children, scripts }) => (
				<html lang={lang} dir={dir[lang]}>
					<head>
						<meta charset="utf-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
						<link rel="icon" href="/favicon.ico" />
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
