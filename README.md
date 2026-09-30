# PICO Tool Web Editor

A planned GitHub Pages interface for [picotool-js](https://github.com/jslinker/picotool-js). Select local PICO-8 cartridges, inspect and manipulate them in the browser, then download the results. Processing will happen locally without uploading cartridges or requiring PICO-8, Python, or a backend.

**Status:** static interface prototype and engine dependency only. The controls in `index.html` are visual stubs; cartridge processing and deployment are not implemented. Unchecked items are browser TODOs, not missing Node CLI features.

**Architecture goal:** building this interface should also distill picotool-js into a complete, platform-agnostic JavaScript engine. Shared cartridge processing belongs in the engine; browser UI, file selection, downloads, and hosting belong here. Resolve portability gaps in the sibling `../picotool-js` checkout rather than duplicating engine logic or maintaining a reduced browser API. See [AGENTS.md](AGENTS.md) for guidance on working across both repositories.

## Engine and setup

The engine's package name is `@pico8-studio/picotool`. It is installed from GitHub, pinned to commit [`4cecfaf`](https://github.com/jslinker/picotool-js/tree/4cecfafe1291e4f4d874dcf1082c55f870ee0fa3) (package version `0.1.0`), inspected on September 30, 2026. The lockfile fixes transitive dependencies; no npm registry release is assumed.

Install Node.js and npm, then run from this repository:

```sh
npm ci
npm run p8tool -- --help
npm run p8tool -- stats path/to/game.p8
npm run p8tool -- build --lua path/to/main.lua output.p8
```

Development setup uses Node.js 26.7.0 and npm 11.19.0; upstream does not declare a minimum Node version. Visitors to the future site will only need a browser.

## Framework-free JavaScript entry points

[`app.js`](app.js) exposes one function for each of the ten supported CLI commands. The functions are independent of the DOM and UI controls, so they can be called directly from Node tests, browser developer tools, or future interface event handlers.

```js
const PicoToolWeb = require("./app.js");

await PicoToolWeb.cli.stats({ cartridges, csv: true });
await PicoToolWeb.cli.luamin({ cartridges, keepAllNames: true });
await PicoToolWeb.executeCliCommand("build", buildRequest);
```

The same API is available in the browser as `window.PicoToolWeb`. Entry points are grouped under `commandGroups.inspectAndSearch`, `commandGroups.rewriteMinifyAndFormat`, and `commandGroups.buildAndCombine`, while `cli` provides a flat command registry. Until the portable engine is connected, each command returns a structured `NOT_IMPLEMENTED` result.

Tests can inject a DOM-free adapter with `createPicoToolWebApi({ engineAdapter })`; adapter methods use the exact CLI command names. Run the entry-point contract tests with:

```sh
npm test
```

## Node CLI inventory and browser TODOs

This inventory follows the [CLI source](https://github.com/jslinker/picotool-js/blob/4cecfafe1291e4f4d874dcf1082c55f870ee0fa3/src/cli.js), including options omitted from abbreviated help. All ten commands are covered below. Use `npm run p8tool -- COMMAND ...` to run them here.

Cartridge inputs accept `.p8` and `.p8.png`. Inspection and rewrite commands accept multiple inputs; `build` takes one output filename. Raw `.lua` is a build source, not a general cartridge input.

### Inspect and search

| Command | Supported Node behavior | Options |
| --- | --- | --- |
| `stats` | Title, byline, code version, line count, character count, token count, compressed code size. | `--csv` exports a CSV report. |
| `listlua` | List Lua, optionally converting supported PICO-8 shorthand to ordinary Lua syntax. | `--show-line-numbers` (zero-based), `--pure-lua`; combinable. |
| `listrawlua` | List raw Lua without normal token echo transformation; PNG code is decompressed first. | `--show-line-numbers` (zero-based). |
| `listtokens` | Display Lua token indexes and values, plus whitespace and comments. | None. |
| `printast` | Print the Lua abstract syntax tree. | None. |
| `luafind` | Search lines using a JavaScript regular expression; output filename, one-based line number, and matching line. Pattern precedes filenames, despite its omission from help. | `--listfiles` lists each matching filename once. |

```sh
npm run p8tool -- stats --csv game.p8 other.p8.png
npm run p8tool -- listlua --pure-lua --show-line-numbers game.p8
npm run p8tool -- listrawlua game.p8.png
npm run p8tool -- listtokens game.p8
npm run p8tool -- printast game.p8
npm run p8tool -- luafind --listfiles 'print|spr' game.p8 other.p8.png
```

- [ ] Show cartridge statistics and download CSV for one or multiple cartridges.
- [ ] Show Lua with optional line numbers and shorthand conversion.
- [ ] Show raw Lua with optional line numbers; allow Lua text download.
- [ ] Provide a token inspector.
- [ ] Provide an AST inspector.
- [ ] Search selected cartridges with regexes; show matching lines or filenames and report invalid patterns.

CLI listings sanitize some non-ASCII/P8SCII characters to `_`; they are diagnostic views, not lossless cartridge exports. Preserve engine bytes/P8SCII when editing and exporting cartridges. Pure Lua conversion does not provide a PICO-8 runtime.

### Rewrite, minify, and format

| Command | Supported Node behavior | Options |
| --- | --- | --- |
| `writep8` | Rewrite through the default cartridge writer; PNG input still produces PNG output. | None. |
| `luamin` | Minify Lua, including name shortening. | `--keep-all-names` disables name shortening; `--keep-names-from-file FILE` preserves listed names. |
| `luafmt` | Format Lua through the AST formatter. | `--indentwidth N` (default `2`); `--overwrite` writes a `.p8` input in place. |

All three normally write `game_fmt.p8` or `game_fmt.p8.png`; existing outputs can be replaced without prompting. `luafmt --overwrite` does not overwrite PNG input in place. PNG rewrites preserve the input's visible label. Name files contain one name per line; blank lines and lines starting with `#` after trimming are ignored.

- [ ] Rewrite selected cartridges and download results.
- [ ] Minify Lua with keep-all-names and uploaded name-list controls.
- [ ] Format Lua with an indentation control.
- [ ] Preview transformed Lua and updated statistics before export.
- [ ] Support batch transformations, distinct download names, and per-file errors.

### Build and combine cartridges

`build` creates a cartridge or updates an existing output, retaining sections not replaced or cleared. The output extension selects `.p8` or `.p8.png`.

| Option | Supported source / effect |
| --- | --- |
| `--lua FILE` | Lua from `.lua`, `.p8`, or `.p8.png`. Raw Lua supports `require()` module bundling. |
| `--gfx FILE` | Sprite graphics from `.p8` or `.p8.png`. |
| `--gff FILE` | Sprite flags from `.p8` or `.p8.png`. |
| `--map FILE` | Map data from `.p8` or `.p8.png`. |
| `--sfx FILE` | Sound effects from `.p8` or `.p8.png`. |
| `--music FILE` | Music patterns from `.p8` or `.p8.png`. |
| `--empty-lua`, `--empty-gfx`, `--empty-gff`, `--empty-map`, `--empty-sfx`, `--empty-music` | Clear the named section. Combining a source and its empty option is an error. |
| `--lua-path PATH` | Semicolon-separated module lookup templates with `?` replaced by the module name, e.g. `modules/?.lua;?.lua`. Default: `?;?.lua`. |
| `--lua-minify` | Minify assembled Lua; supports `--keep-all-names` and `--keep-names-from-file FILE`. |
| `--lua-format` | Format assembled Lua with indentation `2`. Build has no `--indentwidth` option. |

```sh
npm run p8tool -- build --lua main.lua --gfx art.p8.png --sfx sounds.p8 game.p8
npm run p8tool -- build --lua main.lua --lua-path 'modules/?.lua;?.lua' --lua-minify game.p8.png
npm run p8tool -- build --empty-music existing.p8
```

The CLI accepts both format and minify flags but formatting wins; the browser should make them mutually exclusive. `require()` paths must be string literals, cannot contain `./` or `../`, and cannot start with `/`. Bundling follows nested dependencies and removes module game-loop functions by default; `require("module", {use_game_loop=true})` retains them. Missing modules and invalid syntax are errors.

New PNG builds use a blank visible label; updating an existing PNG preserves that destination's label. There is no CLI custom-label option.

- [ ] Create an empty cartridge or select an existing cartridge as the build base.
- [ ] Choose source cartridges independently for graphics, flags, map, sound effects, and music.
- [ ] Choose Lua from a raw source file or cartridge.
- [ ] Clear any of the six sections, preventing conflicting replace/clear choices.
- [ ] Select modules into an in-memory file tree, retaining relative paths, and support lookup templates and nested bundling.
- [ ] Select unchanged, formatted, or minified Lua, including name-preservation settings.
- [ ] Export assembled `.p8` or `.p8.png` cartridges with applicable label preservation.

### Shared CLI behavior

- `-h` / `--help` works globally and per command.
- `--` ends option parsing for filenames or patterns beginning with `-`.
- Value-bearing options accept `--option value` and `--option=value`.
- Global `-q` / `--quiet` and `--debug` are parsed before the command but do not change output in this revision. They are not functional features to reproduce.
- Errors include unsupported extensions, unreadable/malformed cartridges, invalid Lua or regexes, missing modules, conflicting build sources, and write failures. Multi-file commands may continue after input failures; exit status is not a complete per-file success report.

## Browser delivery TODOs

These support the website workflow; they are not additional CLI commands.

- [ ] Verify a browser bundle of the pinned engine before choosing application architecture.
- [ ] Expose required CLI-equivalent operations through engine APIs/adapters; replace filesystem access and path resolution with selected-file bytes and an in-memory file map.
- [ ] Select single/multiple local cartridges and supporting Lua/name files; keep cartridge contents on the device.
- [ ] Maintain an editable working copy and allow returning to the original.
- [ ] Download results without modifying local originals; support text/PNG conversion through engine APIs.
- [ ] Surface parsing, transformation, build, and export errors with file context.
- [ ] Verify text/PNG round trips, section preservation, P8SCII, labels, batch behavior, and each transformation in the browser.
- [ ] Build a static site with correct GitHub Pages repository-subpath asset URLs.
- [ ] Add a GitHub Actions build/deployment workflow and verify local import → manipulation → export on the deployed site.

**Integration gap:** the [browser entry point](https://github.com/jslinker/picotool-js/blob/4cecfafe1291e4f4d874dcf1082c55f870ee0fa3/src/browser.js) exports core parsing, section models, PNG transport, game data, tokens, and AST utilities. It does not expose all Node writers, minification, builds, includes, statistics, search, or file helpers. Some underlying paths depend on `Buffer`, `node:path`, or filesystem access. Full CLI parity in the browser remains unverified.

## Unsupported and separate-scope features

- `build --optimize-tokens` is accepted but unimplemented; requesting it for raw Lua builds fails.
- `.rom` transport is unimplemented and not accepted as a CLI cartridge format.
- Property-name-preserving minification is unimplemented in the library and has no CLI flag. This differs from supported keep-all-names/name-list options.
- Single-level `#include` processing for `.lua`, `.p8`, and `.p8.png` exists as library helpers, but this CLI does not wire them into its workflows.
- Custom PNG labels and direct sprite/map/sound/music editing are library-level possibilities, not dedicated CLI commands. Rich asset editors are outside this initial CLI-parity checklist.
- The engine does not execute games; a player/emulator is outside scope.
- Upstream retains some AST-writer failures and does not claim compatibility with every PICO-8 version. See [compatibility boundaries](https://github.com/jslinker/picotool-js/blob/4cecfafe1291e4f4d874dcf1082c55f870ee0fa3/PARITY.md) and the [audit](https://github.com/jslinker/picotool-js/blob/4cecfafe1291e4f4d874dcf1082c55f870ee0fa3/PARITY-AUDIT.md).

## License

[MIT](LICENSE). picotool-js is MIT-licensed and based on Dan Sanderson's Python picotool; PNG transport uses `fast-png`.
