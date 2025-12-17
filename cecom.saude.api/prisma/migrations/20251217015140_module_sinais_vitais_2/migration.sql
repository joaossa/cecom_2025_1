/*
  Warnings:

  - The values [EM_PÉ] on the enum `PosicaoPaciente` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PosicaoPaciente_new" AS ENUM ('SENTADO', 'DEITADO', 'ORTHOSTATIC', 'EM_PE');
ALTER TABLE "cecom.sinaisvitais" ALTER COLUMN "posicao" TYPE "PosicaoPaciente_new" USING ("posicao"::text::"PosicaoPaciente_new");
ALTER TYPE "PosicaoPaciente" RENAME TO "PosicaoPaciente_old";
ALTER TYPE "PosicaoPaciente_new" RENAME TO "PosicaoPaciente";
DROP TYPE "cecom"."PosicaoPaciente_old";
COMMIT;
