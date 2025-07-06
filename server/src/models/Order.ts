import mongoose, { Schema, Document } from "mongoose";

export interface IBillingShipping {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface IMetadata extends Document {
  id: number;
  key: string;
  value: string;
}

export interface ITaxes extends Document {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: IMetadata[];
}

export interface ILineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id?: number;
  quantity: number;
  tax_class?: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: ITaxes[];
  meta_data: IMetadata[];
  sku?: string;
  price?: number;
}

export interface IOrder extends Document {
  id: number;
  number: string;
  order_key: string;
  status: string;
  date_created: Date;
  total: string;
  customer_id: number;
  customer_note: string;
  billing: IBillingShipping;
  shipping: IBillingShipping;
  line_items: ILineItem[];
  search_text: string;

  totalAsNumber: number;
}

const MetadataSchema = new Schema<IMetadata>({
  id: Number,
  key: String,
  value: String,
});

const TaxesSchema = new Schema<ITaxes>({
  id: Number,
  rate_code: String,
  rate_id: Number,
  label: String,
  compound: Boolean,
  tax_total: String,
  shipping_tax_total: String,
  meta_data: [MetadataSchema],
});

const AddressSchema = new Schema<IBillingShipping>(
  {
    first_name: String,
    last_name: String,
    company: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    postcode: String,
    country: String,
    email: String,
    phone: String,
  },
  { _id: false },
);

const LineItemSchema = new Schema<ILineItem>(
  {
    id: Number,
    name: String,
    product_id: Number,
    variation_id: Number,
    quantity: Number,
    tax_class: String,
    subtotal: String,
    subtotal_tax: String,
    total: String,
    total_tax: String,
    taxes: [TaxesSchema],
    meta_data: [MetadataSchema],
    sku: String,
    price: Number,
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrder>({
  id: { type: Number, required: true, unique: true },
  number: String,
  order_key: String,
  status: String,
  date_created: Date,
  total: String,
  customer_id: Number,
  customer_note: String,
  billing: AddressSchema,
  shipping: AddressSchema,
  line_items: [LineItemSchema],
  search_text: String,

  totalAsNumber: Number,
});

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
