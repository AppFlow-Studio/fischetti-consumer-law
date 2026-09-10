import { beforeEach, describe, expect, it } from "vitest"
import { captureAttribution, getAttributionData } from "@/lib/gclid"

const STORAGE_KEY = "clf_attribution_v1"

describe("90-day click attribution", () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.replaceState({}, "", "/")
  })

  it("preserves a GCLID through internal navigation without overwriting first touch", () => {
    window.history.replaceState({}, "", "/?gclid=google-click-1&utm_source=google&utm_medium=cpc")
    captureAttribution()
    window.history.replaceState({}, "", "/consumer-law/fcra")
    captureAttribution()

    expect(getAttributionData()).toMatchObject({
      gclid: "google-click-1",
      gbraid: "",
      wbraid: "",
      utm_source: "google",
      utm_medium: "cpc",
    })

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}")
    expect(stored.first_touch.gclid).toBe("google-click-1")
    expect(stored.last_touch.gclid).toBe("google-click-1")
    expect(stored.first_touch.landing_page).toContain("gclid=google-click-1")
    expect(stored.first_touch.captured_at).toBeTruthy()
  })

  it("captures GBRAID, WBRAID, and every UTM without conflating click identifiers", () => {
    window.history.replaceState({}, "", "/?gbraid=gb-1&wbraid=wb-1&utm_source=google&utm_medium=cpc&utm_campaign=fcra&utm_term=credit&utm_content=ad-a")
    captureAttribution()

    expect(getAttributionData()).toEqual({
      gclid: "",
      gbraid: "gb-1",
      wbraid: "wb-1",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "fcra",
      utm_term: "credit",
      utm_content: "ad-a",
    })
  })

  it("keeps the original first touch while updating a later attributed last touch", () => {
    window.history.replaceState({}, "", "/?gclid=first-click")
    captureAttribution()
    window.history.replaceState({}, "", "/?wbraid=last-click&utm_campaign=tcpa")
    captureAttribution()

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}")
    expect(stored.first_touch.gclid).toBe("first-click")
    expect(stored.first_touch.wbraid).toBeUndefined()
    expect(stored.last_touch.wbraid).toBe("last-click")
    expect(stored.last_touch.gclid).toBeUndefined()
  })
})
