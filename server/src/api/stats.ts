import express from "express";
import { OrderModel } from "../models/Order";
import { ProductModel } from "../models/Product";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [orders, products] = await Promise.all([
      OrderModel.countDocuments(),
      ProductModel.countDocuments(),
    ]);

    res.json({ orders, products });
  } catch (err: any) {
    console.error("Stats error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
