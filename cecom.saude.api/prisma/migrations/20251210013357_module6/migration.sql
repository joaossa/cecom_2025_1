-- CreateTable
CREATE TABLE "cecom.evolucoes" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "cdProf" INTEGER NOT NULL,
    "data" TIMESTAMPTZ NOT NULL,
    "texto" VARCHAR(2000) NOT NULL,

    CONSTRAINT "cecom.evolucoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cecom.evolucoes" ADD CONSTRAINT "cecom.evolucoes_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "cecom.atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.evolucoes" ADD CONSTRAINT "cecom.evolucoes_cdProf_fkey" FOREIGN KEY ("cdProf") REFERENCES "cecom.profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
