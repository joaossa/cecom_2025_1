/*
  Warnings:

  - You are about to drop the column `cidade` on the `cecom.enderecos` table. All the data in the column will be lost.
  - Added the required column `cdCidade` to the `cecom.enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE cecom.enderecos DROP COLUMN "cidade",
ADD COLUMN     "cdCidade" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE cecom.enderecos ADD CONSTRAINT enderecos_cdCidade_fkey FOREIGN KEY ("cdCidade") REFERENCES cecom.cidades("id") ON DELETE RESTRICT ON UPDATE CASCADE;
