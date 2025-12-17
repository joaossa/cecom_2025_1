/*
  Warnings:

  - You are about to drop the `cecom.tiposevolucoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE cecom.sinaisvitais ALTER COLUMN "temperatura" SET DATA TYPE DECIMAL,
ALTER COLUMN "peso" SET DATA TYPE DECIMAL,
ALTER COLUMN "altura" SET DATA TYPE DECIMAL,
ALTER COLUMN "imc" SET DATA TYPE DECIMAL;

-- DropTable
DROP TABLE cecom.tiposevolucoes;

-- CreateTable
CREATE TABLE cecom.tiposevolucaosimples (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT tiposevolucaosimples_pkey PRIMARY KEY ("id")
);
