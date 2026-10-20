import type { ProductTypes } from 'vtex.product-context'

export const getSeller = (item: ProductTypes.Item) => {
  const defaultSeller = item?.sellers?.find((seller) => seller.sellerDefault)

  if (!defaultSeller) {
    return item?.sellers?.[0]
  }

  return defaultSeller
}
