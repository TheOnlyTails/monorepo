import "./app.css"
import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import { LanguageTagProvider } from "./i18n"

export default function App() {
	return (
		<Router
			root={(props) => (
				<LanguageTagProvider value={"de"}>
					<MetaProvider>
						<Suspense>{props.children}</Suspense>
					</MetaProvider>
				</LanguageTagProvider>
			)}
		>
			<FileRoutes />
		</Router>
	)
}
