import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  submit: vi.fn(),
  trackStart: vi.fn(),
  trackSuccess: vi.fn(async () => undefined),
}))

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: mocks.push }) }))
vi.mock("@/lib/actions/contact", () => ({ submitContactForm: mocks.submit }))
vi.mock("@/components/tracking/tracking-events", () => ({
  trackLeadFormStart: mocks.trackStart,
  trackLeadFormSuccess: mocks.trackSuccess,
}))
vi.mock("@/lib/gclid", () => ({
  getAttributionData: () => ({
    gclid: "g-1",
    gbraid: "gb-1",
    wbraid: "wb-1",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "tcpa",
    utm_term: "spam texts",
    utm_content: "ad-a",
  }),
}))

import SimpleContactForm from "@/components/ui/simple-contact-form"

async function chooseOption(user: ReturnType<typeof userEvent.setup>, comboboxIndex: number, option: string) {
  const comboboxes = screen.getAllByRole("combobox")
  await user.click(comboboxes[comboboxIndex])
  await user.click(await screen.findByRole("option", { name: option }))
}

async function fillRequiredTcpAFields(user: ReturnType<typeof userEvent.setup>) {
  fireEvent.change(screen.getByLabelText(/First name/i), { target: { value: "Jane" } })
  fireEvent.change(screen.getByLabelText(/Last name/i), { target: { value: "Doe" } })
  fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: "jane@example.com" } })
  fireEvent.change(screen.getByLabelText(/^Phone/i), { target: { value: "5612647211" } })
  fireEvent.change(screen.getByLabelText(/ZIP Code/i), { target: { value: "33437" } })
  await chooseOption(user, 0, "TCPA — Spam Text Violations")
  await chooseOption(user, 1, "Not urgent - Just exploring options")
  await chooseOption(user, 2, "Yes, I know the company name")
  fireEvent.change(screen.getByLabelText(/Company, caller, or text sender/i), { target: { value: "Example Sender LLC" } })
  fireEvent.change(screen.getByLabelText(/Briefly describe what happened/i), {
    target: { value: "Example Sender continued sending automated marketing texts after I replied STOP several times." },
  })
}

describe("SimpleContactForm behavior", () => {
  beforeEach(() => {
    window.sessionStorage.clear()
    mocks.push.mockReset()
    mocks.submit.mockReset()
    mocks.trackStart.mockReset()
    mocks.trackSuccess.mockClear()
  })

  it("does not wipe unrelated or TCPA conditional values when the law changes and changes back", async () => {
    const user = userEvent.setup()
    render(<SimpleContactForm />)

    await user.type(screen.getByLabelText(/First name/i), "Jane")
    await user.type(screen.getByLabelText(/Briefly describe what happened/i), "A detailed description that remains while the selected law changes back and forth.")
    await chooseOption(user, 0, "TCPA — Robocall Violations")
    await chooseOption(user, 2, "Yes, I know the company name")
    await user.type(screen.getByLabelText(/Company, caller, or text sender/i), "Example Caller")

    await chooseOption(user, 0, "FCRA — Credit Report Errors")
    expect(screen.getByLabelText(/First name/i)).toHaveValue("Jane")
    expect(screen.getByLabelText(/Briefly describe what happened/i)).toHaveValue(
      "A detailed description that remains while the selected law changes back and forth.",
    )
    expect(screen.queryByLabelText(/Company, caller, or text sender/i)).not.toBeInTheDocument()

    await chooseOption(user, 0, "TCPA — Robocall Violations")
    expect(screen.getByLabelText(/Company, caller, or text sender/i)).toHaveValue("Example Caller")
    expect(screen.getAllByRole("combobox")[2]).toHaveTextContent("Yes, I know the company name")
  })

  it("blocks client validation failures before the backend", async () => {
    const user = userEvent.setup()
    render(<SimpleContactForm />)
    await user.click(screen.getByRole("button", { name: /submit free case review/i }))

    expect(await screen.findByText(/First name must be at least 2 characters/i)).toBeInTheDocument()
    expect(mocks.submit).not.toHaveBeenCalled()
    expect(mocks.trackSuccess).not.toHaveBeenCalled()
  })

  it("prevents a double submit, forwards attribution/TCPA data, and removes PII from the thank-you URL", async () => {
    mocks.submit.mockResolvedValue({
      success: true,
      message: "ok",
      leadId: "4271",
      submissionId: "a1c1ec1e-7361-4dd4-9f20-7181ec969256",
      createdAt: "2026-08-05T15:30:00.000Z",
    })
    const user = userEvent.setup()
    const { container } = render(<SimpleContactForm />)
    await fillRequiredTcpAFields(user)

    const form = container.querySelector("form") as HTMLFormElement
    fireEvent.submit(form)
    fireEvent.submit(form)

    await waitFor(() => expect(mocks.submit).toHaveBeenCalledTimes(1))
    expect(mocks.submit.mock.calls[0][0]).toMatchObject({
      caseType: "TCPA — Spam Text Violations",
      contactingCompany: "Example Sender LLC",
      gclid: "g-1",
      gbraid: "gb-1",
      wbraid: "wb-1",
      utm_campaign: "tcpa",
      submission_id: expect.any(String),
    })
    await waitFor(() => expect(mocks.trackSuccess).toHaveBeenCalledTimes(1))
    expect(mocks.trackSuccess).toHaveBeenCalledWith(
      "free_case_review",
      expect.objectContaining({ leadId: "4271", practiceArea: "TCPA" }),
    )
    expect(mocks.push).toHaveBeenCalledWith("/thank-you?law=tcpa")
    expect(mocks.push.mock.calls[0][0]).not.toContain("Jane")
    expect(mocks.push.mock.calls[0][0]).not.toContain("name=")
  }, 20_000)

  it("does not fire success analytics or navigate when the backend fails", async () => {
    mocks.submit.mockResolvedValue({ success: false, message: "Persistence failed" })
    const user = userEvent.setup()
    const { container } = render(<SimpleContactForm />)
    await fillRequiredTcpAFields(user)

    fireEvent.submit(container.querySelector("form") as HTMLFormElement)

    expect(await screen.findByText("Persistence failed")).toBeInTheDocument()
    expect(mocks.trackSuccess).not.toHaveBeenCalled()
    expect(mocks.push).not.toHaveBeenCalled()
  }, 20_000)
})
