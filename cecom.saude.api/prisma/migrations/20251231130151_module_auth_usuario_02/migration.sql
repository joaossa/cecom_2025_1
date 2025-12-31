-- DropForeignKey
ALTER TABLE "cecom.usuariosauth" DROP CONSTRAINT "cecom.usuariosauth_cdMaster_cdPaciente_fkey";

-- AddForeignKey
ALTER TABLE "cecom.usuariosauth" ADD CONSTRAINT "cecom.usuariosauth_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;
