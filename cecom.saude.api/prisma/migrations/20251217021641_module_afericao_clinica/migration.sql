/*
  Warnings:

  - You are about to drop the `escalasdor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `glasgow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cecom.sinaisvitais" DROP CONSTRAINT "sinaisvitais_escaladorid_fkey";

-- DropForeignKey
ALTER TABLE "glasgow" DROP CONSTRAINT "glasgow_cdatendimento_fkey";

-- DropForeignKey
ALTER TABLE "glasgow" DROP CONSTRAINT "glasgow_cdprof_fkey";

-- DropTable
DROP TABLE "escalasdor";

-- DropTable
DROP TABLE "glasgow";

-- CreateTable
CREATE TABLE "cecom.escalasdor" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(300),

    CONSTRAINT "cecom.escalasdor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.glasgow" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "cdProf" INTEGER,
    "data" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ocular" INTEGER NOT NULL,
    "verbal" INTEGER NOT NULL,
    "motora" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "observacao" VARCHAR(300),

    CONSTRAINT "cecom.glasgow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.afericoesclinicas" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "cdProf" INTEGER,
    "escala" VARCHAR(50) NOT NULL,
    "idRegistro" INTEGER NOT NULL,
    "data" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cecom.afericoesclinicas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cecom.glasgow_cdAtendimento_idx" ON "cecom.glasgow"("cdAtendimento");

-- CreateIndex
CREATE INDEX "cecom.glasgow_cdProf_idx" ON "cecom.glasgow"("cdProf");

-- CreateIndex
CREATE INDEX "cecom.afericoesclinicas_cdAtendimento_idx" ON "cecom.afericoesclinicas"("cdAtendimento");

-- CreateIndex
CREATE INDEX "cecom.afericoesclinicas_escala_idx" ON "cecom.afericoesclinicas"("escala");

-- AddForeignKey
ALTER TABLE "cecom.sinaisvitais" ADD CONSTRAINT "cecom.sinaisvitais_escalaDorId_fkey" FOREIGN KEY ("escalaDorId") REFERENCES "cecom.escalasdor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.glasgow" ADD CONSTRAINT "cecom.glasgow_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "cecom.atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.glasgow" ADD CONSTRAINT "cecom.glasgow_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.afericoesclinicas" ADD CONSTRAINT "cecom.afericoesclinicas_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "cecom.atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.afericoesclinicas" ADD CONSTRAINT "cecom.afericoesclinicas_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;
