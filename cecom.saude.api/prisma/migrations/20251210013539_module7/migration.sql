-- CreateEnum
CREATE TYPE "TipoParentesco" AS ENUM ('P', 'M', 'T', 'F', 'C', 'O', 'R');

-- CreateTable
CREATE TABLE "cecom.pessoasrelacionadas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "telefone" VARCHAR(20),
    "stInativo" "SimNao",

    CONSTRAINT "cecom.pessoasrelacionadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.parentescospacientes" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdPessoa" INTEGER NOT NULL,
    "tipo" "TipoParentesco" NOT NULL,

    CONSTRAINT "cecom.parentescospacientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cecom.parentescospacientes" ADD CONSTRAINT "cecom.parentescospacientes_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "cecom.pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.parentescospacientes" ADD CONSTRAINT "cecom.parentescospacientes_cdPessoa_fkey" FOREIGN KEY ("cdPessoa") REFERENCES "cecom.pessoasrelacionadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
