-- CreateEnum
CREATE TYPE "HumorIntensidade" AS ENUM ('1', '2', '3', '4', '5');

-- AlterTable
ALTER TABLE cecom.evolucoes ADD COLUMN     "agravamento" BOOLEAN DEFAULT false,
ADD COLUMN     "alertaRisco" BOOLEAN DEFAULT false,
ADD COLUMN     "cdTipoEvolucaoClinica" INTEGER,
ADD COLUMN     "humor" "HumorIntensidade",
ADD COLUMN     "textoEstruturado" JSONB;

-- CreateTable
CREATE TABLE cecom.evolucoescid (
    "id" SERIAL NOT NULL,
    "cdEvolucao" INTEGER NOT NULL,
    "cdCid" INTEGER NOT NULL,

    CONSTRAINT evolucoescid_pkey PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE cecom.evolucoesdsm (
    "id" SERIAL NOT NULL,
    "cdEvolucao" INTEGER NOT NULL,
    "cdDsm" INTEGER NOT NULL,

    CONSTRAINT evolucoesdsm_pkey PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE cecom.evolucoes ADD CONSTRAINT evolucoes_cdTipoEvolucaoClinica_fkey FOREIGN KEY ("cdTipoEvolucaoClinica") REFERENCES cecom.tiposevolucoesclinicas("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE cecom.evolucoescid ADD CONSTRAINT evolucoescid_cdEvolucao_fkey FOREIGN KEY ("cdEvolucao") REFERENCES cecom.evolucoes("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE cecom.evolucoescid ADD CONSTRAINT evolucoescid_cdCid_fkey FOREIGN KEY ("cdCid") REFERENCES cecom.cid("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE cecom.evolucoesdsm ADD CONSTRAINT evolucoesdsm_cdEvolucao_fkey FOREIGN KEY ("cdEvolucao") REFERENCES cecom.evolucoes("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE cecom.evolucoesdsm ADD CONSTRAINT evolucoesdsm_cdDsm_fkey FOREIGN KEY ("cdDsm") REFERENCES cecom.dsm("id") ON DELETE RESTRICT ON UPDATE CASCADE;
