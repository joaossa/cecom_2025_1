# Fase: Cadastro de Unidade Federativa (API + Web)

## Objetivo
Implementar no sistema o cadastro e manutenção de **Unidade Federativa (UF)** em Configurações, seguindo o mesmo padrão usado para **País**.

Modelo alvo no Prisma:

```prisma
model UnidadeFederacao {
  id          String   @id @db.Char(2)
  descricao   String   @db.VarChar(60)
  cdIbge      Int?
  cdPais      Int

  pais        Pais      @relation(fields: [cdPais], references: [id])
  cidades     Cidade[]

  @@index([cdPais])
  @@map("unidadesfederacao")
}
```

## Escopo entregue

### 1) Ajuste de schema
Arquivo: `cecom.saude.api/prisma/schema.prisma`

- Adicionada relação inversa em `Pais`:
  - `ufs UnidadeFederacao[]`
- Mantida a relação `UnidadeFederacao -> Pais` por `cdPais`.

## 2) Backend/API

### 2.1 Registro de rota
Arquivo: `cecom.saude.api/src/app.ts`

- Import da rota de UF.
- Registro do endpoint base:
  - `/unidades-federacao`

### 2.2 Novo módulo `unidades-federacao`
Pasta: `cecom.saude.api/src/modules/unidades-federacao`

Arquivos criados:
- `unidade-federacao.dto.ts`
- `unidade-federacao.service.ts`
- `unidade-federacao.controller.ts`
- `unidade-federacao.router.ts`

### 2.3 Endpoints implementados
Base: `/unidades-federacao` (todas com `authMiddleware`)

- `GET /`:
  - Lista UFs ordenadas por `descricao`, depois `id`.
- `POST /`:
  - Cria UF.
- `PUT /:id`:
  - Atualiza UF existente.
- `DELETE /:id`:
  - Exclui UF.

### 2.4 Regras de validação (DTO)

Criação (`POST`):
- `id`: obrigatório, exatamente 2 letras (`A-Z`), normalizado para maiúsculo.
- `descricao`: obrigatório, máx. 60, alfanumérico + espaço.
- `cdIbge`: opcional/nulo, inteiro positivo.
- `cdPais`: obrigatório, inteiro positivo.

Atualização (`PUT`):
- Campos opcionais: `descricao`, `cdIbge`, `cdPais`.
- Exige pelo menos 1 campo informado.

### 2.5 Regras de erro e integridade

- `404` quando UF não encontrada (`P2025`).
- `409` ao excluir UF com vínculos (`P2003`):
  - Se houver endereços de pacientes/profissionais vinculados via cidades da UF, retorna mensagem específica.
  - Caso contrário, informa que há cidades vinculadas.

## 3) Frontend/Web
Arquivo: `cecom.saude.web/src/pages/Dashboard.tsx`

### 3.1 Nova opção em Configurações
- Nova entrada no menu lateral:
  - `UF` com subtítulo `Unidades federativas`.

### 3.2 Funcionalidades entregues
- Abas: `Cadastro` e `Listagem`.
- Operações:
  - Listar UFs (`GET /unidades-federacao`).
  - Cadastrar UF (`POST /unidades-federacao`).
  - Editar UF (`PUT /unidades-federacao/:id`).
  - Excluir UF (`DELETE /unidades-federacao/:id`).

### 3.3 Campos no formulário de UF
- `Sigla da UF` (`id`, 2 letras, bloqueado em edição).
- `Descricao`.
- `Codigo IBGE` (opcional).
- `Codigo do Pais` (`cdPais`, obrigatório).

### 3.4 Validações de tela
- `UF`: obrigatória e exatamente 2 letras.
- `Descricao`: obrigatória, máx. 60, alfanumérico + espaço.
- `Codigo IBGE`: numérico inteiro positivo (quando informado).
- `Codigo do Pais`: obrigatório, numérico inteiro positivo.

## 4) Build e geração
Executado nesta fase:

- API:
  - `npm run prisma:generate`
  - `npm run build`
- Web:
  - `npm run build`

Status: **build da API e Web concluídos com sucesso**.

## 5) Arquivos alterados/criados (resumo)

### API
- Alterado: `cecom.saude.api/prisma/schema.prisma`
- Alterado: `cecom.saude.api/src/app.ts`
- Criado: `cecom.saude.api/src/modules/unidades-federacao/unidade-federacao.dto.ts`
- Criado: `cecom.saude.api/src/modules/unidades-federacao/unidade-federacao.service.ts`
- Criado: `cecom.saude.api/src/modules/unidades-federacao/unidade-federacao.controller.ts`
- Criado: `cecom.saude.api/src/modules/unidades-federacao/unidade-federacao.router.ts`
- Atualizados (gerados): `cecom.saude.api/src/generated/prisma/*`

### Web
- Alterado: `cecom.saude.web/src/pages/Dashboard.tsx`

## 6) Próximo refinamento sugerido
- Substituir o campo manual `Codigo do Pais` no formulário de UF por um `select` com os países cadastrados, reduzindo erro de digitação e melhorando usabilidade.
