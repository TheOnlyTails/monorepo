import { sourceLanguageTag, languageTags } from "./project.inlang/settings.json"
import paraglide from "@inlang/paraglide-js-adapter-astro"
import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import svelte, { vitePreprocess } from "@astrojs/svelte"
import node from "@astrojs/node"

// https://astro.build/config
export default defineConfig({
	//configure this to your domain name
	site: "https://acme.com",
	i18n: {
		defaultLocale: sourceLanguageTag,
		locales: languageTags,
	},
	integrations: [
		mdx(),
		svelte({
			preprocess: [vitePreprocess()],
		}),
		paraglide({
			project: "./project.inlang",
			outdir: "./src/paraglide",
		}),
	],
	//output: "server",
	adapter: node({
		mode: "standalone",
	}),
})
