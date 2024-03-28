import { A as SolidA } from "@solidjs/router"
import * as runtime from "~/paraglide/runtime"
import { createNavigation } from "../../dist/navigation"

export const { A } = createNavigation<runtime.AvailableLanguageTag>()
