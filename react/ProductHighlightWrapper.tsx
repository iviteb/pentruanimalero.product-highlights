import type { FC } from 'react'
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useHighlight } from './ProductHighlights'
import { getHighlightDataAttributes } from './modules/badge'

const CSS_HANDLES = ['productHighlightWrapper'] as const

const ProductHighlightWrapper: FC<ProductHighlightWrapperProps> = ({
  children,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const value = useHighlight()

  if (!value) {
    return null
  }

  return (
    <div
      {...getHighlightDataAttributes(value)}
      className={handles.productHighlightWrapper}
      style={value.badgeStyle}
    >
      {children}
    </div>
  )
}

export default ProductHighlightWrapper
