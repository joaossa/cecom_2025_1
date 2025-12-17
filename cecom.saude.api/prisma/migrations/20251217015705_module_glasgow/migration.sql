-- CreateTable
CREATE TABLE cecom.glasgow (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "cdProf" INTEGER,
    "data" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ocular" INTEGER NOT NULL,
    "verbal" INTEGER NOT NULL,
    "motora" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "observacao" VARCHAR(300),

    CONSTRAINT glasgow_pkey PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX glasgow_cdAtendimento_idx ON cecom.glasgow("cdAtendimento");

-- CreateIndex
CREATE INDEX glasgow_cdProf_idx ON cecom.glasgow("cdProf");

-- AddForeignKey
ALTER TABLE cecom.glasgow ADD CONSTRAINT glasgow_cdAtendimento_fkey FOREIGN KEY ("cdAtendimento") REFERENCES "cecom.atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE cecom.glasgow ADD CONSTRAINT glasgow_cdProf_fkey FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;
