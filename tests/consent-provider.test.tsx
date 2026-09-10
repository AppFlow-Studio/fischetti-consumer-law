import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ConsentProvider, useConsent } from "@/components/consent/ConsentProvider"
import { CONSENT_STORAGE_KEY } from "@/lib/consent"

function ConsentControls() {
  const { isReady, acceptAll, rejectAll } = useConsent()
  if (!isReady) return <span>loading</span>
  return (
    <>
      <button onClick={acceptAll}>Accept</button>
      <button onClick={rejectAll}>Reject</button>
    </>
  )
}

describe("ConsentProvider controls", () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.dataLayer = []
    window.gtag = vi.fn()
  })

  it("persists reject and accept and sends matching Google consent updates", async () => {
    const user = userEvent.setup()
    render(
      <ConsentProvider>
        <ConsentControls />
      </ConsentProvider>,
    )

    await user.click(await screen.findByRole("button", { name: "Reject" }))
    expect(JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) || "{}")).toMatchObject({
      analytics: false,
      marketing: false,
      functional: false,
    })
    expect(window.gtag).toHaveBeenLastCalledWith("consent", "update", expect.objectContaining({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    }))

    await user.click(screen.getByRole("button", { name: "Accept" }))
    await waitFor(() => expect(JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) || "{}")).toMatchObject({
      analytics: true,
      marketing: true,
      functional: true,
    }))
    expect(window.gtag).toHaveBeenLastCalledWith("consent", "update", expect.objectContaining({
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    }))
  })
})
