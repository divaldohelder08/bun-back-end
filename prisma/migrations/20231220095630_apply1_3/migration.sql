/*
  Warnings:

  - You are about to drop the column `Coordenada da casa` on the `Clientes` table. All the data in the column will be lost.
  - You are about to drop the `Contacto das cooperativas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacto dos Clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_links_admin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[telefone]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefone]` on the table `Filias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lat` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Filias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `directions` to the `Recolhas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distance` to the `Recolhas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Recolhas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Recolhas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Recolhas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contacto das cooperativas" DROP CONSTRAINT "Contacto das cooperativas_filialId_fkey";

-- DropForeignKey
ALTER TABLE "Contacto dos Clientes" DROP CONSTRAINT "Contacto dos Clientes_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "auth_links_admin" DROP CONSTRAINT "auth_links_admin_adminId_fkey";

-- DropIndex
DROP INDEX "Clientes_Coordenada da casa_key";

-- AlterTable
ALTER TABLE "Clientes" DROP COLUMN "Coordenada da casa",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "telefone" VARCHAR(9) NOT NULL;

-- AlterTable
ALTER TABLE "Filias" ADD COLUMN     "telefone" VARCHAR(9) NOT NULL;

-- AlterTable
ALTER TABLE "Recolhas" ADD COLUMN     "directions" JSONB NOT NULL,
ADD COLUMN     "distance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Contacto das cooperativas";

-- DropTable
DROP TABLE "Contacto dos Clientes";

-- DropTable
DROP TABLE "auth_links_admin";

-- CreateTable
CREATE TABLE "authLinksAdmin" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authLinksAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authLinksAdmin_code_key" ON "authLinksAdmin"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_telefone_key" ON "Clientes"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Filias_telefone_key" ON "Filias"("telefone");

-- AddForeignKey
ALTER TABLE "authLinksAdmin" ADD CONSTRAINT "authLinksAdmin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
