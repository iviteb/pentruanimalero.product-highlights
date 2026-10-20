import type { CSSProperties, ReactNode } from 'react'

declare global {
  // Highlights

  type HighlightType = 'collection' | 'promotion' | 'teaser'

  type ProductHighlight = {
    id?: string
    name: string
  }

  type HighlightFilter = {
    type: 'hide' | 'show'
    highlightNames: string[]
  }

  type ProductHighlightContextValue = {
    highlight: ProductHighlight
    type: HighlightType
    badgeStyle?: CSSProperties
  }

  // Component props

  type ProductHighlightsProps = {
    filter?: HighlightFilter
    type?: HighlightType
    children: NonNullable<ReactNode>
  }

  type ProductHighlightTextProps = {
    message: string
    markers?: string[]
    blockClass?: string
    link?: string
  }

  type ProductHighlightWrapperProps = {
    blockClass?: string
    children: ReactNode
  }

  type HighlightMessageValues = {
    highlightName: ReactNode
  }

  // App settings

  type HighlightBadge = {
    badgeLabel: string
    badgeBackgroundColor?: string
    badgeTextColor?: string
  }

  type AppSettings = {
    highlightBadges?: HighlightBadge[]
  }
}
