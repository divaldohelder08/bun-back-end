-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pendente', 'andamento', 'cancelado', 'finalizada');

-- CreateEnum
CREATE TYPE "FilialStatus" AS ENUM ('On', 'Chuva', 'Noite');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('superGerente', 'gerente');

-- CreateTable
CREATE TABLE "auth_link_manager" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "manager_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_link_manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manager" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "name" VARCHAR(250) NOT NULL,
    "email" TEXT NOT NULL,
    "role" "RoleEnum" NOT NULL DEFAULT 'gerente',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filias" (
    "id" TEXT NOT NULL,
    "manager_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "tel" VARCHAR(9) NOT NULL,
    "address" TEXT NOT NULL,
    "status" "FilialStatus" NOT NULL DEFAULT 'On',
    "coordenadas" DOUBLE PRECISION[] DEFAULT ARRAY[0, 0]::DOUBLE PRECISION[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_link_driver" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_link_driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veiculo" (
    "id" TEXT NOT NULL,
    "matricula" VARCHAR(11) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "filial_id" TEXT NOT NULL,
    "veiculo_id" TEXT NOT NULL,
    "numberBI" VARCHAR(13) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" TEXT NOT NULL,
    "coordenadas" DOUBLE PRECISION[] DEFAULT ARRAY[0, 0]::DOUBLE PRECISION[],
    "senha" TEXT NOT NULL,
    "tel" VARCHAR(9) NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiments" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paiments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "filial_id" TEXT NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "email" TEXT NOT NULL,
    "number_bi" VARCHAR(13) NOT NULL,
    "tel" VARCHAR(9) NOT NULL,
    "avatar" TEXT,
    "address" TEXT NOT NULL,
    "coordenadas" DOUBLE PRECISION[] DEFAULT ARRAY[0, 0]::DOUBLE PRECISION[],
    "nascimento" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recolhas" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "motorista_id" TEXT NOT NULL,
    "filial_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'andamento',
    "comment" TEXT,
    "rate" INTEGER,
    "distance" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "directions" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recolhas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_link_manager_code_key" ON "auth_link_manager"("code");

-- CreateIndex
CREATE UNIQUE INDEX "manager_code_key" ON "manager"("code");

-- CreateIndex
CREATE UNIQUE INDEX "manager_email_key" ON "manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "filias_manager_id_key" ON "filias"("manager_id");

-- CreateIndex
CREATE UNIQUE INDEX "filias_name_key" ON "filias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "filias_tel_key" ON "filias"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "filias_address_key" ON "filias"("address");

-- CreateIndex
CREATE UNIQUE INDEX "auth_link_driver_code_key" ON "auth_link_driver"("code");

-- CreateIndex
CREATE UNIQUE INDEX "veiculo_matricula_key" ON "veiculo"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "driver_code_key" ON "driver"("code");

-- CreateIndex
CREATE UNIQUE INDEX "driver_veiculo_id_key" ON "driver"("veiculo_id");

-- CreateIndex
CREATE UNIQUE INDEX "driver_numberBI_key" ON "driver"("numberBI");

-- CreateIndex
CREATE UNIQUE INDEX "driver_email_key" ON "driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "driver_tel_key" ON "driver"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_number_bi_key" ON "clientes"("number_bi");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_tel_key" ON "clientes"("tel");

-- AddForeignKey
ALTER TABLE "auth_link_manager" ADD CONSTRAINT "auth_link_manager_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filias" ADD CONSTRAINT "filias_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_link_driver" ADD CONSTRAINT "auth_link_driver_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_veiculo_id_fkey" FOREIGN KEY ("veiculo_id") REFERENCES "veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_filial_id_fkey" FOREIGN KEY ("filial_id") REFERENCES "filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiments" ADD CONSTRAINT "Paiments_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_filial_id_fkey" FOREIGN KEY ("filial_id") REFERENCES "filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recolhas" ADD CONSTRAINT "recolhas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recolhas" ADD CONSTRAINT "recolhas_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recolhas" ADD CONSTRAINT "recolhas_filial_id_fkey" FOREIGN KEY ("filial_id") REFERENCES "filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
