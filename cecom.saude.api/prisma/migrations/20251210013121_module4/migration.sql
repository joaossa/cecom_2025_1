-- CreateEnum
CREATE TYPE "TipoFone" AS ENUM ('R', 'T', 'C', 'P');

-- CreateTable
CREATE TABLE "cecom.contatos" (
    "id" SERIAL NOT NULL,
    "tpTelefone" "TipoFone" NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.contatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.contatospacientes" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdContato" INTEGER NOT NULL,

    CONSTRAINT "cecom.contatospacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.contatosprofissionais" (
    "id" SERIAL NOT NULL,
    "cdProf" INTEGER NOT NULL,
    "cdContato" INTEGER NOT NULL,

    CONSTRAINT "cecom.contatosprofissionais_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cecom.contatospacientes" ADD CONSTRAINT "cecom.contatospacientes_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "cecom.pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.contatospacientes" ADD CONSTRAINT "cecom.contatospacientes_cdContato_fkey" FOREIGN KEY ("cdContato") REFERENCES "cecom.contatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.contatosprofissionais" ADD CONSTRAINT "cecom.contatosprofissionais_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.contatosprofissionais" ADD CONSTRAINT "cecom.contatosprofissionais_cdContato_fkey" FOREIGN KEY ("cdContato") REFERENCES "cecom.contatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
