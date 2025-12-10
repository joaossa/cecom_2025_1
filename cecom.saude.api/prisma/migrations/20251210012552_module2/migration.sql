/*
  Warnings:

  - Added the required column `nome` to the `cecom.pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `cecom.profissionais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cecom.pacientes" ADD COLUMN     "dtNascimento" DATE,
ADD COLUMN     "nome" VARCHAR(120) NOT NULL,
ADD COLUMN     "sexo" "Sexo",
ADD COLUMN     "stInativo" "SimNao";

-- AlterTable
ALTER TABLE "cecom.profissionais" ADD COLUMN     "conselho" VARCHAR(30),
ADD COLUMN     "nome" VARCHAR(120) NOT NULL,
ADD COLUMN     "sexo" "Sexo",
ADD COLUMN     "stInativo" "SimNao";
