import type { Paraglide } from "../shared/types"
import { A as SolidA, useLocation, useResolvedPath } from "@solidjs/router"

type LocalizedNavigation<T extends string> = {
	A: (
		props: import("@solidjs/router").AnchorProps & { hreflang?: T }
	) => import("solid-js").JSX.Element
}

export function createNavigation<T extends string>(runtime: Paraglide<T>): LocalizedNavigation<T> {
	return {
		A: (props) => {
			const currentLocation = useLocation()
			console.log(currentLocation)

			return <SolidA {...props} />
		},
	}
}
