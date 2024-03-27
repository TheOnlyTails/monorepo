import { defineConfig } from "@solidjs/start/config"
import { paraglide } from "@inlang/paraglide-js-adapter-solidstart/vite"

export default defineConfig({
	vite({ router }) {
		if (router === "server") {
			return {
				plugins: [
					paraglide({
						project: "./project.inlang",
						outdir: "./src/paraglide",
					}),
				],
			}
		}
		return {}
	},
	middleware: "./src/middleware.ts",
})
