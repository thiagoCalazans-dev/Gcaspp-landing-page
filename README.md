# GCASPP — Landing page

Projeto independente da landing page institucional da GCASPP.

## Especificação

- [Landing page institucional](docs/specs/landing-page-institucional.md) — decisões de conteúdo, experiência, contato comercial e verificação ([issue #1](https://github.com/thiagoCalazans-dev/Gcaspp-landing-page/issues/1)).

## Executar localmente

```sh
npm ci
npm run dev
```

A página fica disponível em `http://127.0.0.1:4173`. É estática; para publicar, basta servir os arquivos do repositório como raiz do site.

## Prévia no GitHub Pages

Em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, a branch `codex/1-landing-page-institucional` e a pasta `/(root)`. A prévia ficará em `https://thiagocalazans-dev.github.io/Gcaspp-landing-page/`. A branch do PR continua aberta para revisão. Depois de aprovar e mesclar o PR, altere a origem do Pages para `main` e `/(root)`.

## Verificação

```sh
npx playwright install chromium
npm test
```

Os testes usam o navegador Brave quando ele está instalado em `/opt/brave.com/brave-origin/brave`; em outros ambientes usam o Chromium instalado pelo Playwright. Também é possível informar `CHROME_PATH`.

## Assets

O símbolo foi adaptado do logotipo público da GCASPP. A imagem de arquitetura é uma ilustração editorial gerada para este projeto e não representa um cliente ou prédio específico. As fontes DM Sans e DM Serif Display são servidas localmente; suas licenças estão em `assets/fonts/`.
