import express from "express";

import type MessageResponse from "../interfaces/message-response.js";

import orders from "./orders.js";
import products from "./products.js";
import stats from "./stats.js";

const router = express.Router();

router.get<object, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - OK",
  });
});

router.use("/orders", orders);
router.use("/products", products);
router.use("/stats", stats);

export default router;
