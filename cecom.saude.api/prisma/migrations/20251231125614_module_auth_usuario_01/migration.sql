/*
  Warnings:

  - You are about to drop the `usuariosauth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "usuariosauth" DROP CONSTRAINT "usuariosauth_cdMaster_fkey";

-- DropForeignKey
ALTER TABLE "usuariosauth" DROP CONSTRAINT "usuariosauth_cdProfissional_fkey";

-- DropTable
DROP TABLE "usuariosauth";

-- CreateTable
CREATE TABLE "cecom.usuariosauth" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "senhaHash" VARCHAR(255) NOT NULL,
    "role" "RoleAuth" NOT NULL DEFAULT 'PROFISSIONAL',
    "cdProfissional" INTEGER,
    "cdPaciente" INTEGER,

    CONSTRAINT "cecom.usuariosauth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cecom.usuariosauth_cdMaster_idx" ON "cecom.usuariosauth"("cdMaster");

-- CreateIndex
CREATE UNIQUE INDEX "cecom.usuariosauth_cdMaster_email_key" ON "cecom.usuariosauth"("cdMaster", "email");

-- AddForeignKey
ALTER TABLE "cecom.usuariosauth" ADD CONSTRAINT "cecom.usuariosauth_cdMaster_fkey" FOREIGN KEY ("cdMaster") REFERENCES "master"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.usuariosauth" ADD CONSTRAINT "cecom.usuariosauth_cdProfissional_fkey" FOREIGN KEY ("cdProfissional") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.usuariosauth" ADD CONSTRAINT "cecom.usuariosauth_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "pacientes"("cdMaster", "cdPaciente") ON DELETE SET NULL ON UPDATE CASCADE;
