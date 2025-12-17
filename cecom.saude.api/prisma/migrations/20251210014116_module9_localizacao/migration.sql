-- CreateTable
CREATE TABLE cecom.paises (
    "id" SMALLSERIAL NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "nacionalidade" VARCHAR(60),
    "cdIbge" INTEGER,

    CONSTRAINT paises_pkey PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE cecom.unidadesfederacao (
    "id" CHAR(2) NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "cdIbge" INTEGER,

    CONSTRAINT unidadesfederacao_pkey PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE cecom.cidades (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "cdUf" CHAR(2) NOT NULL,
    "cdPais" INTEGER NOT NULL,
    "cepGeral" VARCHAR(9),
    "cdIbge" INTEGER,
    "stInativo" "SimNao",

    CONSTRAINT cidades_pkey PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX cidades_cdUf_idx ON cecom.cidades("cdUf");

-- CreateIndex
CREATE INDEX cidades_cdPais_idx ON cecom.cidades("cdPais");

-- AddForeignKey
ALTER TABLE cecom.cidades ADD CONSTRAINT cidades_cdUf_fkey FOREIGN KEY ("cdUf") REFERENCES cecom.unidadesfederacao("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE cecom.cidades ADD CONSTRAINT cidades_cdPais_fkey FOREIGN KEY ("cdPais") REFERENCES cecom.paises("id") ON DELETE RESTRICT ON UPDATE CASCADE;
