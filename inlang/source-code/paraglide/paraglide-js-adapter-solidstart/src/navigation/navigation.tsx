import type { Paraglide } from "../shared/types"
import {
	A as SolidA,
	useLocation as SolidUseLocation,
	redirect as SolidRedirect,
	useMatch as SolidUseMatch,
	useNavigate as SolidUseNavigate,
} from "@solidjs/router"

type LocalizedNavigation<T extends string> = {
	A: (
		props: import("@solidjs/router").AnchorProps & { hreflang?: T | "x-default" }
	) => import("solid-js").JSX.Element

	useNavigate: typeof SolidUseNavigate
	useLocation: typeof SolidUseLocation
	redirect: typeof SolidRedirect
	useMatch: typeof SolidUseMatch
}

export function createNavigation<T extends string>(runtime: Paraglide<T>): LocalizedNavigation<T> {
	return {
		A: (props) => {
			const desiredLanguage = props.hreflang ?? runtime.languageTag()

			return <SolidA {...props} />
		},
		useNavigate: SolidUseNavigate,
		useLocation: SolidUseLocation,
		redirect: SolidRedirect,
		useMatch: SolidUseMatch,
	}
}
