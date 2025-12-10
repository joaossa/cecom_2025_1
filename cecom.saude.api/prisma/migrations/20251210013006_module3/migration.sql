-- CreateTable
CREATE TABLE "cecom.enderecos" (
    "id" SERIAL NOT NULL,
    "logradouro" VARCHAR(120) NOT NULL,
    "numero" VARCHAR(10),
    "complemento" VARCHAR(50),
    "bairro" VARCHAR(80) NOT NULL,
    "cidade" VARCHAR(80) NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.enderecospacientes" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdEndereco" INTEGER NOT NULL,

    CONSTRAINT "cecom.enderecospacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.enderecosprofissionais" (
    "id" SERIAL NOT NULL,
    "cdProf" INTEGER NOT NULL,
    "cdEndereco" INTEGER NOT NULL,

    CONSTRAINT "cecom.enderecosprofissionais_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cecom.enderecospacientes" ADD CONSTRAINT "cecom.enderecospacientes_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "cecom.pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecospacientes" ADD CONSTRAINT "cecom.enderecospacientes_cdEndereco_fkey" FOREIGN KEY ("cdEndereco") REFERENCES "cecom.enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecosprofissionais" ADD CONSTRAINT "cecom.enderecosprofissionais_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecosprofissionais" ADD CONSTRAINT "cecom.enderecosprofissionais_cdEndereco_fkey" FOREIGN KEY ("cdEndereco") REFERENCES "cecom.enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
