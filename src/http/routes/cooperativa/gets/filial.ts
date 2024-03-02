import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia from "elysia";
export const getFilial = new Elysia().get("/filial", async () => {
  // const today = dayjs();
  // const weekAgo = today.subtract(1, "week");
  return await db.filial.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      manager: {
        select: {
          name: true,
          avatar: true,
        },
      },
      address: true,
      _count: true,
    },
  });
});
// const valor = await db.recolha.groupBy({
//   by: ["createdAt"],
//   where: {
//     createdAt: { gt: weekAgo }
//   },
//   _count: true,
// });

//  valor.map((e) => {
//   return {
//     recolhas: e._count,
//     data: e.createdAt.toLocaleDateString("US",{
//       month: "short",
//       day: "numeric",
//     }),
//   };
// });
// return await db.filial.groupBy({
//   by:["name"],
//   where:{

//   },
//   select: {
//     id: true,
//     name: true,
//     status: true,
//     manager: {
//       select: {
//         name: true,
//       },
//     },
//     address: true,
//     _count: true,
//   },
// })
