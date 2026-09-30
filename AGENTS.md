# Project direction

Build a GitHub Pages interface for picotool-js that lets users select local
cartridges, inspect and manipulate them entirely on their device, and export
the results.

An intended companion goal of this work is to distill picotool-js into the
purest practical, platform-agnostic JavaScript engine. Browser integration
should drive improvements to that engine, not a second implementation of its
functionality in this repository.

## Repository layout

The intended workspace has two independent sibling Git repositories:

```text
PICO-Web/
├── pico-tool-web-editor/   # This repository: web application and hosting
└── picotool-js/            # Engine repository: portable processing and adapters
```

Locate the engine checkout at `../picotool-js` and verify its actual Git root
before editing. Keep changes, validation, and commits attributable to their
respective repositories. Read the engine's own agent instructions before
changing it. Do not edit the installed copy in `node_modules`.

## Architectural boundary

- Put cartridge parsing, serialization, compression, Lua analysis and
  transformations, statistics, search, and assembly in picotool-js. Shared
  processing should have the same capabilities and semantics across runtimes.
- Keep the engine core independent of Node, browser, DOM, and filesystem APIs.
  Prefer standard JavaScript and portable byte/data representations. Pass data
  and explicit resource resolvers into operations that need external inputs.
- Keep Node CLI and filesystem behavior in thin adapters around the portable
  core. Preserve supported CLI behavior while improving the architecture.
- Put browser file selection, downloads, UI state, presentation, browser-specific
  integration, and GitHub Pages deployment in this web repository.
- Do not settle for a reduced browser-only engine API, duplicate missing engine
  logic here, or use broad Node polyfills as a substitute for making the core
  portable. A browser entry point, if retained, should not mean fewer processing
  capabilities. Prefer one portable implementation consumed by runtime adapters.

## Working across the repositories

When a web feature exposes an engine portability gap, treat resolving that gap
in picotool-js as part of the intended work. Make focused engine changes, verify
Node behavior and the relevant browser workflow, then integrate the result here.
Avoid unrelated rewrites; evolve the portable core as concrete workflows demand.

Use the sibling checkout for engine development and validation when needed.
The committed web dependency currently points to a fixed GitHub revision; keep
the final dependency and lockfile reproducible for contributors and GitHub Pages
CI. Do not leave a machine-specific path or unpublished local revision as the
committed dependency. Report coordinated changes and any publication dependency
clearly; this guidance does not itself request pushing or publishing changes.

Maintain the README feature checklist as implementation progresses. Distinguish
working CLI capabilities, verified browser capabilities, and remaining work.
