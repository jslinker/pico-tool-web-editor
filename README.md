# PICO Tool Web Editor

A browser interface for the ten commands in [picotool-js](https://github.com/jslinker/picotool-js). Choose local cartridge files, select a CLI command and its options, inspect the command result, and download generated output. Files are processed in the browser and are not uploaded.

**Status:** the browser API exposes all ten CLI commands: `stats`, `listlua`, `listrawlua`, `listtokens`, `printast`, `luafind`, `writep8`, `luamin`, `luafmt`, and `build`. It presents their arguments and output in browser controls; it does not add cartridge editing, conversion, comparison, or game-running features. Deployed-site import and export still needs verification after the coordinated engine revision is published and pinned.

## Setup

Install Node.js and npm, then run:

```sh
npm ci
npm test
npm run p8tool -- --help
```

The site can be hosted as static files, including on GitHub Pages. Visitors only need a modern browser.

## CLI commands

Cartridge commands accept `.p8` and `.p8.png` inputs where supported by the CLI. Commands that take multiple filenames accept multiple selected files. `build` takes one output filename; its source options may refer to Lua files, cartridges, or selected Lua modules.

| Command | CLI options and purpose |
| --- | --- |
| `stats` | Show cartridge statistics; `--csv` emits CSV. |
| `listlua` | List Lua; `--show-line-numbers` and `--pure-lua`. |
| `listrawlua` | List raw Lua; `--show-line-numbers`. |
| `listtokens` | List Lua tokens, whitespace, and comments. |
| `printast` | Print the Lua abstract syntax tree. |
| `luafind` | Search with a regular expression; `--listfiles` emits each matching filename once. |
| `writep8` | Rewrite cartridges with the default writer (API only). |
| `luamin` | Minify Lua; `--keep-all-names` and `--keep-names-from-file FILE`. |
| `luafmt` | Format Lua; `--indentwidth N` and `--overwrite` (for `.p8`). |
| `build` | Create/update one cartridge from CLI-selected sources; supports `--lua`, `--gfx`, `--gff`, `--map`, `--sfx`, `--music`, matching `--empty-*` flags, `--lua-path`, `--lua-format`, `--lua-minify`, and keep-name options. `--optimize-tokens` is accepted but unimplemented for raw `.lua` sources. |

The browser interface uses the engine's command API with the same command names, flags, source selections, and output filename rules. Inspection commands display their textual results. Rewrite and build commands return downloadable output files. `luafmt --overwrite` retains the CLI's output filename behavior, while browser downloads do not modify the user's local input file. For `build`, an already selected cartridge is used as the base only when its filename exactly matches the requested output filename.

## Implementation status

- [x] Preserve P8SCII glyphs in AST parsing and support integer division and PICO-8 shifts; verify local cartridges against the CLI and retain token class names in the browser bundle.
- [x] Expose each of the ten CLI commands through the browser command API.
- [x] Map CLI command options, source files, and output naming into browser controls; default rewrite remains available through the API.
- [x] Names-list help popovers beside the Minify and Build pickers explain preservation, text-file syntax, and importing a list.
- [x] Compact, side-by-side Search and Format & Minify buttons. Search opens a modal with regular-expression controls, filename-only mode, and results across all added cartridges.
- [x] Open Format & Minify from a selection-count button, preview each selected cartridge with automatically updated options, and copy Lua or save Lua/cartridges from its share menu.
- [x] Open a single file viewer from the square eye icon above each file’s remove icon (on hover, keyboard focus, or touch). Cartridges offer Lua, raw Lua, tokens, AST, listing options, and Lua downloads; Lua and text support files show their contents. Viewing a file preserves the batch selection.
- [x] Explain viewer controls on hover and keyboard focus, separate listing options, and copy or save the displayed source from its share menu.
- [x] Display inspection and search output; download command-generated cartridge, Lua, and CSV results.
- [x] Cache calculations in memory using exact file contents and all request options, with per-cartridge Stats reuse, bounded retention, and invalidation when the engine adapter changes. Failed calculations are retried.
- [x] Show independent section loading states and ignore outdated inspection results after selection changes. Format & Minify yields a paint frame before processing so its modal and spinner appear first, including after option changes. Engine processing remains on the main thread; loading indicators do not make computation nonblocking.
- [x] Full-width tool rows and selection-driven Stats table: one row per selected cartridge, explicit filenames, and CSV export of the same selection.
- [x] Unified Add Files picker and drop handling for `.p8`, `.p8.png`, `.lua`, and `.txt`, with a removable file list and file-type help. Lua sources populate Build entries/modules; text files populate names-to-preserve choices.
- [x] Keep local cartridge inputs available across commands without mutating their bytes.
- [x] Include static-site build and GitHub Pages deployment workflow.
- [ ] Verify import → command → download on the deployed site after the coordinated engine revision is published and pinned.

The committed `vendor/picotool.js` bundle was built from the coordinated sibling `../picotool-js` checkout. The package dependency and lockfile still pin the last published engine revision, which does not include all browser commands; a clean dependency install alone cannot regenerate this bundle yet. Publish the engine revision and update the dependency pin before treating that source-to-bundle path as reproducible.

The browser contract tests cover command routing, options, filenames, and build requests. Focused browser-command tests do not establish full Python-reference parity; the complete upstream suite also requires the Python `pico8` reference package.

## Development

`app.js` exposes the command entry points without DOM dependencies. `ui.js` maps browser selections and controls to command requests and presents command output. `npm run build:engine` uses the sibling `../picotool-js` checkout when its browser entry point is available; the checked-in bundle remains usable with the older pinned package revision.

```sh
npm run build
```

The full CLI reference and implementation live in the [picotool-js repository](https://github.com/jslinker/picotool-js/blob/main/src/cli.js).
