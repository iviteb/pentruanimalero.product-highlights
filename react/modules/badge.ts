import type { CSSProperties } from 'react'

const normalize = (value?: string) => value?.trim().toLowerCase() ?? ''

export function findHighlightBadge(
  highlightName: string,
  badges: HighlightBadge[] = []
) {
  const name = normalize(highlightName)

  if (!name) {
    return undefined
  }

  return badges.find((badge) => normalize(badge?.badgeLabel) === name)
}

export function getBadgeStyle(badge?: HighlightBadge) {
  if (!badge) {
    return undefined
  }

  const style: Record<string, string> = {}

  if (badge.badgeBackgroundColor) {
    style['--badge-background-color'] = badge.badgeBackgroundColor
  }

  if (badge.badgeTextColor) {
    style['--badge-text-color'] = badge.badgeTextColor
  }

  return Object.keys(style).length ? (style as CSSProperties) : undefined
}
