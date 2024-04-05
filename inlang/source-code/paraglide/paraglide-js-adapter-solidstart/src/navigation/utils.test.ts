import { describe, it, expect, vi } from "vitest"
import { getCanonicalPath } from "./utils"

vi.mock("solid-js/web", async (importOriginal) => {
	const mod = await importOriginal<typeof import("solid-js/web")>()
	console.log(mod)
	return {
		...mod,
		get isDev() {
			console.log("isDev")
			return true
		},
	}
})

describe("getCanonicalPath", () => {
	it("should remove the language tag from the path", () => {
		expect(getCanonicalPath("/de-CH/endpoint", ["de-CH", "de"])).toEqual("/endpoint")
	})

	it("should not remove the language from the path if it is not in the available list", () => {
		expect(getCanonicalPath("/de-CH/endpoint", ["de"])).toEqual("/de-CH/endpoint")
	})

	it("should return the path if there is no language tag", () => {
		expect(getCanonicalPath("/endpoint", ["de"])).toEqual("/endpoint")
	})

	it("should throw if a relative path is passed during dev", () => {
		expect(() => getCanonicalPath("endpoint", ["de"])).toThrow()
	})

	it("should not throw if a relative path is passed during production", () => {
		vi.mock("solid-js/web", async (importOriginal) => {
			const mod = await importOriginal<typeof import("solid-js/web")>()
			return {
				...mod,
				isDev: false,
			}
		})

		expect(() => getCanonicalPath("endpoint", ["de"])).not.toThrow()
	})
})
