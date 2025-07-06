export interface ICategoryOrTag {
  id: number
  name: string
}

export interface IProductImage {
  id: number
  src: string
  alt: string
}

export interface IProduct {
  _id?: string
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_modified: string
  price: string
  regular_price: string
  sale_price: string
  sku: string
  stock_quantity?: number
  stock_status: string
  description: string
  short_description: string
  categories: ICategoryOrTag[]
  tags: ICategoryOrTag[]
  images: IProductImage[]
}

export interface IProductWithOrderCount extends IProduct {
  orderCount: number
}
