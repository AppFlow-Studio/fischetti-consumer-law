import React from "react"

/**
 * Converts markdown-style bold text (**text**) to JSX <strong> elements
 * @param text - String containing **bold** markdown syntax
 * @returns React.ReactNode with bold text rendered as <strong> elements
 */
export function renderBoldText(text: string): React.ReactNode {
  if (!text) return null

  const parts: (string | React.ReactElement)[] = []
  const regex = /\*\*(.*?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    // Add the bold text
    parts.push(<strong key={`bold-${match.index}`}>{match[1]}</strong>)
    lastIndex = regex.lastIndex
  }

  // Add remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  // If no matches found, return the original text
  if (parts.length === 0) {
    return text
  }

  return <>{parts}</>
}
