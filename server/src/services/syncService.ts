import { fetchOrders, fetchProductById } from "./woocommerce";
import { ILineItem, IOrder, OrderModel } from "../models/Order";
import { ProductModel } from "../models/Product";
import { env } from "../env";

function generateSearchText(order: IOrder): string {
  const billing = `${order.billing?.first_name ?? ""} ${order.billing?.last_name ?? ""}`;
  const shipping = `${order.shipping?.first_name ?? ""} ${order.shipping?.last_name ?? ""}`;
  const products =
    order.line_items?.map((item: ILineItem) => item.name).join(" ") ?? "";
  const number = order.number ?? "";

  return `${billing} ${shipping} ${products} ${number}`.toLowerCase().trim();
}

export const syncOrders = async () => {
  const orderAfterDays = new Date();
  orderAfterDays.setDate(orderAfterDays.getDate() - env.ORDER_LOOKBACK_DAYS);

  let page = 1;
  let keepFetching = true;

  while (keepFetching) {
    const { data: orders } = await fetchOrders({
      per_page: 100,
      page,
      after: orderAfterDays.toISOString(),
    });

    if (!orders.length) {
      keepFetching = false;
      break;
    }

    for (const order of orders) {
      const relevantFields = {
        id: order.id,
        number: order.number,
        order_key: order.order_key,
        status: order.status,
        date_created: order.date_created,
        date_modified: order.date_modified,
        total: order.total,
        customer_id: order.customer_id,
        customer_note: order.customer_note,
        billing: order.billing,
        shipping: order.shipping,
        line_items: order.line_items,
        search_text: generateSearchText(order),

        totalAsNumber: parseFloat(order.total),
      };

      await OrderModel.updateOne(
        { id: order.id },
        { $set: relevantFields },
        { upsert: true },
      );

      for (const item of order.line_items) {
        const existing = await ProductModel.findOne({ id: item.product_id });
        if (!existing && item.product_id) {
          try {
            const { data: product } = await fetchProductById(item.product_id);
            await ProductModel.create(product);
          } catch (err: unknown) {
            if (err instanceof Error) {
              console.error(
                `Failed to fetch product ${item.product_id}`,
                err.message,
              );
            } else {
              console.error(
                `Failed to fetch product ${item.product_id}`,
                "Unknown error",
              );
            }
          }
        }
      }
    }

    page++;
  }
};
