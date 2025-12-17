-- CreateTable
CREATE TABLE cecom.escolaridades (
    "id" SMALLSERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT escolaridades_pkey PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE cecom.ocupacoes (
    "id" SMALLSERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "cbo" VARCHAR(10),
    "stInativo" "SimNao",

    CONSTRAINT ocupacoes_pkey PRIMARY KEY ("id")
);
