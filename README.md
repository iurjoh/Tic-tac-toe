# Tic-tac-toe - accessible two-player game

**English** | [Português (Brasil)](README.pt-BR.md)

## Demo

[![Open demo](https://img.shields.io/badge/demo-live-2ea44f)](https://tic-tac-toe-revival.pages.dev/)

Open in your browser. No installation or terminal required.

A two-player, same-device tic-tac-toe game from the Code Institute JavaScript course. No bot, remote multiplayer, accounts or persistent scoreboard.

**Source / Código:** https://github.com/iurjoh/Tic-tac-toe

**Inspected commit / Commit inspecionado:** `8f36d4e3a2ef5408ad94a313803d915dac97763b`

Mobile capture prepared on 2026-10-08; repository upload is pending. No image embed is included until the asset exists.

Mobile capture: 390x844, 2026-10-08. Repository upload remains pending.

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

## Release identity

The source reviewed here is on `main`, at the inspected commit above. The live URL opened on 2026-10-08. The historical release record describes Cloudflare Direct Upload, not automatic Git deployment. The exact commit currently served by that host is **unverified**; the source commit above is not a deploy attestation. Before the next release, record source SHA, build/upload date, deployment ID, live smoke result and rollback artifact together.

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

## Technology and effort snapshot

Captured from repository sources on 2026-10-14. This is a source snapshot, not a claim about production versions or the technology available at the original launch.

- **Stack at this snapshot:** HTML, CSS and native JavaScript; no browser runtime framework. package.json declares Node >=22 for development/test commands, not as a browser requirement.
- **Earlier record:** The repository was recreated for the 2026 revival; original academic commit history is not present.
- **Observed calendar window:** 2026-09-30 to 2026-10-09: surviving commits reachable from main. Calendar span, not continuous work or time to launch.
- **Pull requests:** 2 visible PRs: 0 open, 2 closed, captured 2026-10-14 before this documentation change. Closed does not mean merged. Deleted/recreated history is excluded.
- **Decision and reason:** Separating game rules from the DOM makes legal game paths testable while keeping keyboard and screen-reader controls in the UI.
- **Estimated active effort:** unavailable. No reliable time log or bounded work-session reconstruction was established. Commit count and elapsed calendar time are not converted into hours.

Evidence: current dependency/source files named above, retained Git history and the repository PR list. Versions and counts are fixed to this snapshot, not live counters.
