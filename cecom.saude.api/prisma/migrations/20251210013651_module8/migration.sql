-- CreateTable
CREATE TABLE cecom.planos (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT planos_pkey PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE cecom.motivos (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT motivos_pkey PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE cecom.tiposprocedimentos (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT tiposprocedimentos_pkey PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE cecom.tiposevolucoes (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(120) NOT NULL,
    "stInativo" "SimNao",

    CONSTRAINT tiposevolucoes_pkey PRIMARY KEY ("id")
);
