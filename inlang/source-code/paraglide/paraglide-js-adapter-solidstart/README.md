![Paraglide JS header image](https://cdn.jsdelivr.net/gh/opral/monorepo@latest/inlang/source-code/paraglide/paraglide-js/assets/paraglide-js-header.png)

<doc-features>
<doc-feature text-color="#0F172A" color="#E1EFF7" title="Internationalized Routing" image="https://cdn.jsdelivr.net/gh/opral/monorepo@latest/inlang/source-code/paraglide/paraglide-js-adapter-next/assets/i18n-routing.png"></doc-feature>
<doc-feature text-color="#0F172A" color="#E1EFF7" title="Tiny Bundle Size" image="https://cdn.jsdelivr.net/gh/opral/monorepo@latest/inlang/source-code/paraglide/paraglide-js-adapter-next/assets/bundle-size.png"></doc-feature>
<doc-feature text-color="#0F172A" color="#E1EFF7" title="No route Param needed" image="https://cdn.jsdelivr.net/gh/opral/monorepo@latest/inlang/source-code/paraglide/paraglide-js-adapter-next/assets/no-param.png"></doc-feature>
</doc-features>

# SolidStart Adapter for [Paraglide JS](/m/gerre34r)

Install [ParaglideJS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) and the [Paraglide SolidStart Adapter](https://inlang.com/m/n860p17j/library-inlang-paraglideJsAdapterSolidStart).

```bash
npx @inlang/paraglide-js@latest init
npm install @inlang/paraglide-js-adapter-solidstart
```

## Getting started

### 0. Set up Paraglide

In the generated `./project.inlang/settings.json`, configure which languages you want to support.

```json
// project.inlang/settings.json
{
	"languageTags": ["en", "de"],
	"sourceLanguageTag": "en"
}
```

Create a `./messages` folder with a json file per language and add some messages

```json
// messages/en.json
{
	"hello": "Hello {name}"
}
```

### 1. Add the Vite Plugin

In `app.config.ts` add the paraglide vite plugin. SolidStart uses three separate vite servers, the plugin only
needs to be present in one of them.

```ts
// make sure to import from /vite
import { paraglide } from "@inlang/paraglide-js-adapter-solidstart/vite"
import { defineConfig } from "@solidjs/start/config"

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
})
```

> It's not harmful to add the vite plugin to all three servers, but it causes extra logs

### 2. Add the middleware

In `src/middleware.ts` add the paraglide middleware. This will detect the language based on the following
criteria in descending priority.

1. The Language present in the URL
2. A Language Cookie
3. The `Accept-Language` header
4. The default language

```ts
import { createMiddleware } from "@inlang/paraglide-js-adapter-solidstart"
import * as runtime from "~/paraglide/runtime.js"

export default createMiddleware(runtime)
```

You need to register the middleware file in `app.config.ts`

```ts
// app.config.ts
export default defineConfig({
	middleware: "./src/middleware.ts",
	...
})
```

You can now call `languageTag()` anywhere on the server to access the current language.

### 3. Set the language on the Frontend.

We pass the language detected on the server to the client via the `lang` attribute on the `html` tag.

```tsx
// src/entry-server.tsx
import { createHandler, StartServer } from "@solidjs/start/server"
import { languageTag } from "~/paraglide/runtime"

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang={languageTag()}>
				...
```

We then read it on the client.

```tsx
/// src/entry-client.tsx
import { setLanguageTag } from "~/paraglide/runtime"
setLanguageTag(() => document.documentElement.lang)

// mount()
```

### 4. Setting up the Navigation
We have the language detection in place, now we need to set up our pages & links to take advantage of that. 

Wrap the pages you want to translate in an optional `[[lang]]` parameter:

```txt
|- routes
|  |- [[lang]]
|  |  |- index.tsx
|  |  |- about.tsx
|  |- api/endpoint.tsx
```

You can now navigate to `/en`, `/de` and `/` (or whatever languages you've set up). The middleware will set the language accordingly. 

- On `/`, the language is autodetected the first time & will be the same on subsequent visits.
- On `/{lang}` the language will be set based on the URL. This also overwrites the language preference for visits to `/`. Linking to `/{lang}/path` is how you switch languages.

We need to update any links, redirects and other types of navigations to include the langage in the URL.

### 4. Using messages

To use messages, simply import them in the component. By convention we do a wildcard import as `m`

```tsx
import * as m from "~/paraglide/messages";
import { languageTag } from "~/paraglide/runtime";s

export default Page() {
	languageTag() // => "en"
	return(
		<h1>{m.greeting({ name: "Loris" })}</h1>
	)
}
```

### 6. Switch language

You can switch languages by calling the `setLanguageTag` function provided by the adapter. This will navigate to the translated variant of the current route.

```tsx
<select onChange={(e) => setLanguageTag(e.target.value)}>
	{availableLanguageTags.map((tag) => (
		<option value={tag} selected={tag === languageTag()}>
			{tag}
		</option>
	))}
</select>
```

If you want to navigate to a different route in a specific language, you can use the `translateHref` function provided by the adapter to generate the correct href.

```tsx
<A href={translateHref("/about", "en")}>{m.about()}</A>
```

> ⚠️ Don't use the `translateHref` function on links that point to external websites. It will break the link.

## Advanced Setup

### Text-Direction

If you need to set the text-direction, simply define a dictionary mapping the language tag to the text direction & use it in `entry-server.tsx`.

```tsx
// `entry-server.tsx
import { createHandler, StartServer } from "@solidjs/start/server"
import { useLocationLanguageTag } from "~/i18n.js"
import { sourceLanguageTag, type AvailableLanguageTag } from "~/paraglide/runtime.js"

const dir: Record<AvailableLanguageTag, "ltr" | "rtl"> = {
	en: "ltr",
	ar: "rtl",
}

export default createHandler(() => {
	const language_tag = useLocationLanguageTag() ?? sourceLanguageTag
	return (
		<StartServer
			document={(props) => (
				<html lang={language_tag} dir={dir[language_tag]}>
					{/* ... */}
				</html>
			)}
		/>
	)
})
```

### Alternate links

For SEO reasons you shoul add alternate links to the same page in different languages. These should include a link to the current language as well.

```tsx
const language_tag = languageTag()
<head>
	{availableLanguageTags
		.map((tag) => (
			<link
				rel="alternate"
				href={translateHref("/", tag)}
				hreflang={tag}
			/>
		))
	}
</head>
```

It's not necessary to add the translated links to your sitemap. One language being in there is sufficient.

## Example project

Take a look at the [example in our repository](https://github.com/opral/monorepo/tree/main/inlang/source-code/paraglide/paraglide-js-adapter-solidstart/example).
