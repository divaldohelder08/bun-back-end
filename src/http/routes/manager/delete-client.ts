import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const deleteClient = new Elysia().get(
  "/delete-client/:id",
  async ({ params }) => {
    const { id } = params;

    // Verifica se o cliente existe
    const existingClient = await db.cliente.findFirst({
      where: { id },
    });

    if (!existingClient) {
      throw new Error("Cliente não existe");
    }

    console.table(existingClient); // Apenas para fins de depuração

    // Exclui o cliente
    const deletedClient = await db.cliente.delete({
      where: { id: existingClient.id },
    });

    // Pode ser útil retornar algo após a exclusão
    return { message: "Cliente excluído com sucesso", deletedClient };
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);
