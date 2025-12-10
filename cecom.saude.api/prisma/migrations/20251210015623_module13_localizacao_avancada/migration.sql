/*
  Warnings:

  - You are about to drop the column `bairro` on the `cecom.enderecos` table. All the data in the column will be lost.
  - Added the required column `cdBairro` to the `cecom.enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cecom.enderecos" DROP COLUMN "bairro",
ADD COLUMN     "cdBairro" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "cecom.distritos" (
    "id" SERIAL NOT NULL,
    "cdCidade" INTEGER NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.distritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.bairros" (
    "id" SERIAL NOT NULL,
    "cdDistrito" INTEGER,
    "cdCidade" INTEGER NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.bairros_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cecom.enderecos" ADD CONSTRAINT "cecom.enderecos_cdBairro_fkey" FOREIGN KEY ("cdBairro") REFERENCES "cecom.bairros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.distritos" ADD CONSTRAINT "cecom.distritos_cdCidade_fkey" FOREIGN KEY ("cdCidade") REFERENCES "cecom.cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.bairros" ADD CONSTRAINT "cecom.bairros_cdDistrito_fkey" FOREIGN KEY ("cdDistrito") REFERENCES "cecom.distritos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.bairros" ADD CONSTRAINT "cecom.bairros_cdCidade_fkey" FOREIGN KEY ("cdCidade") REFERENCES "cecom.cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
