/*
  Warnings:

  - You are about to drop the `cecom.usuariosauth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cecom.usuariosauth" DROP CONSTRAINT "cecom.usuariosauth_cdMaster_cdPaciente_fkey";

-- DropForeignKey
ALTER TABLE "cecom.usuariosauth" DROP CONSTRAINT "cecom.usuariosauth_cdMaster_fkey";

-- DropForeignKey
ALTER TABLE "cecom.usuariosauth" DROP CONSTRAINT "cecom.usuariosauth_cdProfissional_fkey";

-- DropTable
DROP TABLE "cecom.usuariosauth";

-- CreateTable
CREATE TABLE "usuariosauth" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "senhaHash" VARCHAR(255) NOT NULL,
    "role" "RoleAuth" NOT NULL DEFAULT 'PROFISSIONAL',
    "cdProfissional" INTEGER,
    "cdPaciente" INTEGER,

    CONSTRAINT "usuariosauth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "usuariosauth_cdMaster_idx" ON "usuariosauth"("cdMaster");

-- CreateIndex
CREATE UNIQUE INDEX "usuariosauth_cdMaster_email_key" ON "usuariosauth"("cdMaster", "email");

-- AddForeignKey
ALTER TABLE "usuariosauth" ADD CONSTRAINT "usuariosauth_cdMaster_fkey" FOREIGN KEY ("cdMaster") REFERENCES "master"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuariosauth" ADD CONSTRAINT "usuariosauth_cdProfissional_fkey" FOREIGN KEY ("cdProfissional") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuariosauth" ADD CONSTRAINT "usuariosauth_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "pacientes"("cdMaster", "cdPaciente") ON DELETE SET NULL ON UPDATE CASCADE;
