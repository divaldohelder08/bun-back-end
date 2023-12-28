import { db } from '@/db/connection'
import { count, desc, sql } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-typebox'
import Elysia, { t } from 'elysia'
import { orders } from 'schema'
import { authentication } from './authentication'

export const getOrders = new Elysia().use(authentication).get(
  '/orders',
  async ({ query, getCurrentDriver, set }) => {
    const { pageIndex, orderId, customerName } = query
    const { sub: driverId } = await getCurrentDriver()

    if (!driverId) {
      set.status = 401

      throw new Error('User is not a restaurant manager.')
    }

    const baseQuery = db.recolha.findMany({
      where: {
        driverId: driverId,
        status: 'pendente',
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        cliente: {
          select: {
            id: true,
            name: true,
            address: true,
            avatar: true,
            coordenadas: true,
            tel: true,
            email: true,
          },
          include: {
            _count: true,
          },
        },
        createdAt: true,

        // cliente: {
        //   id: string;
        //   nome: string;
        //   avatar: string | null;
        //   coordenadas: string;
        //   endereco: string;
        //   email: string;
        //   contacto: {
        //     telefone: string;
        //   }[];
        // };
        // createdAt: string;
        // orderId: orders.id,
        // createdAt: orders.createdAt,
        // status: orders.status,
        // total: orders.totalInCents,
      },
    })

    const [ordersCount] = await db
      .select({ count: count() })
      .from(baseQuery.as('baseQuery'))

    const allOrders = await baseQuery
      .offset(pageIndex * 10)
      .limit(10)
      .orderBy(fields => {
        return [
          sql`CASE ${fields.status} 
            WHEN 'pending' THEN 1
            WHEN 'processing' THEN 2
            WHEN 'delivering' THEN 3
            WHEN 'delivered' THEN 4
            WHEN 'canceled' THEN 99
          END`,
          desc(fields.createdAt),
        ]
      })

    const result = {
      orders: allOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: ordersCount.count,
      },
    }

    return result
  },
  {
    query: t.Object({
      customerName: t.Optional(t.String()),
      orderId: t.Optional(t.String()),
      status: t.Optional(createSelectSchema(orders).properties.status),
      pageIndex: t.Numeric({ minimum: 0 }),
    }),
  },
)
