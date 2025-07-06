import { IOrder } from "../models/Order";
import { IProduct } from "../models/Product";

export type OrdersResponse = {
  total: number;
  page: number;
  limit: number;
  data: IOrder[];
};

type ErrorResponse = {
  message: string;
};

export type OrdersRouteResponse = OrdersResponse | ErrorResponse;

export type OrderQueryParams = {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
  sortBy?: "total" | "date_created";
  sortOrder?: "asc" | "desc";
  product_id?: string;
};
