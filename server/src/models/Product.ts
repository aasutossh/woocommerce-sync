import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: Date;
  date_modified: Date;
  price: string;
  regular_price: string;
  sale_price: string;
  sku: string;
  stock_quantity?: number;
  stock_status: string;
  description: string;
  short_description: string;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  images: { id: number; src: string; alt: string }[];
}

const ProductSchema = new Schema<IProduct>({
  id: { type: Number, required: true, unique: true },
  name: String,
  slug: String,
  permalink: String,
  date_created: Date,
  date_modified: Date,
  price: String,
  regular_price: String,
  sale_price: String,
  sku: String,
  stock_quantity: Number,
  stock_status: String,
  description: String,
  short_description: String,
  categories: [
    {
      id: Number,
      name: String,
    },
  ],
  tags: [
    {
      id: Number,
      name: String,
    },
  ],
  images: [
    {
      id: Number,
      src: String,
      alt: String,
    },
  ],
});

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
