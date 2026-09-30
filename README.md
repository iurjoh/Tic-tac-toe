# Tic-Tac-Toe / Jogo da velha

Jogo para **duas pessoas no mesmo dispositivo**. Não há multiplayer remoto, bot, conta, placar persistente nem backend.

Revisão aprovada em 30/09/2026. O repositório público foi recriado sem o histórico antigo; esta versão está em `main`. Deploy Cloudflare Pages e link de teste aguardam autorização do novo ID do repo no aplicativo Cloudflare. O antigo GitHub Pages pode estar indisponível durante a troca.

## Como jogar

- X começa. Os jogadores alternam jogadas, escolhendo uma casa vazia.
- Vence quem completa uma linha, coluna ou diagonal. Sem vencedor após nove jogadas, há empate.
- Mouse/toque: selecione uma casa. Teclado: Tab/Shift+Tab percorrem as nove casas e o botão de reinício; Enter ou Espaço fazem a jogada.
- O turno fica visível durante a partida. X é uma cruz; O é um anel.
- As casas continuam disponíveis para consulta após uma jogada, mas não podem ser alteradas.
- Ao terminar, a linha vencedora fica destacada e o foco vai para "Jogar novamente". Reiniciar coloca o foco na primeira casa e X começa.
- Reiniciar uma partida em andamento pede confirmação. "Continuar jogando" ou Escape cancela; "Sim, reiniciar" descarta as jogadas.

## Acessibilidade

Casas são botões nativos, com nomes como "Linha 1, coluna 2, vazia/X/O", `aria-disabled` quando indisponíveis, foco visível e estados independentes da cor. Um `h1`, instruções e `main` organizam o conteúdo. A região `role="status"`, `aria-live="polite"` e `aria-atomic="true"` recebe a jogada, próximo turno e resultado. O resultado não encobre o tabuleiro. A confirmação usa `<dialog>` modal e retorno de foco.

Teclado e árvore acessível foram testados em Chromium, mas **não houve teste auditivo com NVDA, VoiceOver ou outro leitor de tela real**. A emissão do texto no live region foi verificada; o anúncio audível em combinações reais de navegador/leitor de tela ainda precisa ser conferido. Axe sem violações não prova conformidade integral.

## Layout e privacidade

Cabeçalho e conteúdo em fluxo normal, `min-height: 100svh`, tabuleiro proporcional com largura máxima de 300px e limite de 90vw. Em telas curtas, o conteúdo rola verticalmente em vez de sobrepor ou encolher os controles. Largura de 280px sem overflow horizontal foi testada.

Usa fonte de sistema, arquivos locais e favicon SVG. Não usa Google Fonts nem telemetria. A CSP via meta permite scripts, estilos e imagens apenas da própria origem; bloqueia conexões externas, objetos e envio de formulário. `frame-ancestors` não funciona em CSP via meta e não é anunciado como proteção. Recriar o repo retira o histórico antigo do projeto novo, mas não revoga uma chave antiga nem elimina cópias externas.

## Executar localmente

Não há build para jogar. Sirva a pasta por HTTP, pois JavaScript usa módulos:

```sh
python3 -m http.server 8000
# Abra http://localhost:8000
```

## Testes

Node 22+:

```sh
npm test
```

Engine sem dependências de DOM: 20 testes, cobrindo X/O nas oito linhas, empate, reinício, posições inválidas/ocupadas e imutabilidade após o fim. Percurso exaustivo de **255.168 partidas legais completas** comparado com verificador independente: 131.184 vitórias X, 77.904 vitórias O e 46.080 empates.

Para testes de interface e gravação:

```sh
npm ci
npx playwright install chromium ffmpeg
npm run test:browser
# Chromium já instalado: CHROME_PATH=/caminho/do/chrome npm run test:browser
```

Resultados são gerados em `test-results/` (ignorado pelo Git). A suíte usa apenas eventos de teclado para a partida completa e reinício. Relatórios da execução revisada estão em `docs/evidence/`. Capturas e vídeo completos estão no pacote privado de evidências no Drive, listado em `docs/evidence/README.md`; o arquivo fonte ZIP também inclui as capturas.

### Matriz de verificação de 30/09/2026

| Verificação | Resultado / limite |
| --- | --- |
| Engine | 20/20 testes; 255.168 finais equivalentes |
| Teclado | Vitória X e O, empate, bloqueio pós-fim, reinício e confirmação passam |
| Live region | Texto da jogada/turno/resultado e árvore acessível conferidos; anúncio auditivo pendente |
| 320×568, 844×390, 390×844, 1440×900 | Sem sobreposição ou overflow horizontal; rolagem vertical em telas curtas |
| 280×568 | Sem overflow horizontal; tabuleiro proporcional |
| Reflow 200% | Viewport CSS de 320×568 equivalente a 640×1136 a 200%; não teste de zoom real do navegador |
| Axe | Nenhuma violação nos cinco tamanhos e no dialog; contraste em gradiente exigiu revisão manual |
| Rede | Só recursos da própria origem; zero requisições de fonte externa |
| Navegadores/dispositivos | Chromium Linux automatizado; Safari/Firefox/mobile físico pendentes |

## Bugs corrigidos

- Casas em `div` sem operação por teclado ou nome acessível.
- Cabeçalho fixo sobre o tabuleiro em telas pequenas.
- O sólido e preview circular inconsistente.
- Turno indicado apenas por hover.
- Jogada extra aceita após vitória e estado armazenado apenas em classes CSS.
- Resultado enorme em overlay, sem gestão previsível de foco.
- Reinício indisponível durante a partida.
- Fonte externa e infraestrutura Gitpod não usada, incluindo script de telemetria.
- `.github/` ignorada; a regra foi retirada.
- README confundia jogo local de duas pessoas com recursos que não existem.

## Arquivos

- `assets/js/engine.js`: modelo puro de nove posições, turno, resultado e `gameOver`.
- `assets/js/script.js`: interface, eventos, anúncios e foco.
- `tests/engine.test.js`: testes da engine.
- `scripts/browser-check.cjs`: teclado, layout, rede, Axe e vídeo reproduzíveis.
- `docs/REPAIR-2026-09-30.md`: registro de mudanças e limites.
- `docs/evidence/`: índice de evidências privadas e relatórios JSON.

## Origem e créditos

Projeto acadêmico de JavaScript e DOM do curso Full Stack do Code Institute, de Iuri Johansson. A identidade de jogo simples e as regras originais foram mantidas. Imagens antigas e backups de main/revival foram preservados na pasta privada do projeto no Drive, não no novo repositório. O favicon desta revisão é um SVG simples criado para o projeto; não foram acrescentadas imagens de terceiros.

## Metas de qualidade e medições locais

Metas de aceite: Lighthouse Performance >=95, Accessibility/Best Practices/SEO 100; WCAG 2.2 AA manual + Axe sem violações; Nu HTML/CSS sem erros; dependências e segredos sem alertas válidos. Não são certificados.

Em 30/09/2026: Lighthouse 13.5.0, três execuções mobile e três desktop, todas **100/100/100/100**. Mediana e pior valor: 100 em cada categoria. URL HTTP local, perfil limpo; não mede Pages publicado. O primeiro teste havia dado SEO 91 porque `connect-src none` bloqueava a consulta local de robots.txt do Lighthouse; `connect-src self` mantém terceiros bloqueados e permite a consulta da própria origem. No Pages por projeto, robots.txt efetivo pertence à raiz do hostname.

Nu Checker 26.9.30: HTML/CSS com zero erros; dois avisos de CSP na leitura `file:` do HTML, enquanto o teste HTTP de navegador carrega CSS/JS sem erros. O parser CSS foi executado no modo `--css`. npm audit: zero vulnerabilidades conhecidas. Gitleaks 8.30.1: árvore atual sem achados, **histórico com um alerta** em `.vscode/uptime.sh:11`, no commit inicial. Não foi verificada origem/validade da chave nem reescrito o histórico. Esse achado pertence ao repositório anterior, preservado em backup privado. O novo histórico não deve conter o template; será escaneado após criação. A validade/origem da chave antiga e sua revogação continuam pendentes.

Axe deixou `color-contrast` incompleto por não resolver gradiente. Revisão por cálculo: branco tem contraste mínimo conservador >5,48:1 no gradiente; texto do botão >12:1 sobre branco. Pendem WCAG AA completo, TalkBack/VoiceOver/NVDA e zoom UI real. CI/CodeQL não foram configurados. Não se promete A+ de headers/TLS em GitHub Pages. Todos os testes usados foram locais e gratuitos, sem billing.
