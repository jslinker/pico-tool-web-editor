import { build } from "esbuild";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const localEntry = resolve("../picotool-js/src/browser.js");
const installedEntry = resolve("node_modules/@pico8-studio/picotool/src/browser.js");
const requestedEntry = process.env.PICOTOOL_ENGINE_ENTRY;
const installedBrowserCommands = resolve("node_modules/@pico8-studio/picotool/src/browser-commands.js");
const output = resolve("vendor/picotool.js");
const entry = requestedEntry ? resolve(requestedEntry)
  : existsSync(resolve("../picotool-js/src/browser-commands.js")) ? localEntry
    : existsSync(installedBrowserCommands) ? installedEntry : null;

if (!entry) {
  if (existsSync(output)) {
    console.warn("The pinned engine predates browser commands; retaining the committed verified browser bundle.");
    process.exit(0);
  }
  throw new Error("A picotool-js revision with src/browser-commands.js is required to build the browser engine.");
}

await build({
  entryPoints: [entry],
  bundle: true,
  // AST token output includes constructor names; retain CLI-compatible names.
  keepNames: true,
  outfile: output,
  format: "iife",
  globalName: "PicotoolJS",
  platform: "browser",
  target: ["es2022"],
  sourcemap: true,
  legalComments: "linked",
});

console.log(`Bundled ${entry} -> vendor/picotool.js`);
