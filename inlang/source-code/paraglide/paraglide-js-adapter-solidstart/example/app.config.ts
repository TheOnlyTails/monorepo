import { defineConfig } from "@solidjs/start/config"
import { paraglide } from "@inlang/paraglide-js-adapter-vite"

export default defineConfig({
	vite: {
		plugins: [
			paraglide({
				project: "./project.inlang",
				outdir: "./src/paraglide",
			}),
		],
	},
})
