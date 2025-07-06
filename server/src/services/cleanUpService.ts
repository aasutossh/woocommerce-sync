import { env } from "../env";
import { OrderModel } from "../models/Order";
import { ProductModel } from "../models/Product";
import { fetchOrders } from "../services/woocommerce";

export const cleanupOldOrders = async () => {
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - env.ORDER_DELETION_THRESHOLD_DAYS);
  const thresholdISO = threshold.toISOString();

  let page = 1;
  let keepFetching = true;

  while (keepFetching) {
    const { data: orders } = await fetchOrders({
      per_page: 100,
      page,
      before: thresholdISO,
    });

    if (!orders.length) {
      keepFetching = false;
      break;
    }

    for (const order of orders) {
      const localOrder = await OrderModel.findOne({ id: order.id });
      if (!localOrder) continue;

      const { line_items } = localOrder;

      await OrderModel.deleteOne({ id: order.id });

      for (const item of line_items) {
        const productStillUsed = await OrderModel.findOne({
          "line_items.product_id": item.product_id,
        });

        if (!productStillUsed) {
          await ProductModel.deleteOne({ id: item.product_id });
        }
      }
    }

    page++;
  }
};
