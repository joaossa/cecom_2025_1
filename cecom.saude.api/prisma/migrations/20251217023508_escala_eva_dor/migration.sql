-- CreateTable
CREATE TABLE "cecom.eva" (
    "id" SERIAL NOT NULL,
    "cdAtendimento" INTEGER NOT NULL,
    "cdProfissional" INTEGER,
    "data" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" INTEGER NOT NULL,
    "observacao" VARCHAR(300),

    CONSTRAINT "cecom.eva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cecom.eva_cdAtendimento_idx" ON "cecom.eva"("cdAtendimento");

-- CreateIndex
CREATE INDEX "cecom.eva_cdProfissional_idx" ON "cecom.eva"("cdProfissional");

-- AddForeignKey
ALTER TABLE "cecom.eva" ADD CONSTRAINT "cecom.eva_cdAtendimento_fkey" FOREIGN KEY ("cdAtendimento") REFERENCES "cecom.atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cecom.eva" ADD CONSTRAINT "cecom.eva_cdProfissional_fkey" FOREIGN KEY ("cdProfissional") REFERENCES "cecom.profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;
