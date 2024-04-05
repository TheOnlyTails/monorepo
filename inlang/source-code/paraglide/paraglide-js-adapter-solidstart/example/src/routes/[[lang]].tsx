import { Link } from "@solidjs/meta"
import { useLocation } from "@solidjs/router"
import { LanguageSwitcher } from "~/components/LanguageSwitcher"

export default function Layout({ children }: { children: import("solid-js").JSX.Element }) {
	const href = useLocation()

	return (
		<>
			<Link href="/en" hreflang="en" rel="alternate" />
			<Link href="/de" hreflang="de" rel="alternate" />
			<Link href="/" hreflang="x-default" rel="alternate" />

			<LanguageSwitcher />

			<h1>{href.pathname}</h1>
			{children}
		</>
	)
}
