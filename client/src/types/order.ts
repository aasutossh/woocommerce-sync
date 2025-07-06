export interface IBillingShipping {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2?: string
  city: string
  state: string
  postcode: string
  country: string
  email?: string
  phone?: string
}

export interface IMetadata {
  id: number
  key: string
  value: string
}

export interface ITaxes {
  id: number
  rate_code: string
  rate_id: number
  label: string
  compound: boolean
  tax_total: string
  shipping_tax_total: string
  meta_data: IMetadata[]
}

export interface ILineItem {
  id: number
  name: string
  product_id: number
  variation_id?: number
  quantity: number
  tax_class?: string
  subtotal: string
  subtotal_tax: string
  total: string
  total_tax: string
  taxes: ITaxes[]
  meta_data: IMetadata[]
  sku?: string
  price?: number

  images?: {
    id: number
    src: string
    name?: string
    alt?: string
  }[]
}

export interface IOrder {
  _id?: string
  id: number
  number: string
  order_key: string
  status: string
  date_created: string
  total: string
  customer_id: number
  customer_note: string
  billing: IBillingShipping
  shipping: IBillingShipping
  line_items: ILineItem[]
  search_text: string
}
