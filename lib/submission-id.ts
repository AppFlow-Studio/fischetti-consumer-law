"use client"

const PENDING_SUBMISSION_PREFIX = "clf_pending_submission_v1"

function storageKey(scope: string): string {
  return `${PENDING_SUBMISSION_PREFIX}:${scope.replace(/[^a-z0-9_-]/gi, "_").slice(0, 80)}`
}

function createUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16)
    const value = character === "x" ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

export function getOrCreateSubmissionId(scope: string): string {
  if (typeof window === "undefined") return createUuid()

  const key = storageKey(scope)
  try {
    const existing = window.sessionStorage.getItem(key)
    if (existing) return existing

    const created = createUuid()
    window.sessionStorage.setItem(key, created)
    return created
  } catch {
    return createUuid()
  }
}

export function clearPendingSubmissionId(scope: string, submissionId: string): void {
  if (typeof window === "undefined") return

  try {
    const key = storageKey(scope)
    if (window.sessionStorage.getItem(key) === submissionId) {
      window.sessionStorage.removeItem(key)
    }
  } catch {
    // A successful persisted lead must not depend on browser storage availability.
  }
}
