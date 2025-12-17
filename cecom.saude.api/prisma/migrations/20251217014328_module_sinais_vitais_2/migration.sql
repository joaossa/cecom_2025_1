/*
  Warnings:

  - You are about to drop the column `dispositivoId` on the `cecom.sinaisvitais` table. All the data in the column will be lost.
  - You are about to drop the column `metadados` on the `cecom.sinaisvitais` table. All the data in the column will be lost.
  - You are about to drop the column `metodoColeta` on the `cecom.sinaisvitais` table. All the data in the column will be lost.
  - You are about to drop the column `pam` on the `cecom.sinaisvitais` table. All the data in the column will be lost.
  - You are about to drop the column `riscoClinico` on the `cecom.sinaisvitais` table. All the data in the column will be lost.
  - You are about to alter the column `paSistolica` on the `cecom.sinaisvitais` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `paDiastolica` on the `cecom.sinaisvitais` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `fc` on the `cecom.sinaisvitais` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `fr` on the `cecom.sinaisvitais` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `temperatura` on the `cecom.sinaisvitais` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(4,1)`.
  - You are about to alter the column `spo2` on the `cecom.sinaisvitais` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `peso` on the `cecom.sinaisvitais` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(5,2)`.
  - You are about to alter the column `altura` on the `cecom.sinaisvitais` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(4,2)`.
  - You are about to alter the column `imc` on the `cecom.sinaisvitais` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(5,2)`.

*/
-- CreateEnum
CREATE TYPE "PosicaoPaciente" AS ENUM ('SENTADO', 'DEITADO', 'ORTHOSTATIC', 'EM_PÉ');

-- CreateEnum
CREATE TYPE "OrigemAfericao" AS ENUM ('MANUAL', 'OXIMETRO', 'BALANCA', 'SMARTWATCH', 'MONITOR_HOSPITALAR');

-- AlterTable
ALTER TABLE "cecom.sinaisvitais" DROP COLUMN "dispositivoId",
DROP COLUMN "metadados",
DROP COLUMN "metodoColeta",
DROP COLUMN "pam",
DROP COLUMN "riscoClinico",
ADD COLUMN     "dor" SMALLINT,
ADD COLUMN     "escalaDorId" INTEGER,
ADD COLUMN     "metadataRaw" JSONB,
ADD COLUMN     "origem" "OrigemAfericao" DEFAULT 'MANUAL',
ADD COLUMN     "posicao" "PosicaoPaciente",
ALTER COLUMN "paSistolica" SET DATA TYPE SMALLINT,
ALTER COLUMN "paDiastolica" SET DATA TYPE SMALLINT,
ALTER COLUMN "fc" SET DATA TYPE SMALLINT,
ALTER COLUMN "fr" SET DATA TYPE SMALLINT,
ALTER COLUMN "temperatura" SET DATA TYPE DECIMAL(4,1),
ALTER COLUMN "spo2" SET DATA TYPE SMALLINT,
ALTER COLUMN "peso" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "altura" SET DATA TYPE DECIMAL(4,2),
ALTER COLUMN "imc" SET DATA TYPE DECIMAL(5,2);

-- CreateTable
CREATE TABLE cecom.escalasdor (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(300),

    CONSTRAINT escalasdor_pkey PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cecom.sinaisvitais" ADD CONSTRAINT sinaisvitais_escalaDorId_fkey FOREIGN KEY ("escalaDorId") REFERENCES cecom.escalasdor("id") ON DELETE SET NULL ON UPDATE CASCADE;
