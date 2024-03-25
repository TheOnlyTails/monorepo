import { Show, createEffect, createSignal, on } from "solid-js"
import type { Message, MessageLintReport, Message as MessageType } from "@inlang/sdk"
import { useEditorState } from "../State.jsx"
import { useLocalStorage } from "#src/services/local-storage/src/LocalStorageProvider.jsx"
import { InlangMessage } from "../InlangMessage.jsx"
import { showFilteredMessage } from "../helper/showFilteredMessage.js"
import { setMessageCount } from "../+Page.jsx"
import { sortLanguageTags } from "../helper/sortLanguageTags.js"

export const MessageWrapper = (props: { id: string }) => {
  const [localStorage,] = useLocalStorage()
  const {
    project,
    filteredLanguageTags,
    filteredIds,
    filteredMessageLintRules,
    textSearch,
    userIsCollaborator
  } = useEditorState()

  const [message, setMessage] = createSignal<MessageType>()
  const [lintReports, setLintReports] = createSignal<Readonly<MessageLintReport[]>>([])

  const [shouldMessageBeShown, setShouldMessageBeShown] = createSignal(true)
  const [hasBeenLinted, setHasBeenLinted] = createSignal(false)

  createEffect(() => {
    if (!project.loading) {
      project()!.query.messages.get.subscribe({ where: { id: props.id } }, (message) =>
        setMessage(message)
      )
    }
  })

  createEffect(() => {
    if (!project.loading && message()?.id) {
      project()!.query.messageLintReports.get.subscribe(
        { where: { messageId: message()!.id } },
        (report) => {
          if (report) {
            setLintReports(report)
            setHasBeenLinted(true)
          }
        }
      )
    }
  })

  createEffect(
    on(
      [filteredLanguageTags, filteredMessageLintRules, filteredIds, textSearch, hasBeenLinted],
      () => {
        setShouldMessageBeShown((prev) => {
          const result = !showFilteredMessage(message())
          // check if message count changed and update the global message count
          if (result !== prev && result === true) {
            setMessageCount((prev) => prev - 1)
          } else if (result !== prev && result === false) {
            setMessageCount((prev) => prev + 1)
          }
          return result
        })
      }
    )
  )

  const handleSave = (newMessage: Message) => {
    const upsertSuccessful = project()?.query.messages.upsert({
      where: { id: newMessage.id },
      data: newMessage,
    })
    return upsertSuccessful
  }

  return (
    <div
      class="group"
      classList={{
        ["hidden"]: message() ? shouldMessageBeShown() : true,
        ["animate-fadeInBottom"]: !shouldMessageBeShown(),
      }}
    >
      <Show when={message()}>
        <InlangMessage
          message={message()!}
          lintReports={lintReports()}
          filteredLanguageTags={sortLanguageTags(filteredLanguageTags(), project()?.settings()?.sourceLanguageTag || "en")}
          refLanguage={project()?.settings()?.sourceLanguageTag || "en"}
          userLoggedIn={localStorage.user?.isLoggedIn || false}
          disableSave={userIsCollaborator() === false}
          handleSave={handleSave}
        />
      </Show >
    </div>
  )
}