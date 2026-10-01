# Tic-Tac-Toe / Jogo da velha

[Português (Brasil)](README.pt-BR.md) | **English**

A game for **two people on the same device**. There is no remote multiplayer, bot, account, persistent scoreboard or backend.

Review approved on 2026-09-30. The public repository was recreated without the old history; this version lives on `main`. Published on Cloudflare Pages via Direct Upload on 2026-09-30: https://tic-tac-toe-revival.pages.dev/ . The old GitHub Pages was replaced by this test link. The Pages Git connection stayed blocked; updates are not automatic and require a new Direct Upload.

## How to play

- X starts. Players alternate turns, choosing an empty cell.
- Whoever completes a row, column or diagonal wins. With no winner after nine moves, it is a draw.
- Mouse/touch: select a cell. Keyboard: Tab/Shift+Tab move through the nine cells and the restart button; Enter or Space makes the move.
- The current turn stays visible during the match. X is a cross; O is a ring.
- Cells remain available for review after a move but cannot be changed.
- When the game ends, the winning line is highlighted and focus moves to "Play again". Restarting puts focus on the first cell and X starts.
- Restarting a match in progress asks for confirmation. "Keep playing" or Escape cancels; "Yes, restart" discards the moves.

## Accessibility

Cells are native buttons, with names like "Row 1, column 2, empty/X/O", `aria-disabled` when unavailable, visible focus and states independent of color. One `h1`, instructions and `main` organize the content. The `role="status"` region, `aria-live="polite"` and `aria-atomic="true"` receives the move, next turn and result. The result does not cover the board. Confirmation uses a modal `<dialog>` with focus return.

Keyboard and the accessible tree were tested in Chromium, but **there was no listening test with NVDA, VoiceOver or another real screen reader**. The text output in the live region was verified; the audible announcement in real browser/screen-reader combinations still needs to be checked. Axe with no violations does not prove full conformance.

## Layout and privacy

Header and content in normal flow, `min-height: 100svh`, proportional board with a maximum width of 300px and a 90vw limit. On short screens the content scrolls vertically instead of overlapping or shrinking the controls. A 280px width with no horizontal overflow was tested.

It uses a system font, local files and an SVG favicon. No Google Fonts or telemetry. The CSP via meta allows scripts, styles and images only from the same origin; it blocks external connections, objects and form submission. `frame-ancestors` does not work in a meta CSP and is not advertised as protection. Recreating the repo removes the old history from the new project, but does not revoke an old key or eliminate external copies.

## Run locally

There is no build to play. Serve the folder over HTTP, because the JavaScript uses modules:

```sh
python3 -m http.server 8000
# Open http://localhost:8000
```

## Tests

Node 22+:

```sh
npm test
```

Engine with no DOM dependencies: 20 tests, covering X/O on all eight lines, draw, restart, invalid/occupied positions and immutability after the end. An exhaustive run of **255,168 complete legal games** compared against an independent checker: 131,184 X wins, 77,904 O wins and 46,080 draws.

For interface tests and recording:

```sh
npm ci
npx playwright install chromium ffmpeg
npm run test:browser
# Chromium already installed: CHROME_PATH=/path/to/chrome npm run test:browser
```

Results are generated in `test-results/` (ignored by Git). The suite uses only keyboard events for the full match and restart. Reports from the reviewed run are in `docs/evidence/`. Full captures and video are in the private evidence package on Drive, listed in `docs/evidence/README.md`; the source ZIP archive also includes the captures.

### Verification matrix of 2026-09-30

| Check | Result / limit |
| --- | --- |
| Engine | 20/20 tests; 255,168 equivalent game endings |
| Keyboard | X and O win, draw, post-end blocking, restart and confirmation pass |
| Live region | Move/turn/result text and accessible tree checked; audible announcement pending |
| 320×568, 844×390, 390×844, 1440×900 | No overlap or horizontal overflow; vertical scrolling on short screens |
| 280×568 | No horizontal overflow; proportional board |
| 200% reflow | 320×568 CSS viewport equivalent to 640×1136 at 200%; not a real browser zoom test |
| Axe | No violations at the five sizes and in the dialog; contrast on gradient required manual review |
| Network | Same-origin resources only; zero external font requests |
| Browsers/devices | Automated Linux Chromium; Safari/Firefox/physical mobile pending |

## Fixed bugs

- Cells as `div`s with no keyboard operation or accessible name.
- Fixed header over the board on small screens.
- Solid O and circular preview inconsistent.
- Turn indicated only on hover.
- Extra move accepted after a win and state stored only in CSS classes.
- Huge result overlay, without predictable focus management.
- Restart unavailable during the match.
- Unused external font and Gitpod infrastructure, including a telemetry script.
- `.github/` ignored; the rule was removed.
- The README confused a local two-person game with features that do not exist.

## Files

- `assets/js/engine.js`: pure model of nine positions, turn, result and `gameOver`.
- `assets/js/script.js`: interface, events, announcements and focus.
- `tests/engine.test.js`: engine tests.
- `scripts/browser-check.cjs`: reproducible keyboard, layout, network, Axe and video checks.
- `docs/REPAIR-2026-09-30.md`: record of changes and limits.
- `docs/evidence/`: index of private evidence and JSON reports.

## Origin and credits

Academic JavaScript and DOM project from the Code Institute Full Stack course, by Iuri Johansson. The simple game identity and the original rules were kept. Old images and main/revival backups were preserved in the project's private Drive folder, not in the new repository. This revision's favicon is a simple SVG created for the project; no third-party images were added.

## Quality goals and local measurements

Acceptance goals: Lighthouse Performance >=95, Accessibility/Best Practices/SEO 100; manual WCAG 2.2 AA + Axe with no violations; Nu HTML/CSS with no errors; dependencies and secrets with no valid alerts. These are not certificates.

On 2026-09-30: Lighthouse 13.5.0, three mobile runs and three desktop runs, all **100/100/100/100**. Median and worst value: 100 in every category. Local HTTP URL, clean profile; does not measure the published Pages deploy. The first test had scored SEO 91 because `connect-src none` blocked Lighthouse's local robots.txt query; `connect-src self` keeps third parties blocked and allows the same-origin query. On per-project Pages, the effective robots.txt belongs to the hostname root.

Nu Checker 26.9.30: HTML/CSS with zero errors; two CSP warnings when reading the HTML via `file:`, while the browser HTTP test loads CSS/JS with no errors. The CSS parser was run in `--css` mode. npm audit: zero known vulnerabilities. Gitleaks 8.30.1: current tree with no findings, **history with one alert** in `.vscode/uptime.sh:11`, in the initial commit. The key's origin/validity was not verified and the history was not rewritten. That finding belongs to the previous repository, preserved in a private backup. The new repo's history was scanned with Gitleaks 8.30.1: 17 commits, zero findings. The previous repo's backups remain private on Drive. The old key's validity/origin and its revocation remain pending.

Axe left `color-contrast` incomplete because it cannot resolve gradients. Calculation review: white has a conservative minimum contrast >5.48:1 on the gradient; button text >12:1 over white. Full WCAG AA, TalkBack/VoiceOver/NVDA and real UI zoom remain pending. CI/CodeQL were not configured. No A+ headers/TLS grade is promised on GitHub Pages. All tests used were local and free, with no billing.

## Verified publication

On 2026-09-30, the public URL and the favicon answered HTTP 200. A full match, result, focus and restart were checked in the browser on the published site. There was a 522 response during initial propagation, followed by 200. The Lighthouse measurements above remain local, not scores for this deploy. Existing project on the free plan; no upgrade or charge was started.
