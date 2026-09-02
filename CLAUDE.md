Refer to README.md for how this library is structured, built and shared to Webflow. The data
pipeline that feeds it lives in the sibling repo `rewiring-district-pages` — read its
PRACTICES.md and docs/CRITICAL.md; the same conventions apply here.

## Where the risk is

Webflow renders every code component inside its own **shadow root**. Anything that works in a plain
React page but relies on the document — `getElementById`, a stylesheet in `<head>`, a fragment link —
silently does nothing on the live site. Test standalone components in a harness that mounts them
with `attachShadow` (see `src/app/region-anchor-test`, `region-simple-test`), never only in the
plain preview page.

## Guardrails

- Run `npm run typecheck` and `npm test` before every commit. Never delete or skip a test to get a
  commit through; if behaviour is meant to change, change the test and say so.
- Never hand-edit the generated files: `districtData.ts`, `reportContent.ts`, `reportTabs.ts`,
  `reportEditable.ts`. They come from `build/build_components.py` and `build/build_editable_text.py`
  in `rewiring-district-pages`.
- `npx webflow library share` publishes the WHOLE library to the client's workspace. Say so before
  running it. Designers still have to accept the update and republish the site; verify the live
  pages afterwards with `tests/e2e/live_report_check.py` in the sibling repo.
- Every Webflow Link prop reads `"#"` when left blank — treat `#` as unset.
- Colours are Text props (the SDK has no Color prop). All CSS is scoped per component with
  `useId()`; there is no shared stylesheet.

## Your role

Ask, don't assume. Simple solutions for simple problems. Don't touch unrelated code — surface what
you find instead. Flag uncertainty explicitly, and suggest better paths when you see them.
