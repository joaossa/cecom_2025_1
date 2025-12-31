-- CreateEnum
CREATE TYPE "SimNao" AS ENUM ('S', 'N');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F', 'I');

-- CreateEnum
CREATE TYPE "VersaoCid" AS ENUM ('c9', 'c10');

-- CreateEnum
CREATE TYPE "VersaoDsm" AS ENUM ('d4', 'd5');

-- CreateEnum
CREATE TYPE "HumorIntensidade" AS ENUM ('1', '2', '3', '4', '5');

-- CreateEnum
CREATE TYPE "OrigemAfericao" AS ENUM ('MANUAL', 'OXIMETRO', 'BALANCA', 'RELOGIO_INTELIGENTE', 'MONITOR_HOSPITALAR');

-- CreateEnum
CREATE TYPE "PosicaoPaciente" AS ENUM ('SENTADO', 'DEITADO', 'ORTOSTATICO', 'EM_PE');

-- CreateEnum
CREATE TYPE "TipoFone" AS ENUM ('R', 'T', 'C', 'P');

-- CreateEnum
CREATE TYPE "TipoParentesco" AS ENUM ('P', 'M', 'T', 'F', 'C', 'O', 'R');

-- CreateEnum
CREATE TYPE "RoleAuth" AS ENUM ('ADMIN', 'PROFISSIONAL', 'LEITURA');

-- CreateTable
CREATE TABLE "master" (
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "dtCadastro" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stInativo" "SimNao",

    CONSTRAINT "master_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "sexo" "Sexo",
    "dtNascimento" DATE,
    "stInativo" "SimNao",
    "cdEscolaridade" INTEGER,
    "cdOcupacao" INTEGER,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("cdMaster","cdPaciente")
);

-- CreateTable
CREATE TABLE "profissionais" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "sexo" "Sexo",
    "conselho" VARCHAR(30),
    "stInativo" "SimNao",
    "cdOcupacao" INTEGER,

    CONSTRAINT "profissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" SERIAL NOT NULL,
    "logradouro" VARCHAR(120) NOT NULL,
    "numero" VARCHAR(10),
    "complemento" VARCHAR(50),
    "cdBairro" INTEGER NOT NULL,
    "cdCidade" INTEGER NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecospacientes" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdEndereco" INTEGER NOT NULL,

    CONSTRAINT "enderecospacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecosprofissionais" (
    "id" SERIAL NOT NULL,
    "cdProf" INTEGER NOT NULL,
    "cdEndereco" INTEGER NOT NULL,

    CONSTRAINT "enderecosprofissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contatos" (
    "id" SERIAL NOT NULL,
    "tpTelefone" "TipoFone" NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "contatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contatospacientes" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdContato" INTEGER NOT NULL,

    CONSTRAINT "contatospacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contatosprofissionais" (
    "id" SERIAL NOT NULL,
    "cdProf" INTEGER NOT NULL,
    "cdContato" INTEGER NOT NULL,

    CONSTRAINT "contatosprofissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atendimentos" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdProf" INTEGER NOT NULL,
    "data" TIMESTAMPTZ NOT NULL,
    "observacao" VARCHAR(500),

    CONSTRAINT "atendimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evolucoes" (
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

    CONSTRAINT "evolucoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoasrelacionadas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "telefone" VARCHAR(20),
    "stInativo" "SimNao",

    CONSTRAINT "pessoasrelacionadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parentescospacientes" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdPessoa" INTEGER NOT NULL,
    "tipo" "TipoParentesco" NOT NULL,

    CONSTRAINT "parentescospacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motivos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "motivos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiposprocedimentos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "tiposprocedimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiposevolucaosimples" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "tiposevolucaosimples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paises" (
    "id" SMALLSERIAL NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "nacionalidade" VARCHAR(60),
    "cdIbge" INTEGER,

    CONSTRAINT "paises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidadesfederacao" (
    "id" CHAR(2) NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "cdIbge" INTEGER,

    CONSTRAINT "unidadesfederacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidades" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "cdUf" CHAR(2) NOT NULL,
    "cdPais" INTEGER NOT NULL,
    "cepGeral" VARCHAR(9),
    "cdIbge" INTEGER,
    "stInativo" "SimNao",

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escolaridades" (
    "id" SMALLSERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "escolaridades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ocupacoes" (
    "id" SMALLSERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "cbo" VARCHAR(10),
    "stInativo" "SimNao",

    CONSTRAINT "ocupacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distritos" (
    "id" SERIAL NOT NULL,
    "cdCidade" INTEGER NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "distritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bairros" (
    "id" SERIAL NOT NULL,
    "cdDistrito" INTEGER,
    "cdCidade" INTEGER NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "bairros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecospessoasrelacionadas" (
    "id" SERIAL NOT NULL,
    "cdPessoa" INTEGER NOT NULL,
    "cdEndereco" INTEGER NOT NULL,

    CONSTRAINT "enderecospessoasrelacionadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cid" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "versao" "VersaoCid" NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "cid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dsm" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "versao" "VersaoDsm" NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "dsm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiposevolucoesclinicas" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT "tiposevolucoesclinicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evolucoescid" (
    "id" SERIAL NOT NULL,
    "cdEvolucao" INTEGER NOT NULL,
    "cdCid" INTEGER NOT NULL,

    CONSTRAINT "evolucoescid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evolucoesdsm" (
    "id" SERIAL NOT NULL,
    "cdEvolucao" INTEGER NOT NULL,
    "cdDsm" INTEGER NOT NULL,

    CONSTRAINT "evolucoesdsm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sinaisvitais" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paSistolica" SMALLINT,
    "paDiastolica" SMALLINT,
    "fc" SMALLINT,
    "fr" SMALLINT,
    "temperatura" DECIMAL(4,1),
    "spo2" SMALLINT,
    "peso" DECIMAL(5,2),
    "altura" DECIMAL(4,2),
    "imc" DECIMAL(5,2),
    "dor" SMALLINT,
    "escalaDorId" INTEGER,
    "posicao" "PosicaoPaciente",
    "origem" "OrigemAfericao" DEFAULT 'MANUAL',
    "metadataRaw" JSONB,

    CONSTRAINT "sinaisvitais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escalasdor" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(300),

    CONSTRAINT "escalasdor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "glasgow" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "cdProf" INTEGER,
    "data" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ocular" INTEGER NOT NULL,
    "verbal" INTEGER NOT NULL,
    "motora" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "observacao" VARCHAR(300),

    CONSTRAINT "glasgow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "afericoesclinicas" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "cdProf" INTEGER,
    "escala" VARCHAR(50) NOT NULL,
    "idRegistro" INTEGER NOT NULL,
    "data" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "afericoesclinicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eva" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "cdProfissional" INTEGER,
    "data" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" INTEGER NOT NULL,
    "observacao" VARCHAR(300),

    CONSTRAINT "eva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuariosauth" (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "senhaHash" VARCHAR(200) NOT NULL,
    "role" "RoleAuth" NOT NULL DEFAULT 'LEITURA',
    "cdProfissional" INTEGER,
    "stInativo" "SimNao",
    "dtCadastro" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtUltLogin" TIMESTAMPTZ,

    CONSTRAINT "usuariosauth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cidades_cdUf_idx" ON "cidades"("cdUf");

-- CreateIndex
CREATE INDEX "cidades_cdPais_idx" ON "cidades"("cdPais");

-- CreateIndex
CREATE UNIQUE INDEX "cid_codigo_versao_key" ON "cid"("codigo", "versao");

-- CreateIndex
CREATE UNIQUE INDEX "dsm_codigo_versao_key" ON "dsm"("codigo", "versao");

-- CreateIndex
CREATE INDEX "glasgow_cdAtendimento_idx" ON "glasgow"("cdAtendimento");

-- CreateIndex
CREATE INDEX "glasgow_cdProf_idx" ON "glasgow"("cdProf");

-- CreateIndex
CREATE INDEX "afericoesclinicas_cdAtendimento_idx" ON "afericoesclinicas"("cdAtendimento");

-- CreateIndex
CREATE INDEX "afericoesclinicas_escala_idx" ON "afericoesclinicas"("escala");

-- CreateIndex
CREATE INDEX "eva_cdAtendimento_idx" ON "eva"("cdAtendimento");

-- CreateIndex
CREATE INDEX "eva_cdProfissional_idx" ON "eva"("cdProfissional");

-- CreateIndex
CREATE INDEX "usuariosauth_cdMaster_idx" ON "usuariosauth"("cdMaster");

-- CreateIndex
CREATE UNIQUE INDEX "usuariosauth_cdMaster_email_key" ON "usuariosauth"("cdMaster", "email");

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_cdEscolaridade_fkey" FOREIGN KEY ("cdEscolaridade") REFERENCES "escolaridades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_cdOcupacao_fkey" FOREIGN KEY ("cdOcupacao") REFERENCES "ocupacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_cdMaster_fkey" FOREIGN KEY ("cdMaster") REFERENCES "master"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissionais" ADD CONSTRAINT "profissionais_cdOcupacao_fkey" FOREIGN KEY ("cdOcupacao") REFERENCES "ocupacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissionais" ADD CONSTRAINT "profissionais_cdMaster_fkey" FOREIGN KEY ("cdMaster") REFERENCES "master"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_cdCidade_fkey" FOREIGN KEY ("cdCidade") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_cdBairro_fkey" FOREIGN KEY ("cdBairro") REFERENCES "bairros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecospacientes" ADD CONSTRAINT "enderecospacientes_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecospacientes" ADD CONSTRAINT "enderecospacientes_cdEndereco_fkey" FOREIGN KEY ("cdEndereco") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecosprofissionais" ADD CONSTRAINT "enderecosprofissionais_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecosprofissionais" ADD CONSTRAINT "enderecosprofissionais_cdEndereco_fkey" FOREIGN KEY ("cdEndereco") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contatospacientes" ADD CONSTRAINT "contatospacientes_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contatospacientes" ADD CONSTRAINT "contatospacientes_cdContato_fkey" FOREIGN KEY ("cdContato") REFERENCES "contatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contatosprofissionais" ADD CONSTRAINT "contatosprofissionais_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contatosprofissionais" ADD CONSTRAINT "contatosprofissionais_cdContato_fkey" FOREIGN KEY ("cdContato") REFERENCES "contatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atendimentos" ADD CONSTRAINT "atendimentos_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atendimentos" ADD CONSTRAINT "atendimentos_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoes" ADD CONSTRAINT "evolucoes_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoes" ADD CONSTRAINT "evolucoes_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoes" ADD CONSTRAINT "evolucoes_cdTipoEvolucaoClinica_fkey" FOREIGN KEY ("cdTipoEvolucaoClinica") REFERENCES "tiposevolucoesclinicas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoes" ADD CONSTRAINT "evolucoes_pacienteCdMaster_pacienteCdPaciente_fkey" FOREIGN KEY ("pacienteCdMaster", "pacienteCdPaciente") REFERENCES "pacientes"("cdMaster", "cdPaciente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parentescospacientes" ADD CONSTRAINT "parentescospacientes_cdMaster_cdPaciente_fkey" FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES "pacientes"("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parentescospacientes" ADD CONSTRAINT "parentescospacientes_cdPessoa_fkey" FOREIGN KEY ("cdPessoa") REFERENCES "pessoasrelacionadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidades" ADD CONSTRAINT "cidades_cdUf_fkey" FOREIGN KEY ("cdUf") REFERENCES "unidadesfederacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidades" ADD CONSTRAINT "cidades_cdPais_fkey" FOREIGN KEY ("cdPais") REFERENCES "paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distritos" ADD CONSTRAINT "distritos_cdCidade_fkey" FOREIGN KEY ("cdCidade") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bairros" ADD CONSTRAINT "bairros_cdDistrito_fkey" FOREIGN KEY ("cdDistrito") REFERENCES "distritos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bairros" ADD CONSTRAINT "bairros_cdCidade_fkey" FOREIGN KEY ("cdCidade") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecospessoasrelacionadas" ADD CONSTRAINT "enderecospessoasrelacionadas_cdPessoa_fkey" FOREIGN KEY ("cdPessoa") REFERENCES "pessoasrelacionadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enderecospessoasrelacionadas" ADD CONSTRAINT "enderecospessoasrelacionadas_cdEndereco_fkey" FOREIGN KEY ("cdEndereco") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoescid" ADD CONSTRAINT "evolucoescid_cdEvolucao_fkey" FOREIGN KEY ("cdEvolucao") REFERENCES "evolucoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoescid" ADD CONSTRAINT "evolucoescid_cdCid_fkey" FOREIGN KEY ("cdCid") REFERENCES "cid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoesdsm" ADD CONSTRAINT "evolucoesdsm_cdEvolucao_fkey" FOREIGN KEY ("cdEvolucao") REFERENCES "evolucoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoesdsm" ADD CONSTRAINT "evolucoesdsm_cdDsm_fkey" FOREIGN KEY ("cdDsm") REFERENCES "dsm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sinaisvitais" ADD CONSTRAINT "sinaisvitais_escalaDorId_fkey" FOREIGN KEY ("escalaDorId") REFERENCES "escalasdor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sinaisvitais" ADD CONSTRAINT "sinaisvitais_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "glasgow" ADD CONSTRAINT "glasgow_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "glasgow" ADD CONSTRAINT "glasgow_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "afericoesclinicas" ADD CONSTRAINT "afericoesclinicas_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "afericoesclinicas" ADD CONSTRAINT "afericoesclinicas_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eva" ADD CONSTRAINT "eva_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eva" ADD CONSTRAINT "eva_cdProfissional_fkey" FOREIGN KEY ("cdProfissional") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuariosauth" ADD CONSTRAINT "usuariosauth_cdMaster_fkey" FOREIGN KEY ("cdMaster") REFERENCES "master"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuariosauth" ADD CONSTRAINT "usuariosauth_cdProfissional_fkey" FOREIGN KEY ("cdProfissional") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;
