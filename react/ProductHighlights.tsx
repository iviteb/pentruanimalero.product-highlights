import type { FC } from 'react'
import React, { useContext, useMemo } from 'react'
import { defineMessages } from 'react-intl'
import type { ProductTypes } from 'vtex.product-context'
import { useProduct } from 'vtex.product-context'

import { getSeller } from './modules/seller'
import { createBadgeStyleMap, normalizeHighlightName } from './modules/badge'
import useAppSettings from './hooks/useAppSettings'

const defaultFilter: HighlightFilter = {
  type: 'hide',
  highlightNames: [],
}

const createFilterHighlight =
  (filter: HighlightFilter) => (highlight: ProductHighlight) => {
    const hasHighlight =
      filter.highlightNames?.includes(highlight.name) ?? false

    if (filter.type === 'hide') {
      return !hasHighlight
    }

    if (filter.type === 'show') {
      return hasHighlight
    }

    return true
  }

const getHighlightsByType = (
  type: HighlightType,
  product?: ProductTypes.Product | null,
  seller?: ProductTypes.Seller | null
): ProductHighlight[] => {
  switch (type) {
    case 'collection':
      return product?.clusterHighlights ?? []

    case 'promotion':
      return seller?.commertialOffer?.discountHighlights ?? []

    case 'teaser':
      return seller?.commertialOffer?.teasers ?? []

    default:
      return []
  }
}

const ProductHighlightContext =
  React.createContext<ProductHighlightContextValue | null>(null)

const ProductHighlightContextProvider: FC<ProductHighlightContextValue> = ({
  highlight,
  type,
  badgeStyle,
  children,
}) => {
  const contextValue = useMemo(
    () => ({
      highlight,
      type,
      badgeStyle,
    }),
    [highlight, type, badgeStyle]
  )

  return (
    <ProductHighlightContext.Provider value={contextValue}>
      {children}
    </ProductHighlightContext.Provider>
  )
}

const ProductHighlights = ({
  filter = defaultFilter,
  type = 'collection',
  children,
}: ProductHighlightsProps) => {
  const { product, selectedItem } = useProduct() ?? {}
  const { settings } = useAppSettings()
  const badgeStyles = useMemo(
    () => createBadgeStyleMap(settings.highlightBadges),
    [settings.highlightBadges]
  )

  const selectedSku = selectedItem ?? product?.items?.[0]
  const seller: ProductTypes.Seller | null = selectedSku
    ? getSeller(selectedSku)
    : null

  const highlights = useMemo(
    () =>
      getHighlightsByType(type, product, seller).filter(
        createFilterHighlight(filter)
      ),
    [filter, product, seller, type]
  )

  if (!product) {
    return null
  }

  return (
    <>
      {highlights.map((highlight, index) => (
        <ProductHighlightContextProvider
          key={`${highlight.name}-${index}`}
          type={type}
          highlight={highlight}
          badgeStyle={badgeStyles.get(normalizeHighlightName(highlight.name))}
        >
          {children}
        </ProductHighlightContextProvider>
      ))}
    </>
  )
}

const messages = defineMessages({
  Filter: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.filter',
  },
  QueryType: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.type',
  },
  Collection: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.type.collection',
  },
  Promotion: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.type.promotion',
  },
  Teaser: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.type.teaser',
  },
  Type: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.filter.type',
  },
  Hide: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.filter.type.hide',
  },
  Show: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.filter.type.show',
  },
  HighlightNames: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.filter.highlight-names',
  },
  HighlightName: {
    defaultMessage: '',
    id: 'admin/editor.product-highlights.filter.highlight-names.item',
  },
})

ProductHighlights.schema = {
  title: 'Product Highlights',
  type: 'object',
  properties: {
    filter: {
      title: messages.Filter.id,
      type: 'object',
      properties: {
        type: {
          title: messages.Type.id,
          type: 'string',
          enum: ['hide', 'show'],
          enumNames: [messages.Hide.id, messages.Show.id],
        },
        highlightNames: {
          title: messages.HighlightNames.id,
          type: 'array',
          minItems: 0,
          maxItems: 5,
          items: {
            title: messages.HighlightName.id,
            type: 'string',
            default: '',
          },
        },
      },
    },
    type: {
      title: messages.QueryType.id,
      type: 'string',
      enum: ['collection', 'promotion', 'teaser'],
      enumNames: [
        messages.Collection.id,
        messages.Promotion.id,
        messages.Teaser.id,
      ],
    },
  },
}

export const useHighlight = () => {
  const group = useContext(ProductHighlightContext)

  return group
}

export default ProductHighlights
