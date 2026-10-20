# Regression and gotcha register

Quality trial started 2026-10-20. Review friction around 2026-11-20. Pass counters below record new, independently evidenced runs only, not historical results.

## Regressions

No regression checks recorded yet. Entry format: - [YYYY-MM-DD] <bug> -> check: <deterministic re-run command> | consecutive passes: n/5. Do not record historical results as passes.

Five recorded consecutive passes make a check eligible for automation; adding CI is a separate code change. Record revision, environment and evidence before increasing a count. No automatic edits or release approval follow from a counter.

## Gotchas


- [2026-10-20] The "20/20 tests" claim dates from the revival QA run and needs a fresh re-run to stay true; changes need matching tests | source: revival status record, 2026-10-08 | version: current | validity: re-verify on every change | projects: Tic-tac-toe.
- [2026-10-20] Mobile dead space after the last content block: the pattern appeared in Falun and recurred across projects; check page bottoms on small screens after layout changes | source: owner-ordered cross-project sweep 2026-10-13 + Falun mobile fix 2026-10 | version: current | validity: standing | projects: Tic-tac-toe, Falun (2nd project: propose promotion to a shared rule).

## Check entry points

Inspect package.json / test tooling. Live on Cloudflare Pages. Report exactly what ran and where.

If a gotcha is independently observed in a second project, propose a shared rule with both sources.
