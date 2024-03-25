import { For, createEffect, createSignal, Show } from "solid-js"
import type { LanguageTag, Message, MessageLintReport } from "@inlang/sdk"
import { InlangPattern } from "./components/InlangPattern.jsx"
import { createVisibilityObserver } from "@solid-primitives/intersection-observer"
// import IconLink from "~icons/material-symbols/link"
// import copy from "clipboard-copy"
// import { showToast } from "#src/interface/components/Toast.jsx"

export function InlangMessage(props: {
  message: Message,
  lintReports: Readonly<MessageLintReport[]>,
  filteredLanguageTags: LanguageTag[],
  refLanguage: LanguageTag,
  userLoggedIn: boolean,
  disableSave: boolean,
  handleSave: (message: Message) => any
}) {
  // performance optimization to only render visible elements
  // see https://github.com/opral/monorepo/issues/333
  const useVisibilityObserver = createVisibilityObserver()
  let patternListElement: HTMLDivElement | undefined
  const elementIsVisible = useVisibilityObserver(() => patternListElement)
  const [hasBeenRendered, setHasBeenRendered] = createSignal(false)

  createEffect(() => {
    if (elementIsVisible()) {
      setHasBeenRendered(true)
    }
  })

  return (
    <div ref={patternListElement}>
      <div class="flex w-full gap-2 items-center self-stretch flex-grow-0 flex-shrink-0 h-11 relative px-4 bg-surface-2 border-x border-b-0 border-surface-2">
        <h3
          slot="summary"
          class="flex-grow-0 flex-shrink-0 max-w-[calc(100%_-_38px)] text-[13px] font-medium text-left text-on-surface before:text-on-surface truncate"
        >
          {props.message.id}
        </h3>
        {/* different between projects */}
        {/* <div
          onClick={() => {
            copy(
              document.location.protocol +
              "//" +
              document.location.host +
              document.location.pathname +
              "?id=" +
              props.message.id
            ),
              showToast({
                variant: "success",
                title: "Message ID link copied to clipboard",
                duration: 3000,
              })
          }}
          class="opacity-0 transition-all group-hover:opacity-100 text-info/70 h-7 w-7 text-sm rounded flex items-center justify-center hover:bg-on-background/10 hover:text-info cursor-pointer"
        >
          <IconLink />
        </div> */}
        <h3
          slot="summary"
          class="flex-grow-0 flex-shrink-0 text-[13px] font-medium text-left text-on-surface before:text-on-surface"
        >
          {Object.keys(props.message.alias).length > 0
            ? props.message.alias[Object.keys(props.message.alias)[0]!]
            : ""}
        </h3>
      </div>
      <div>
        <For
          each={props.filteredLanguageTags}
        >
          {(languageTag) => {
            return (
              <>
                <Show
                  // only render if visible or has been rendered before
                  when={hasBeenRendered()}
                >
                  <InlangPattern
                    languageTag={languageTag}
                    refLanguage={props.refLanguage}
                    message={props.message}
                    lintReports={props.lintReports as MessageLintReport[]}
                    userLoggedIn={props.userLoggedIn}
                    disableSave={props.disableSave}
                    handleSave={props.handleSave}
                  />
                </Show>
              </>
            )
          }}
        </For>
      </div>
    </div>
  )
}
