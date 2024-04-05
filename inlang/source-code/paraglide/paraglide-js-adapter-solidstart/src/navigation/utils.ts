import { isDev } from "solid-js/web"

/**
 * Returns the canonical path for a given localized path
 * Both paths are absolute
 *
 * @param localizedPath
 */
export function getCanonicalPath(
	localizedPath: string,
	availableLanguageTags: readonly string[]
): string {
	if (isDev && !localizedPath.startsWith("/")) {
		throw new Error("The path passed to getCanonicalPath must be absolute (dev only error)")
	}

	const segments = localizedPath.split("/")
	const maybeLang = segments.at(1)

	if (!availableLanguageTags.includes(maybeLang as string)) {
		return localizedPath
	}

	//remove the language tag
	segments.splice(1, 1)
	return segments.join("/")
}
