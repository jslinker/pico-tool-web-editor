# Distilling picotool-js into a portable JavaScript engine

The browser integration now validates a useful boundary: command semantics can run entirely on named byte inputs and return named byte/text outputs. The CLI and web app should remain presentation adapters around that boundary.

## Recommended package shape

1. Make `src/browser-commands.js` a runtime-neutral command service (rename it to `commands.js`). It should accept `{ name, bytes }` inputs, explicit module maps, and options, then return structured results and per-file errors. The Node CLI should use the same service and only translate argv, filesystem reads/writes, and terminal text.
2. Keep `bytes.js`, `portable-path.js`, parsing, serialization, Lua analysis, transformations, statistics, search, and builds in the core. Avoid `Buffer`, `process`, DOM, and filesystem calls in this graph.
3. Keep `file-api.js`, CLI argv/help formatting, atomic filesystem replacement, and directory walking in a Node adapter. Move `Game.fromFile()` and `Game.toFile()` out of the browser dependency graph; portable `fromBytes()`/`toBytes()` methods belong in core.
4. Publish explicit conditional exports, for example `@pico8-studio/picotool`, `/commands`, `/node`, and `/cli`. Do not use the `browser` field to expose a smaller feature set.
5. Define and export TypeScript request/result types for every command. A discriminated `ok` result plus `results[]` and `errors[]` gives batch consumers better information than CLI exit status.
6. Pass external resources explicitly. `build` already benefits from an in-memory module map and portable lookup templates; use the same pattern for includes and any future label/image resources.
7. Keep transport codecs replaceable. PNG decode/encode may use `fast-png`, but cartridge embedding should continue to consume and return `Uint8Array` independently of that package.

## Release steps

- Add the browser-command test to the required suite and run it in a real browser as well as Node-without-Node-globals.
- Keep the browser build warning-free; the duplicate AST object keys discovered by esbuild during this integration have been removed.
- Publish or push the engine revision containing the portable command service, then update this app's pinned Git dependency and regenerate `vendor/picotool.js`. The committed bundle currently bridges that publication gap.
- After the shared command service is stable, simplify `src/cli.js` by deleting its duplicated async command implementations in favor of filesystem-to-command request adapters.
- Add golden tests asserting that CLI-rendered output and browser structured results derive from the same command result for text and PNG carts.

This leaves picotool-js as a pure processing package with two thin consumers: a Node CLI adapter and this GitHub Pages UI.
