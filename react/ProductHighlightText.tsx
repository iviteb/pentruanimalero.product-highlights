import type { FC } from 'react'
import React, { useMemo } from 'react'
import { IOMessageWithMarkers, formatIOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'
import { useIntl } from 'react-intl'

import { useHighlight } from './ProductHighlights'
import { getHighlightDataAttributes } from './modules/badge'

const CSS_HANDLES = ['productHighlightText'] as const

const ProductHighlightText: FC<ProductHighlightTextProps> = ({
  message = '',
  markers = [],
  link = '',
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const value = useHighlight()
  const intl = useIntl()

  const values = useMemo<HighlightMessageValues>(() => {
    if (!value) {
      return { highlightName: '' }
    }

    const Tag = link ? 'a' : 'span'
    const href = link
      ? (formatIOMessage(
          {
            intl,
            id: link,
          },
          {
            highlightId: value.highlight.id ?? '',
            highlightName: value.highlight.name,
          }
        ) as string)
      : undefined

    return {
      highlightName: (
        <Tag
          key={link ? 'highlightLink' : 'highlightName'}
          href={href}
          {...getHighlightDataAttributes(value)}
          className={handles.productHighlightText}
          style={value.badgeStyle}
        >
          {value.highlight.name}
        </Tag>
      ),
    }
  }, [value, link, intl, handles.productHighlightText])

  if (!value || !message) {
    return null
  }

  return (
    <IOMessageWithMarkers
      handleBase="productHighlightText"
      message={message}
      markers={markers}
      values={values}
    />
  )
}

export default ProductHighlightText
