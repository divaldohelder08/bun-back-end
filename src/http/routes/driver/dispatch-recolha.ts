// import { db } from "@/db/connection";
// import Elysia from "elysia";
// import { UnauthorizedError } from "../Errors";
// import { authentication } from "./authentication";

// export const getAllRecolha = new Elysia()
//   .use(authentication)
//   .get("/me", async ({ getUser, set }) => {
//     // http://localhost:3333/recolha/clpiie2ge0004m9pklba5jjyc
//     const { filialId, id } = await getUser();
//     if (!filialId || !id) {
//       set.status = 401;

//       throw new UnauthorizedError();
//     }

//     const baseQuery = db.recolha.findMany({
//       where: {
//         filialId,
//         driverId: id,
//         status: "pendente",
//       },
//       orderBy: {
//         createdAt: "asc",
//       },
//       select: {
//         id:true,
//         createdAt: true,
//         cliente: {
//           select: {
//             id: true,
//             name: true,
//             avatar: true,
//             coordenadas: true,
//             email: true,
//             tel: true,
//             address: true,
//           },
//         },
//         driver: {
//           select: {
//             coordenadas: true,
//           },
//         },
//       },
//     });

//     // const [ordersCount] = await db
//     //   .select({ count: count() })
//     //   .from(baseQuery.as("baseQuery"));

//     // const allOrders = await baseQuery
//     //   .offset(pageIndex * 10)
//     //   .limit(10)
//     //   .orderBy((fields) => {
//     //     return [
//     //       sql`CASE ${fields.status}
//     //         WHEN 'pending' THEN 1
//     //         WHEN 'processing' THEN 2
//     //         WHEN 'delivering' THEN 3
//     //         WHEN 'delivered' THEN 4
//     //         WHEN 'canceled' THEN 99
//     //       END`,
//     //       desc(fields.createdAt),
//     //     ];
//     //   });

//     // const result = {
//     //   orders: allOrders,
//     //   meta: {
//     //     pageIndex,
//     //     perPage: 10,
//     //     totalCount: ordersCount.count,
//     //   },
//     // };

//     return result;

//     if (!driver) {
//       throw new Error("Motorista não encontrado.");
//     }

//     return driver;
//   });
