// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"
import { languageTag, setLanguageTag } from "./paraglide/runtime"

export default createHandler((ctx) => {
	console.log("ctx.request", ctx.request)
	setLanguageTag("en")

	return (
		<StartServer
			document={({ assets, children, scripts }) => (
				<html lang={languageTag()}>
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
