-- CreateEnum
CREATE TYPE "VersaoCid" AS ENUM ('c9', 'c10');

-- CreateEnum
CREATE TYPE "VersaoDsm" AS ENUM ('d4', 'd5');

-- CreateTable
CREATE TABLE cecom.cid (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "versao" "VersaoCid" NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT cid_pkey PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE cecom.dsm (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "versao" "VersaoDsm" NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT dsm_pkey PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE cecom.tiposevolucoesclinicas (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT tiposevolucoesclinicas_pkey PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX cid_codigo_versao_key ON cecom.cid("codigo", "versao");

-- CreateIndex
CREATE UNIQUE INDEX dsm_codigo_versao_key ON cecom.dsm("codigo", "versao");
