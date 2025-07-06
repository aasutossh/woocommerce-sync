import express from "express";
import { ProductModel } from "../models/Product";
import { OrderModel } from "../models/Order";

const router = express.Router();

router.get<object, any>("/", async (req, res) => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
      sortBy = "name",
      sortOrder = "asc",
    } = req.query as {
      page?: string;
      limit?: string;
      search?: string;
      sortBy?: "name" | "price";
      sortOrder?: "asc" | "desc";
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const searchRegex = new RegExp(search, "i");

    const query: any = {};

    if (search) {
      query.$or = [{ name: searchRegex }, { sku: searchRegex }];
    }

    const sortOptions: any = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const total = await ProductModel.countDocuments(query);

    const products = await ProductModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const productIds = products.map((p) => p.id); // assuming Woo product `id`, not `_id`

    const orderCounts = await OrderModel.aggregate([
      { $unwind: "$line_items" },
      { $match: { "line_items.product_id": { $in: productIds } } },
      {
        $group: {
          _id: "$line_items.product_id",
          orderCount: { $sum: 1 },
        },
      },
    ]);

    const orderCountMap: Record<number, number> = {};
    orderCounts.forEach((item) => {
      orderCountMap[item._id] = item.orderCount;
    });

    const productsWithCounts = products.map((product) => ({
      ...product.toObject(),
      orderCount: orderCountMap[product.id] || 0,
    }));

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: productsWithCounts,
    });
  } catch (err: any) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
