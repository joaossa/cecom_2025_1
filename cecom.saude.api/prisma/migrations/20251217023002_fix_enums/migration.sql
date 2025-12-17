/*
  Warnings:

  - The values [SMARTWATCH] on the enum `OrigemAfericao` will be removed. If these variants are still used in the database, this will fail.
  - The values [ORTHOSTATIC] on the enum `PosicaoPaciente` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrigemAfericao_new" AS ENUM ('MANUAL', 'OXIMETRO', 'BALANCA', 'RELOGIO_INTELIGENTE', 'MONITOR_HOSPITALAR');
ALTER TABLE "cecom"."cecom.sinaisvitais" ALTER COLUMN "origem" DROP DEFAULT;
ALTER TABLE "cecom.sinaisvitais" ALTER COLUMN "origem" TYPE "OrigemAfericao_new" USING ("origem"::text::"OrigemAfericao_new");
ALTER TYPE "OrigemAfericao" RENAME TO "OrigemAfericao_old";
ALTER TYPE "OrigemAfericao_new" RENAME TO "OrigemAfericao";
DROP TYPE "cecom"."OrigemAfericao_old";
ALTER TABLE "cecom.sinaisvitais" ALTER COLUMN "origem" SET DEFAULT 'MANUAL';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PosicaoPaciente_new" AS ENUM ('SENTADO', 'DEITADO', 'ORTOSTATICO', 'EM_PE');
ALTER TABLE "cecom.sinaisvitais" ALTER COLUMN "posicao" TYPE "PosicaoPaciente_new" USING ("posicao"::text::"PosicaoPaciente_new");
ALTER TYPE "PosicaoPaciente" RENAME TO "PosicaoPaciente_old";
ALTER TYPE "PosicaoPaciente_new" RENAME TO "PosicaoPaciente";
DROP TYPE "cecom"."PosicaoPaciente_old";
COMMIT;
