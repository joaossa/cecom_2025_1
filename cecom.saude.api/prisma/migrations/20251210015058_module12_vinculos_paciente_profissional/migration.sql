-- AlterTable
ALTER TABLE "cecom.evolucoes" ADD COLUMN     "pacienteCdMaster" INTEGER,
ADD COLUMN     "pacienteCdPaciente" INTEGER;

-- AlterTable
ALTER TABLE "cecom.pacientes" ADD COLUMN     "cdEscolaridade" INTEGER,
ADD COLUMN     "cdOcupacao" INTEGER;

-- AlterTable
ALTER TABLE "cecom.profissionais" ADD COLUMN     "cdOcupacao" INTEGER;

-- AddForeignKey
ALTER TABLE "cecom.pacientes" ADD CONSTRAINT "cecom.pacientes_cdEscolaridade_fkey" FOREIGN KEY ("cdEscolaridade") REFERENCES "cecom.escolaridades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.pacientes" ADD CONSTRAINT "cecom.pacientes_cdOcupacao_fkey" FOREIGN KEY ("cdOcupacao") REFERENCES "cecom.ocupacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.profissionais" ADD CONSTRAINT "cecom.profissionais_cdOcupacao_fkey" FOREIGN KEY ("cdOcupacao") REFERENCES "cecom.ocupacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoes" ADD CONSTRAINT "cecom.evolucoes_pacienteCdMaster_pacienteCdPaciente_fkey" FOREIGN KEY ("pacienteCdMaster", "pacienteCdPaciente") REFERENCES "cecom.pacientes"("cdMaster", "cdPaciente") ON DELETE SET NULL ON UPDATE CASCADE;
