-- This is an empty migration.
ALTER TABLE cecom.enderecospacientes
  DROP CONSTRAINT IF EXISTS enderecospacientes_cdMaster_cdPaciente_fkey,
  ADD CONSTRAINT enderecospacientes_cdMaster_cdPaciente_fkey
    FOREIGN KEY ("cdMaster", "cdPaciente")
    REFERENCES cecom.pacientes ("cdMaster", "cdPaciente")
    ON DELETE CASCADE;
	
ALTER TABLE cecom.contatospacientes
  DROP CONSTRAINT IF EXISTS contatospacientes_cdMaster_cdPaciente_fkey,
  ADD CONSTRAINT contatospacientes_cdMaster_cdPaciente_fkey
    FOREIGN KEY ("cdMaster", "cdPaciente")
    REFERENCES cecom.pacientes ("cdMaster", "cdPaciente")
    ON DELETE CASCADE;

ALTER TABLE cecom.parentescospacientes
  DROP CONSTRAINT IF EXISTS parentescospacientes_cdMaster_cdPaciente_fkey,
  ADD CONSTRAINT parentescospacientes_cdMaster_cdPaciente_fkey
    FOREIGN KEY ("cdMaster", "cdPaciente")
    REFERENCES cecom.pacientes ("cdMaster", "cdPaciente")
    ON DELETE CASCADE;

ALTER TABLE cecom.atendimentos
  DROP CONSTRAINT IF EXISTS atendimentos_cdMaster_cdPaciente_fkey,
  ADD CONSTRAINT atendimentos_cdMaster_cdPaciente_fkey
    FOREIGN KEY ("cdMaster", "cdPaciente")
    REFERENCES cecom.pacientes ("cdMaster", "cdPaciente")
    ON DELETE CASCADE;


ALTER TABLE cecom.enderecosprofissionais
  DROP CONSTRAINT IF EXISTS enderecosprofissionais_cdProf_fkey,
  ADD CONSTRAINT enderecosprofissionais_cdProf_fkey
    FOREIGN KEY ("cdProf")
    REFERENCES cecom.profissionais (id)
    ON DELETE CASCADE;

ALTER TABLE cecom.contatosprofissionais
  DROP CONSTRAINT IF EXISTS contatosprofissionais_cdProf_fkey,
  ADD CONSTRAINT contatosprofissionais_cdProf_fkey
    FOREIGN KEY ("cdProf")
    REFERENCES cecom.profissionais (id)
    ON DELETE CASCADE;

ALTER TABLE cecom.evolucoes
  DROP CONSTRAINT IF EXISTS evolucoes_cdProf_fkey,
  ADD CONSTRAINT evolucoes_cdProf_fkey
    FOREIGN KEY ("cdProf")
    REFERENCES cecom.profissionais (id)
    ON DELETE SET NULL;

ALTER TABLE cecom.atendimentos
  DROP CONSTRAINT IF EXISTS atendimentos_cdProf_fkey,
  ADD CONSTRAINT atendimentos_cdProf_fkey
    FOREIGN KEY ("cdProf")
    REFERENCES cecom.profissionais (id)
    ON DELETE SET NULL;

ALTER TABLE cecom.evolucoes
  DROP CONSTRAINT IF EXISTS evolucoes_cdAtendimento_fkey,
  ADD CONSTRAINT evolucoes_cdAtendimento_fkey
    FOREIGN KEY ("cdAtendimento")
    REFERENCES cecom.atendimentos (id)
    ON DELETE CASCADE;


ALTER TABLE cecom.sinaisvitais
  DROP CONSTRAINT IF EXISTS sinaisvitais_cdAtendimento_fkey,
  ADD CONSTRAINT sinaisvitais_cdAtendimento_fkey
    FOREIGN KEY ("cdAtendimento")
    REFERENCES cecom.atendimentos (id)
    ON DELETE CASCADE;

ALTER TABLE cecom.evolucoescid
  DROP CONSTRAINT IF EXISTS evolucoescid_cdEvolucao_fkey,
  ADD CONSTRAINT evolucoescid_cdEvolucao_fkey
    FOREIGN KEY ("cdEvolucao")
    REFERENCES cecom.evolucoes (id)
    ON DELETE CASCADE;

ALTER TABLE cecom.evolucoesdsm
  DROP CONSTRAINT IF EXISTS evolucoesdsm_cdEvolucao_fkey,
  ADD CONSTRAINT evolucoesdsm_cdEvolucao_fkey
    FOREIGN KEY ("cdEvolucao")
    REFERENCES cecom.evolucoes (id)
    ON DELETE CASCADE;

ALTER TABLE cecom.enderecospessoasrelacionadas
  DROP CONSTRAINT IF EXISTS enderecospessoasrelacionadas_cdPessoa_fkey,
  ADD CONSTRAINT enderecospessoasrelacionadas_cdPessoa_fkey
    FOREIGN KEY ("cdPessoa")
    REFERENCES cecom.pessoasrelacionadas (id)
    ON DELETE CASCADE;