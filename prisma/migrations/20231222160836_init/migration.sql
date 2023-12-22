-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Andamento', 'Finalizada', 'NFinalizada');

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
    "nome" VARCHAR(250) NOT NULL,
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
    "nome" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "endereco" TEXT NOT NULL,
    "status" "FilialStatus" NOT NULL DEFAULT 'On',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" TEXT NOT NULL,
    "matricula" VARCHAR(8) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motoristas" (
    "id" TEXT NOT NULL,
    "filial_id" TEXT NOT NULL,
    "numero_bi" VARCHAR(13) NOT NULL,
    "veicolo_id" TEXT NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "email" TEXT,
    "coordenadas" DOUBLE PRECISION[],
    "senha" TEXT NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motoristas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL,
    "filial_id" TEXT NOT NULL,
    "nome" VARCHAR(250) NOT NULL,
    "email" TEXT NOT NULL,
    "numero_bi" VARCHAR(13) NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "avatar" TEXT,
    "endereco" TEXT NOT NULL,
    "coordenadas" DOUBLE PRECISION[],
    "nascimento" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recolhas" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "motorista_id" TEXT NOT NULL,
    "filial_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Andamento',
    "coordenadas" DOUBLE PRECISION[],
    "descricao" TEXT,
    "distance" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "directions" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recolhas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_link_manager_code_key" ON "auth_link_manager"("code");

-- CreateIndex
CREATE UNIQUE INDEX "manager_email_key" ON "manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "filias_manager_id_key" ON "filias"("manager_id");

-- CreateIndex
CREATE UNIQUE INDEX "filias_nome_key" ON "filias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "filias_telefone_key" ON "filias"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "filias_endereco_key" ON "filias"("endereco");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_matricula_key" ON "Veiculo"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_numero_bi_key" ON "Motoristas"("numero_bi");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_veicolo_id_key" ON "Motoristas"("veicolo_id");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_email_key" ON "Motoristas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_telefone_key" ON "Motoristas"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_numero_bi_key" ON "Clientes"("numero_bi");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_telefone_key" ON "Clientes"("telefone");

-- AddForeignKey
ALTER TABLE "auth_link_manager" ADD CONSTRAINT "auth_link_manager_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filias" ADD CONSTRAINT "filias_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motoristas" ADD CONSTRAINT "Motoristas_filial_id_fkey" FOREIGN KEY ("filial_id") REFERENCES "filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motoristas" ADD CONSTRAINT "Motoristas_veicolo_id_fkey" FOREIGN KEY ("veicolo_id") REFERENCES "Veiculo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_filial_id_fkey" FOREIGN KEY ("filial_id") REFERENCES "filias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolhas" ADD CONSTRAINT "Recolhas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolhas" ADD CONSTRAINT "Recolhas_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "Motoristas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolhas" ADD CONSTRAINT "Recolhas_filial_id_fkey" FOREIGN KEY ("filial_id") REFERENCES "filias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
