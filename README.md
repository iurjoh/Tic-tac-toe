# Tic-tac-toe - portfolio revival review

**English** | [Português (Brasil)](README.pt-BR.md)

A two-player, same-device tic-tac-toe game from the Code Institute JavaScript course. No bot, remote multiplayer, accounts or persistent scoreboard.

Documentation draft, 2026-10-08. Public source; no publication or code change made by this review.

**Source / Código:** https://github.com/iurjoh/Tic-tac-toe

**Inspected commit / Commit inspecionado:** `8f36d4e3a2ef5408ad94a313803d915dac97763b`

**Live demo:** https://tic-tac-toe-revival.pages.dev/

Mobile capture prepared on 2026-10-08; repository upload is pending. No image embed is included until the asset exists.

390x844, 2026-10-08. New capture supplied in this review package; upload together with the README.

## Idea and planning

Keep simple game rules while making state and keyboard operation predictable. The revival record fixes the original CSS-driven state, inaccessible cells, result overlay and restart behavior.

## Features and limits

X/O turns, wins/draws, guarded cells, result feedback and restart confirmation. No unsupported features are implied.

## Architecture

Pure JavaScript engine in assets/js/engine.js; DOM layer in assets/js/script.js; local HTML/CSS and SVG favicon. Node test runner validates the model; browser-check script handles a separate UI suite.

## Design and screenshots

Gradient background, native button cells, visible focus and color-independent X/O marks. Modal restart and live status are documented; full screen-reader listening tests remain pending.

## Build history

Academic DOM game; September 2026 repair separates model/UI and adds guards, accessibility and tests. Repo recreated; do not pretend old commit history is still present. The October 1 commit adds Portuguese documentation.

## Performance

Previous README records local Lighthouse 100s on 2026-09-30. Not rerun here and not a current production certificate. Runtime uses local assets without a build step.

## Security and privacy

No account or personal dataset is needed. Preserve local-asset CSP limits and do not call meta frame-ancestors protection. Historical telemetry findings are not proof of present key validity or revocation.

## Testing evidence

2026-10-08: node --test passed 20/20, including all 255168 complete legal game paths against an independent oracle. Live first move updated X/O state; mobile initial layout visually inspected. Full match/restart, UI suite, screen reader and fresh benchmark were not rerun.

## Run locally

```sh
node --test
python3 -m http.server 8000
```

## Deployment and roadmap

Recheck complete live game and restart modal; keyboard/screen-reader tests; tablet/desktop screenshots; fresh audits; verify deployment update path, since historical Direct Upload is not automatic Git sync.

No hosting account/cost settings or deployment branch were changed or freshly verified. Reachable pages do not prove source/deployment parity.

## Credits and license

Code Institute JavaScript/DOM academic project. Local SVG favicon and retained original game identity.

No root LICENSE exists in the inspected checkout. Do not advertise MIT until original-code rights and third-party terms are checked and a license is approved. No license changed.


## Retained original attributions

### Origin and credits

Academic JavaScript and DOM project from the Code Institute Full Stack course, by Iuri Johansson. The simple game identity and the original rules were kept. Old images and main/revival backups were preserved in the project's private Drive folder, not in the new repository. This revision's favicon is a simple SVG created for the project; no third-party images were added.

### Quality goals and local measurements
