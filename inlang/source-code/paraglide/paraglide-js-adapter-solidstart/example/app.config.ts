import { defineConfig } from "@solidjs/start/config"
import { paraglide } from "@inlang/paraglide-js-adapter-solidstart/vite"

export default defineConfig({
	middleware: "./src/middleware.ts",
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

	ssr: true,
	server: {
		baseURL: "/",
		preset: "static",
	},
})
