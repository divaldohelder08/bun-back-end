-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('Andamento', 'Finalizada', 'NFinalizada');

-- CreateEnum
CREATE TYPE "TimeEnum" AS ENUM ('On', 'Chuva', 'Noite', 'Feriado', 'Brecha');

-- CreateTable
CREATE TABLE "Filias" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "endereco" TEXT NOT NULL,
    "status" "TimeEnum" NOT NULL DEFAULT 'On',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Filias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_links_admin" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_links_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "filialId" TEXT NOT NULL,

    CONSTRAINT "Funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motoristas" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "email" TEXT,
    "senha" VARCHAR(10) NOT NULL,
    "codigo" VARCHAR(6),
    "telefone" VARCHAR(9) NOT NULL,
    "numeroBI" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "localizacao" TEXT NOT NULL,
    "filialId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motoristas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" TEXT NOT NULL,
    "matricula" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(250) NOT NULL,
    "email" TEXT NOT NULL,
    "numeroBI" VARCHAR(30) NOT NULL,
    "avatar" TEXT,
    "endereco" TEXT NOT NULL,
    "Coordenada da casa" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "filialId" TEXT NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto dos Clientes" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contacto dos Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto das cooperativas" (
    "id" TEXT NOT NULL,
    "filialId" TEXT NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contacto das cooperativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recolhas" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "motoristaId" TEXT NOT NULL,
    "status" "StatusEnum" NOT NULL DEFAULT 'Andamento',
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recolhas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Filias_nome_key" ON "Filias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Filias_endereco_key" ON "Filias"("endereco");

-- CreateIndex
CREATE UNIQUE INDEX "auth_links_admin_code_key" ON "auth_links_admin"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_email_key" ON "Funcionarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_filialId_key" ON "Funcionarios"("filialId");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_email_key" ON "Motoristas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_telefone_key" ON "Motoristas"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_numeroBI_key" ON "Motoristas"("numeroBI");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_matricula_key" ON "Veiculo"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_numeroBI_key" ON "Clientes"("numeroBI");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_Coordenada da casa_key" ON "Clientes"("Coordenada da casa");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto dos Clientes_telefone_key" ON "Contacto dos Clientes"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto das cooperativas_telefone_key" ON "Contacto das cooperativas"("telefone");

-- AddForeignKey
ALTER TABLE "auth_links_admin" ADD CONSTRAINT "auth_links_admin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionarios" ADD CONSTRAINT "Funcionarios_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motoristas" ADD CONSTRAINT "Motoristas_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto dos Clientes" ADD CONSTRAINT "Contacto dos Clientes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto das cooperativas" ADD CONSTRAINT "Contacto das cooperativas_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolhas" ADD CONSTRAINT "Recolhas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolhas" ADD CONSTRAINT "Recolhas_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motoristas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
