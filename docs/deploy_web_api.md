# Deploy Web + API (Local e Producao)

## Importante
- `GitHub Pages` hospeda apenas site estatico (HTML/CSS/JS).
- A API Node/Express precisa ser publicada em outro servico (Render, Railway, Fly.io, VPS etc.).

## 1) Desenvolvimento local

### API (`cecom.saude.api`)
1. Crie `.env` a partir de `.env.example`.
2. Defina `PORT=3001` (ou outra porta).
3. Rode:
```bash
npm run dev
```

### Web (`cecom.saude.web`)
1. Use `.env.development` com:
```env
VITE_API_BASE_URL=http://localhost:3001
```
2. Rode:
```bash
npm run dev
```

## 2) Publicar API (servidor)
1. Suba o projeto `cecom.saude.api` para um servico de Node.
2. Configure variaveis:
- `DATABASE_URL`
- `JWT_SECRET`
- `PORT` (se o provedor exigir)
- `CORS_ORIGINS=https://joaossa.github.io`
3. Comando de build/start:
- Build: `npm run build`
- Start: `npm start`

## 3) Publicar Web (GitHub Pages)
1. Em `cecom.saude.web/.env.production`, ajuste:
```env
VITE_API_BASE_URL=https://SUA-API-PUBLICA.exemplo.com
```
2. No diretorio `cecom.saude.web`:
```bash
npm install
npm run deploy
```
3. No repositório GitHub, ative Pages para branch `gh-pages`.

## 4) Fluxo recomendado
1. Altere codigo em `src`.
2. Teste localmente com API local.
3. Publique API.
4. Atualize `VITE_API_BASE_URL` de producao.
5. Publique web no GitHub Pages.
