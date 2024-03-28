import type { Paraglide } from "../shared/types"
import { A as SolidA } from "@solidjs/router"

type LocalizedNavigation<T extends string> = {
	A: (
		props: import("@solidjs/router").AnchorProps & { hreflang?: T }
	) => import("solid-js").JSX.Element
}

export function createNavigation<T extends string>(runtime: Paraglide<T>): LocalizedNavigation<T> {
	return {
		A: (props) => {
			return <SolidA {...props} />
		},
	}
}
