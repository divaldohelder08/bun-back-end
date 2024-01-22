import { db } from "@/db/connection";
import { and, count, eq } from "drizzle-orm";
import Elysia from "elysia";
import { orderItems, orders, products } from "schema";
import { authentication } from "../authentication";

export const getPopularProducts = new Elysia()
  .use(authentication)
  .get("/metrics/popular-products", async ({ getManagedRestaurantId }) => {
    const restaurantId = await getManagedRestaurantId();

    try {
      const popularProducts = await db
        .select({
          product: products.name,
          amount: count(orderItems.id),
        })
        .from(orderItems)
        .leftJoin(orders, eq(orders.id, orderItems.orderId))
        .leftJoin(products, eq(products.id, orderItems.productId))
        .where(and(eq(orders.restaurantId, restaurantId)))
        .groupBy(products.name)
        .limit(5);

      return popularProducts;
    } catch (err) {
      console.log(err);
    }
  });
