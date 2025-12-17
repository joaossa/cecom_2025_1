-- CreateTable
CREATE TABLE cecom.enderecospessoasrelacionadas (
    "id" SERIAL NOT NULL,
    "cdPessoa" INTEGER NOT NULL,
    "cdEndereco" INTEGER NOT NULL,

    CONSTRAINT enderecospessoasrelacionadas_pkey PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE cecom.enderecospessoasrelacionadas ADD CONSTRAINT enderecospessoasrelacionadas_cdPessoa_fkey FOREIGN KEY ("cdPessoa") REFERENCES cecom.pessoasrelacionadas("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE cecom.enderecospessoasrelacionadas ADD CONSTRAINT enderecospessoasrelacionadas_cdEndereco_fkey FOREIGN KEY ("cdEndereco") REFERENCES cecom.enderecos("id") ON DELETE RESTRICT ON UPDATE CASCADE;
