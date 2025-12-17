-- CreateEnum
CREATE TYPE "SimNao" AS ENUM ('S', 'N');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F', 'I');

-- CreateTable
CREATE TABLE cecom.master (
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "dtCadastro" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stInativo" "SimNao",

    CONSTRAINT master_pkey PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE cecom.pacientes (
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,

    CONSTRAINT pacientes_pkey PRIMARY KEY ("cdMaster","cdPaciente")
);

-- CreateTable
CREATE TABLE cecom.profissionais (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,

    CONSTRAINT profissionais_pkey PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE pacientes ADD CONSTRAINT pacientes_cdMaster_fkey FOREIGN KEY ("cdMaster") REFERENCES cecom.master("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE profissionais ADD CONSTRAINT profissionais_cdMaster_fkey FOREIGN KEY ("cdMaster") REFERENCES cecom.master("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
