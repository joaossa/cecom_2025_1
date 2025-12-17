-- CreateTable
CREATE TABLE cecom.atendimentos (
    "id" SERIAL NOT NULL,
    "cdMaster" INTEGER NOT NULL,
    "cdPaciente" INTEGER NOT NULL,
    "cdProf" INTEGER NOT NULL,
    "data" TIMESTAMPTZ NOT NULL,
    "observacao" VARCHAR(500),

    CONSTRAINT atendimentos_pkey PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE cecom.atendimentos ADD CONSTRAINT atendimentos_cdMaster_cdPaciente_fkey FOREIGN KEY ("cdMaster", "cdPaciente") REFERENCES cecom.pacientes("cdMaster", "cdPaciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE cecom.atendimentos ADD CONSTRAINT atendimentos_cdProf_fkey FOREIGN KEY ("cdProf") REFERENCES cecom.profissionais("id") ON DELETE RESTRICT ON UPDATE CASCADE;
