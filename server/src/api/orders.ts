import express from "express";

import { IOrder, OrderModel } from "../models/Order";
import { FilterQuery, SortOrder } from "mongoose";

import { Types } from "mongoose";
import { escapeRegExp } from "../utils/helpers";
import { OrderQueryParams, OrdersRouteResponse } from "../interfaces/response";

const router = express.Router();

router.get<object, OrdersRouteResponse>("/", async (req, res) => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
      status,
      sortBy = "date_created",
      sortOrder = "desc",
      product_id,
    } = req.query as OrderQueryParams;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query: FilterQuery<IOrder> = {};

    const trimmedSearch = search?.trim();

    if (trimmedSearch) {
      const escapedSearch = escapeRegExp(trimmedSearch);
      const conditions: FilterQuery<IOrder>[] = [];

      const isNumeric = /^\d+$/.test(escapedSearch);

      if (isNumeric) {
        conditions.push({ id: parseInt(escapedSearch) });
      }

      if (Types.ObjectId.isValid(escapedSearch)) {
        conditions.push({ _id: new Types.ObjectId(escapedSearch) });
      }

      // Add search_text condition if you're using it
      conditions.push({
        search_text: { $regex: escapedSearch, $options: "i" },
      });

      query.$or = conditions;
    }

    if (status) {
      query.status = status;
    }

    if (product_id) {
      const productId = parseInt(product_id as string);
      query["line_items.product_id"] = productId;
    }

    const sortOptions: Record<string, SortOrder> = {
      [sortBy === "total" ? "totalAsNumber" : sortBy]:
        sortOrder === "asc" ? 1 : -1,
    };

    const total = await OrderModel.countDocuments(query);
    const orders = await OrderModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: orders,
    });
  } catch (err: any) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
