/*
  Warnings:

  - You are about to drop the `atendimentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bairros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contatos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contatospacientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contatosprofissionais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `distritos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dsm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enderecos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enderecospacientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enderecospessoasrelacionadas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enderecosprofissionais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `escolaridades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evolucoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evolucoescid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evolucoesdsm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `master` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `motivos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ocupacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pacientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parentescospacientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pessoasrelacionadas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `planos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profissionais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sinaisvitais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tiposevolucaosimples` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tiposevolucoesclinicas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tiposprocedimentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unidadesfederacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "atendimentos" DROP CONSTRAINT "atendimentos_cdmaster_cdpaciente_fkey";

-- DropForeignKey
ALTER TABLE "atendimentos" DROP CONSTRAINT "atendimentos_cdprof_fkey";

-- DropForeignKey
ALTER TABLE "bairros" DROP CONSTRAINT "bairros_cdcidade_fkey";

-- DropForeignKey
ALTER TABLE "bairros" DROP CONSTRAINT "bairros_cddistrito_fkey";

-- DropForeignKey
ALTER TABLE "cidades" DROP CONSTRAINT "cidades_cdpais_fkey";

-- DropForeignKey
ALTER TABLE "cidades" DROP CONSTRAINT "cidades_cduf_fkey";

-- DropForeignKey
ALTER TABLE "contatospacientes" DROP CONSTRAINT "contatospacientes_cdcontato_fkey";

-- DropForeignKey
ALTER TABLE "contatospacientes" DROP CONSTRAINT "contatospacientes_cdmaster_cdpaciente_fkey";

-- DropForeignKey
ALTER TABLE "contatosprofissionais" DROP CONSTRAINT "contatosprofissionais_cdcontato_fkey";

-- DropForeignKey
ALTER TABLE "contatosprofissionais" DROP CONSTRAINT "contatosprofissionais_cdprof_fkey";

-- DropForeignKey
ALTER TABLE "distritos" DROP CONSTRAINT "distritos_cdcidade_fkey";

-- DropForeignKey
ALTER TABLE "enderecos" DROP CONSTRAINT "enderecos_cdbairro_fkey";

-- DropForeignKey
ALTER TABLE "enderecos" DROP CONSTRAINT "enderecos_cdcidade_fkey";

-- DropForeignKey
ALTER TABLE "enderecospacientes" DROP CONSTRAINT "enderecospacientes_cdendereco_fkey";

-- DropForeignKey
ALTER TABLE "enderecospacientes" DROP CONSTRAINT "enderecospacientes_cdmaster_cdpaciente_fkey";

-- DropForeignKey
ALTER TABLE "enderecospessoasrelacionadas" DROP CONSTRAINT "enderecospessoasrelacionadas_cdendereco_fkey";

-- DropForeignKey
ALTER TABLE "enderecospessoasrelacionadas" DROP CONSTRAINT "enderecospessoasrelacionadas_cdpessoa_fkey";

-- DropForeignKey
ALTER TABLE "enderecosprofissionais" DROP CONSTRAINT "enderecosprofissionais_cdendereco_fkey";

-- DropForeignKey
ALTER TABLE "enderecosprofissionais" DROP CONSTRAINT "enderecosprofissionais_cdprof_fkey";

-- DropForeignKey
ALTER TABLE "evolucoes" DROP CONSTRAINT "evolucoes_cdatendimento_fkey";

-- DropForeignKey
ALTER TABLE "evolucoes" DROP CONSTRAINT "evolucoes_cdprof_fkey";

-- DropForeignKey
ALTER TABLE "evolucoes" DROP CONSTRAINT "evolucoes_cdtipoevolucaoclinica_fkey";

-- DropForeignKey
ALTER TABLE "evolucoes" DROP CONSTRAINT "evolucoes_pacientecdmaster_pacientecdpaciente_fkey";

-- DropForeignKey
ALTER TABLE "evolucoescid" DROP CONSTRAINT "evolucoescid_cdcid_fkey";

-- DropForeignKey
ALTER TABLE "evolucoescid" DROP CONSTRAINT "evolucoescid_cdevolucao_fkey";

-- DropForeignKey
ALTER TABLE "evolucoesdsm" DROP CONSTRAINT "evolucoesdsm_cddsm_fkey";

-- DropForeignKey
ALTER TABLE "evolucoesdsm" DROP CONSTRAINT "evolucoesdsm_cdevolucao_fkey";

-- DropForeignKey
ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_cdescolaridade_fkey";

-- DropForeignKey
ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_cdmaster_fkey";

-- DropForeignKey
ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_cdocupacao_fkey";

-- DropForeignKey
ALTER TABLE "parentescospacientes" DROP CONSTRAINT "parentescospacientes_cdmaster_cdpaciente_fkey";

-- DropForeignKey
ALTER TABLE "parentescospacientes" DROP CONSTRAINT "parentescospacientes_cdpessoa_fkey";

-- DropForeignKey
ALTER TABLE "profissionais" DROP CONSTRAINT "profissionais_cdmaster_fkey";

-- DropForeignKey
ALTER TABLE "profissionais" DROP CONSTRAINT "profissionais_cdocupacao_fkey";

-- DropForeignKey
ALTER TABLE "sinaisvitais" DROP CONSTRAINT "sinaisvitais_cdatendimento_fkey";

-- DropTable
DROP TABLE "atendimentos";

-- DropTable
DROP TABLE "bairros";

-- DropTable
DROP TABLE "cid";

-- DropTable
DROP TABLE "cidades";

-- DropTable
DROP TABLE "contatos";

-- DropTable
DROP TABLE "contatospacientes";

-- DropTable
DROP TABLE "contatosprofissionais";

-- DropTable
DROP TABLE "distritos";

-- DropTable
DROP TABLE "dsm";

-- DropTable
DROP TABLE "enderecos";

-- DropTable
DROP TABLE "enderecospacientes";

-- DropTable
DROP TABLE "enderecospessoasrelacionadas";

-- DropTable
DROP TABLE "enderecosprofissionais";

-- DropTable
DROP TABLE "escolaridades";

-- DropTable
DROP TABLE "evolucoes";

-- DropTable
DROP TABLE "evolucoescid";

-- DropTable
DROP TABLE "evolucoesdsm";

-- DropTable
DROP TABLE "master";

-- DropTable
DROP TABLE "motivos";

-- DropTable
DROP TABLE "ocupacoes";

-- DropTable
DROP TABLE "pacientes";

-- DropTable
DROP TABLE "paises";

-- DropTable
DROP TABLE "parentescospacientes";

-- DropTable
DROP TABLE "pessoasrelacionadas";

-- DropTable
DROP TABLE "planos";

-- DropTable
DROP TABLE "profissionais";

-- DropTable
DROP TABLE "sinaisvitais";

-- DropTable
DROP TABLE "tiposevolucaosimples";

-- DropTable
DROP TABLE "tiposevolucoesclinicas";

-- DropTable
DROP TABLE "tiposprocedimentos";

-- DropTable
DROP TABLE "unidadesfederacao";

-- CreateTable
CREATE TABLE "cecom.master" (
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "dtCadastro" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.master_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "cecom.pacientes" (
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "sexo" "Sexo",
    "dtNascimento" DATE,
    "stInativo" "SimNao",
    "cdEscolaridade" INTEGER,
    "cdOcupacao" INTEGER,

    CONSTRAINT "cecom.pacientes_pkey" PRIMARY KEY ("cdMaster","cdPaciente")
);

-- CreateTable
CREATE TABLE "cecom.profissionais" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "sexo" "Sexo",
    "conselho" VARCHAR(30),
    "stInativo" "SimNao",
    "cdOcupacao" INTEGER,

    CONSTRAINT "cecom.profissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.enderecos" (
    "id" SERIAL NOT NULL,
    "logradouro" VARCHAR(120) NOT NULL,
    "numero" VARCHAR(10),
    "complemento" VARCHAR(50),
    "cdBairro" INTEGER NOT NULL,
    "cdCidade" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "cecom.atendimentos" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdProf" INTEGER NOT NULL,
    "data" TIMESTAMPTZ NOT NULL,
    "observacao" VARCHAR(500),

    CONSTRAINT "cecom.atendimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.evolucoes" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "cdProf" INTEGER NOT NULL,
    "data" TIMESTAMPTZ NOT NULL,
    "texto" VARCHAR(2000) NOT NULL,
    "cdTipoEvolucaoClinica" INTEGER,
    "humor" "HumorIntensidade",
    "alertaRisco" BOOLEAN DEFAULT false,
    "agravamento" BOOLEAN DEFAULT false,
    "textoEstruturado" JSONB,
    "pacienteCdMaster" INTEGER,
    "pacienteCdPaciente" INTEGER,

    CONSTRAINT "cecom.evolucoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.pessoasrelacionadas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "telefone" VARCHAR(20),
    "stInativo" "SimNao",

    CONSTRAINT "cecom.pessoasrelacionadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.parentescospacientes" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdPessoa" INTEGER NOT NULL,
    "tipo" "TipoParentesco" NOT NULL,

    CONSTRAINT "cecom.parentescospacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.planos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.motivos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.motivos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.tiposprocedimentos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.tiposprocedimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.tiposevolucaosimples" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.tiposevolucaosimples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.paises" (
    "id" SMALLSERIAL NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "nacionalidade" VARCHAR(60),
    "cdIbge" INTEGER,

    CONSTRAINT "cecom.paises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.unidadesfederacao" (
    "id" CHAR(2) NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "cdIbge" INTEGER,

    CONSTRAINT "cecom.unidadesfederacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.cidades" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "cdUf" CHAR(2) NOT NULL,
    "cdPais" INTEGER NOT NULL,
    "cepGeral" VARCHAR(9),
    "cdIbge" INTEGER,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.escolaridades" (
    "id" SMALLSERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.escolaridades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.ocupacoes" (
    "id" SMALLSERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "cbo" VARCHAR(10),
    "stInativo" "SimNao",

    CONSTRAINT "cecom.ocupacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.distritos" (
    "id" SERIAL NOT NULL,
    "cdCidade" INTEGER NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.distritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.bairros" (
    "id" SERIAL NOT NULL,
    "cdDistrito" INTEGER,
    "cdCidade" INTEGER NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.bairros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.enderecospessoasrelacionadas" (
    "id" SERIAL NOT NULL,
    "cdPessoa" INTEGER NOT NULL,
    "cdEndereco" INTEGER NOT NULL,

    CONSTRAINT "cecom.enderecospessoasrelacionadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.cid" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "versao" "VersaoCid" NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.cid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.dsm" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "versao" "VersaoDsm" NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.dsm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.tiposevolucoesclinicas" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cecom.tiposevolucoesclinicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.evolucoescid" (
    "id" SERIAL NOT NULL,
    "cdEvolucao" INTEGER NOT NULL,
    "cdCid" INTEGER NOT NULL,

    CONSTRAINT "cecom.evolucoescid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.evolucoesdsm" (
    "id" SERIAL NOT NULL,
    "cdEvolucao" INTEGER NOT NULL,
    "cdDsm" INTEGER NOT NULL,

    CONSTRAINT "cecom.evolucoesdsm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cecom.sinaisvitais" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paSistolica" INTEGER,
    "paDiastolica" INTEGER,
    "fc" INTEGER,
    "fr" INTEGER,
    "temperatura" DECIMAL,
    "spo2" INTEGER,
    "peso" DECIMAL,
    "altura" DECIMAL,
    "imc" DECIMAL,
    "pam" DECIMAL,
    "riscoClinico" VARCHAR(20),
    "metodoColeta" VARCHAR(50),
    "dispositivoId" VARCHAR(50),
    "metadados" JSONB,

    CONSTRAINT "cecom.sinaisvitais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cecom.cidades_cdUf_idx" ON "cecom.cidades"("cdUf");

-- CreateIndex
CREATE INDEX "cecom.cidades_cdPais_idx" ON "cecom.cidades"("cdPais");

-- CreateIndex
CREATE UNIQUE INDEX "cecom.cid_codigo_versao_key" ON "cecom.cid"("codigo", "versao");

-- CreateIndex
CREATE UNIQUE INDEX "cecom.dsm_codigo_versao_key" ON "cecom.dsm"("codigo", "versao");

-- AddForeignKey
ALTER TABLE "cecom.pacientes" ADD CONSTRAINT "cecom.pacientes_cdEscolaridade_fkey" FOREIGN KEY ("cdEscolaridade") REFERENCES "cecom.escolaridades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.pacientes" ADD CONSTRAINT "cecom.pacientes_cdOcupacao_fkey" FOREIGN KEY ("cdOcupacao") REFERENCES "cecom.ocupacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.pacientes" ADD CONSTRAINT "cecom.pacientes_cdMaster_fkey" FOREIGN KEY ("cdMaster") REFERENCES "cecom.master"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.profissionais" ADD CONSTRAINT "cecom.profissionais_cdOcupacao_fkey" FOREIGN KEY ("cdOcupacao") REFERENCES "cecom.ocupacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.profissionais" ADD CONSTRAINT "cecom.profissionais_cdMaster_fkey" FOREIGN KEY ("cdMaster") REFERENCES "cecom.master"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecos" ADD CONSTRAINT "cecom.enderecos_cdCidade_fkey" FOREIGN KEY ("cdCidade") REFERENCES "cecom.cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecos" ADD CONSTRAINT "cecom.enderecos_cdBairro_fkey" FOREIGN KEY ("cdBairro") REFERENCES "cecom.bairros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecospacientes" ADD CONSTRAINT "cecom.enderecospacientes_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "cecom.pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecospacientes" ADD CONSTRAINT "cecom.enderecospacientes_cdEndereco_fkey" FOREIGN KEY ("cdEndereco") REFERENCES "cecom.enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecosprofissionais" ADD CONSTRAINT "cecom.enderecosprofissionais_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecosprofissionais" ADD CONSTRAINT "cecom.enderecosprofissionais_cdEndereco_fkey" FOREIGN KEY ("cdEndereco") REFERENCES "cecom.enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.contatospacientes" ADD CONSTRAINT "cecom.contatospacientes_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "cecom.pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.contatospacientes" ADD CONSTRAINT "cecom.contatospacientes_cdContato_fkey" FOREIGN KEY ("cdContato") REFERENCES "cecom.contatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.contatosprofissionais" ADD CONSTRAINT "cecom.contatosprofissionais_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.contatosprofissionais" ADD CONSTRAINT "cecom.contatosprofissionais_cdContato_fkey" FOREIGN KEY ("cdContato") REFERENCES "cecom.contatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.atendimentos" ADD CONSTRAINT "cecom.atendimentos_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "cecom.pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.atendimentos" ADD CONSTRAINT "cecom.atendimentos_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoes" ADD CONSTRAINT "cecom.evolucoes_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "cecom.atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoes" ADD CONSTRAINT "cecom.evolucoes_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoes" ADD CONSTRAINT "cecom.evolucoes_cdTipoEvolucaoClinica_fkey" FOREIGN KEY ("cdTipoEvolucaoClinica") REFERENCES "cecom.tiposevolucoesclinicas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoes" ADD CONSTRAINT "cecom.evolucoes_pacienteCdMaster_pacienteCdPaciente_fkey" FOREIGN KEY ("pacienteCdMaster", "pacienteCdPaciente") REFERENCES "cecom.pacientes"("cdMaster", "cdPaciente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.parentescospacientes" ADD CONSTRAINT "cecom.parentescospacientes_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "cecom.pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.parentescospacientes" ADD CONSTRAINT "cecom.parentescospacientes_cdPessoa_fkey" FOREIGN KEY ("cdPessoa") REFERENCES "cecom.pessoasrelacionadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.cidades" ADD CONSTRAINT "cecom.cidades_cdUf_fkey" FOREIGN KEY ("cdUf") REFERENCES "cecom.unidadesfederacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.cidades" ADD CONSTRAINT "cecom.cidades_cdPais_fkey" FOREIGN KEY ("cdPais") REFERENCES "cecom.paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.distritos" ADD CONSTRAINT "cecom.distritos_cdCidade_fkey" FOREIGN KEY ("cdCidade") REFERENCES "cecom.cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.bairros" ADD CONSTRAINT "cecom.bairros_cdDistrito_fkey" FOREIGN KEY ("cdDistrito") REFERENCES "cecom.distritos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.bairros" ADD CONSTRAINT "cecom.bairros_cdCidade_fkey" FOREIGN KEY ("cdCidade") REFERENCES "cecom.cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecospessoasrelacionadas" ADD CONSTRAINT "cecom.enderecospessoasrelacionadas_cdPessoa_fkey" FOREIGN KEY ("cdPessoa") REFERENCES "cecom.pessoasrelacionadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.enderecospessoasrelacionadas" ADD CONSTRAINT "cecom.enderecospessoasrelacionadas_cdEndereco_fkey" FOREIGN KEY ("cdEndereco") REFERENCES "cecom.enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoescid" ADD CONSTRAINT "cecom.evolucoescid_cdEvolucao_fkey" FOREIGN KEY ("cdEvolucao") REFERENCES "cecom.evolucoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoescid" ADD CONSTRAINT "cecom.evolucoescid_cdCid_fkey" FOREIGN KEY ("cdCid") REFERENCES "cecom.cid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoesdsm" ADD CONSTRAINT "cecom.evolucoesdsm_cdEvolucao_fkey" FOREIGN KEY ("cdEvolucao") REFERENCES "cecom.evolucoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoesdsm" ADD CONSTRAINT "cecom.evolucoesdsm_cdDsm_fkey" FOREIGN KEY ("cdDsm") REFERENCES "cecom.dsm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.sinaisvitais" ADD CONSTRAINT "cecom.sinaisvitais_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "cecom.atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
