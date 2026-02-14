Visão geral do projeto

    O repositório principal é um monorepo simples com duas aplicações:

        cecom.saude.api (backend)

        cecom.saude.web (frontend).
        Isso aparece pela estrutura de pastas e package.json separados em cada app.

    O backend sobe em Express e conecta ao banco via Prisma + adapter PostgreSQL (PrismaPg + pg Pool).

    O frontend é React 19 com Axios, e usa AuthProvider global para controlar sessão/autenticação.

Backend (cecom.saude.api)
Stack e inicialização

    Scripts principais: dev com tsx watch, build via tsc, start em dist/server.js, além de comandos Prisma (generate e migrate).

    O bootstrap conecta no Prisma antes de abrir a porta (PORT default 3001).

Organização por módulos

    O app.ts registra rotas de:

        /auth

        /pacientes

        /profissionais

        e mantém outros módulos comentados (atendimentos, sinais, escalas).

    Há healthcheck em /health e rota protegida de teste (/protected).

Autenticação e autorização

    Login valida payload com Zod (email, senha) e chama serviço de autenticação.

    O serviço:

        busca usuário por chave composta (cdMaster_email)

        compara senha com bcryptjs

        emite JWT com sub, role, cdMaster (expiração 8h).

    Middleware valida Bearer token, verifica JWT e injeta req.user.

    Existe roleGuard para RBAC por perfil (ADMIN, PROFISSIONAL, LEITURA).

    O tipo req.user foi estendido via declaração de tipos do Express, o que melhora segurança de tipo no TS.

Domínio de dados (Prisma)

    O schema mostra um domínio clínico relativamente amplo:

        Master, Paciente, Profissional

        contatos/endereços

        atendimentos, evolução, escalas, etc.
        Isso sugere projeto voltado a prontuário/atendimento multiprofissional.

    Paciente usa chave composta (cdMaster, cdPaciente), enquanto Profissional usa id simples, coerente com os serviços implementados.

Frontend (cecom.saude.web)
Fluxo de autenticação

    App.tsx é direto:

        se loading: mostra mensagem

        se não há user: renderiza Login

        caso contrário: Dashboard.

    AuthContext:

        no carregamento, chama /auth/me

        no login, chama /auth/login, salva token em localStorage

        no logout, remove token e limpa usuário.

    api.ts injeta automaticamente Authorization: Bearer <token> em todas as requests via interceptor Axios.

UI atual

    Login.tsx e Dashboard.tsx estão funcionais, mas minimalistas (sem roteamento real ainda).

    O arquivo PrivateRoute.tsx existe, mas está vazio no momento (provável etapa futura).

Pontos de maturidade (o que já está bom)

    Separação backend/frontend clara.

    Camadas backend em padrão controller/service/dto.

    Uso consistente de validação de entrada com Zod.

    Auth JWT já integrada ponta a ponta (API + Web).

    Prisma como base para escalar CRUDs de módulos clínicos.

Pontos de atenção que encontrei no código

    Em profissional.router.ts, há duas rotas GET "/": uma protegida com authMiddleware + roleGuard(["ADMIN"]) e outra aberta logo abaixo. Isso pode causar comportamento inesperado/duplicado e potencial “bypass” de proteção dependendo da ordem e fluxo do Express.

    Vários módulos já existem no código (atendimentos, sinais, escalas), porém ainda não estão ligados no app.ts (comentados), indicando roadmap em andamento.

    Há logs de debug sensíveis no login web (console.log com dados de credencial), que seria bom remover em ambiente real.

Conclusão rápida

O cecom_2025_1 já tem uma base sólida de sistema clínico com autenticação, modelo de dados rico e arquitetura modular. No estado atual, ele parece estar em fase de consolidação de features (rotas/módulos já criados, parte ainda não exposta), com frontend funcional para login/sessão e backend preparado para evoluir rapidamente com Prisma.