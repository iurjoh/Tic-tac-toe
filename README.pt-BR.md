# Tic-tac-toe - jogo acessível para duas pessoas

**Português (Brasil)** | [English](README.md)

## Demo

[![Abrir demo](https://img.shields.io/badge/demo-live-2ea44f)](https://tic-tac-toe-revival.pages.dev/)

Abra no navegador, sem instalar nada ou usar o terminal.

Jogo da velha para duas pessoas no mesmo aparelho, do curso JavaScript do Code Institute. Sem bot, multiplayer remoto, conta ou placar persistente.

**Source / Código:** https://github.com/iurjoh/Tic-tac-toe

**Inspected commit / Commit inspecionado:** `8f36d4e3a2ef5408ad94a313803d915dac97763b`

Captura mobile preparada em 08/10/2026; upload no repositório pendente. Sem imagem embutida até o asset existir.

Captura mobile: 390x844, 08/10/2026. Upload no repositório ainda pendente.

## Ideia e planejamento

Manter regras simples e tornar estado/teclado previsíveis. Revival corrige estado dependente de CSS, casas inacessíveis, overlay de resultado e reinício.

## Funcionalidades e limites

Turnos X/O, vitórias/empates, proteção das casas, feedback e confirmação de reinício. Sem sugerir recursos inexistentes.

## Arquitetura

Engine puro em assets/js/engine.js; DOM em assets/js/script.js; HTML/CSS local e favicon SVG. Node testa modelo; browser-check cobre suite UI separada.

## Design e capturas

Fundo gradiente, casas como buttons nativos, foco visível e X/O independente da cor. Modal/live status documentados; escuta em leitor de tela real pendente.

## Histórico do build

Jogo acadêmico DOM; correção de setembro de 2026 separa modelo/UI e adiciona proteção, acessibilidade/testes. Repo recriado; não afirmar que histórico antigo permanece. Em 1º de outubro, README PT.

## Desempenho

README anterior registra Lighthouse local 100 em 30/09/2026. Não repetido nem certificado atual de produção. Runtime usa assets locais sem build.

## Segurança e privacidade

Sem conta/dataset pessoal. Preservar CSP local; meta frame-ancestors não é proteção. Achados históricos de telemetria não provam validade/revogação atual.

## Evidência de testes

08/10/2026: node --test 20/20, incluindo 255168 jogos legais contra oracle independente. Primeiro movimento ao vivo atualizou X/O; layout inicial móvel inspecionado. Partida/reinício completos, suite UI, leitor de tela e benchmark não repetidos.

## Executar localmente

```sh
node --test
python3 -m http.server 8000
```

## Identidade da release

O código revisado está no `main`, no commit inspecionado acima. A URL ao vivo abriu em 08/10/2026. O registro histórico descreve Direct Upload no Cloudflare, não deploy Git automático. O commit exato servido hoje pelo host **não foi confirmado**; o commit de código acima não atesta o deploy. Na próxima release, registrar SHA, data de build/upload, ID do deploy, smoke ao vivo e artefato de rollback juntos.

## Publicação e roadmap

Rever jogo/reinício completos ao vivo, teclado/leitor, capturas tablet/desktop e audits. Verificar atualização do deploy: Direct Upload histórico não é sync Git automático.

Nenhuma configuração de host/custo/branch alterada ou reconferida. Página acessível não prova paridade source/deploy.

## Créditos e licença

Projeto acadêmico JavaScript/DOM Code Institute. Favicon SVG local e identidade original preservada.

Sem LICENSE na raiz inspecionada. Não anunciar MIT antes de conferir direitos autorais/terceiros e aprovar licença. Nenhuma licença alterada.

## Atribuições originais preservadas

### Origin and credits

Academic JavaScript and DOM project from the Code Institute Full Stack course, by Iuri Johansson. The simple game identity and the original rules were kept. Old images and main/revival backups were preserved in the project's private Drive folder, not in the new repository. This revision's favicon is a simple SVG created for the project; no third-party images were added.

### Quality goals and local measurements
