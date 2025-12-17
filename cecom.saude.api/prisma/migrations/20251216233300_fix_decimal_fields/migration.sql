-- CreateTable
CREATE TABLE cecom.sinaisvitais (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paSistolica" INTEGER,
    "paDiastolica" INTEGER,
    "fc" INTEGER,
    "fr" INTEGER,
    "temperatura" DECIMAL(65,30),
    "spo2" INTEGER,
    "peso" DECIMAL(65,30),
    "altura" DECIMAL(65,30),
    "imc" DECIMAL(65,30),
    "dor" INTEGER,

    CONSTRAINT sinaisvitais_pkey PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE cecom.sinaisvitais ADD CONSTRAINT sinaisvitais_cdAtendimento_fkey FOREIGN KEY ("cdAtendimento") REFERENCES cecom.atendimentos("id") ON DELETE RESTRICT ON UPDATE CASCADE;
