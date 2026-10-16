import type { CSSProperties } from 'react'

export const normalizeHighlightName = (value?: string) =>
  value?.trim().toLowerCase() ?? ''

const getBadgeStyle = (badge: HighlightBadge) => {
  const style: Record<string, string> = {}

  if (badge.badgeBackgroundColor) {
    style['--badge-background-color'] = badge.badgeBackgroundColor
  }

  if (badge.badgeTextColor) {
    style['--badge-text-color'] = badge.badgeTextColor
  }

  return Object.keys(style).length ? (style as CSSProperties) : undefined
}

export const createBadgeStyleMap = (badges: HighlightBadge[] = []) => {
  const styles = new Map<string, CSSProperties>()

  badges.forEach((badge) => {
    const name = normalizeHighlightName(badge?.badgeLabel)
    const style = badge && getBadgeStyle(badge)

    if (name && style && !styles.has(name)) {
      styles.set(name, style)
    }
  })

  return styles
}

export const getHighlightDataAttributes = ({
  highlight,
  type,
}: ProductHighlightContextValue) => ({
  'data-highlight-name': highlight.name,
  'data-highlight-id': highlight.id,
  'data-highlight-type': type,
})
