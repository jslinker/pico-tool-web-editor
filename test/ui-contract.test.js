"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

class Element {
  constructor(id = "") {
    this.id = id; this.handlers = {}; this.children = []; this.dataset = {}; this.style = {};
    this.classList = { add() {}, remove() {} }; this.value = ""; this.checked = false;
    this.files = []; this.textContent = ""; this.download = ""; this._innerHTML = "";
  }
  set innerHTML(value) {
    this._innerHTML = String(value);
    this.children = Array.from(this._innerHTML.matchAll(/<span(?:\s[^>]*)?>/g), () => new Element("span"));
  }
  get innerHTML() { return this._innerHTML; }
  addEventListener(name, handler) { this.handlers[name] = handler; }
  querySelector(selector) {
    if (selector === "strong" || selector === "small") return this.childrenBySelector?.[selector] || (this.childrenBySelector ||= {})[selector] || (this.childrenBySelector[selector] = new Element(selector));
    return (this.childrenBySelector ||= {})[selector] || (this.childrenBySelector[selector] = new Element(selector));
  }
  querySelectorAll(selector) { return selector === "strong" ? Array.from({ length: 6 }, () => new Element("strong")) : []; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  click() { return this.handlers.click?.({ target: this, preventDefault() {} }); }
}

const bytesFile = (name, bytes) => ({ name, webkitRelativePath: name,
  async arrayBuffer() { return Uint8Array.from(bytes).buffer; }, async text() { return "keep_name\n"; } });

function harness(overrides = {}) {
  const elements = new Map();
  const get = (id) => { if (!elements.has(id)) elements.set(id, new Element(id)); return elements.get(id); };
  const radios = new Map([["transform", "luamin"], ["lua-view", "normalized"], ["structure", "tokens"], ["build-lua", "unchanged"]]);
  const calls = []; const downloads = []; const changeHandlers = new Map();
  const success = (command, results = []) => ({ ok: true, command, results, errors: [], csv: "Filename\r\n" });
  const cli = Object.fromEntries(["stats", "listlua", "listrawlua", "listtokens", "printast", "luafind", "writep8", "luamin", "luafmt", "build"].map((command) => [command, async (request) => {
    calls.push([command, request]);
    if (command === "stats") return success(command, request.cartridges.map((file) => ({ ...file, title: "Game", version: 1, lineCount: 1, characterCount: 1, tokenCount: 1, compressedSize: 1 })));
    if (["listlua", "listrawlua", "listtokens", "printast"].includes(command)) return success(command, [{ text: command }]);
    if (command === "luafind") return success(command, []);
    if (["luamin", "luafmt", "writep8"].includes(command)) return success(command, request.cartridges.map((file) => ({ name: file.name, output: { name: command === "luafmt" && request.overwrite ? file.name : file.name.replace(/\.p8$/, "_fmt.p8"), bytes: Uint8Array.from([9]) } })));
    if (command === "build") return success(command, [{ output: { name: request.outputName, bytes: Uint8Array.from([8]) }, stats: { tokenCount: 1 } }]);
    return success(command);
  }]));
  Object.assign(cli, overrides);
  const document = {
    getElementById: get,
    querySelector: (selector) => selector === ".workspace" ? get("workspace") : (() => {
      const match = /input\[name="([^"]+)"\]:checked/.exec(selector);
      return match ? { value: radios.get(match[1]) } : get(selector);
    })(),
    querySelectorAll: (selector) => {
      const names = [...String(selector).matchAll(/input\[name="([^"]+)"\]/g)].map((match) => match[1]);
      const ids = [...String(selector).matchAll(/#([\w-]+)/g)].map((match) => match[1]);
      return [...names.map((name) => ({ addEventListener(event, handler) { changeHandlers.set(name, handler); } })),
        ...ids.map((id) => ({ addEventListener(event, handler) { changeHandlers.set(id, handler); } }))];
    },
    createElement: () => { const element = new Element("anchor"); element.click = () => downloads.push([element.download, element.href]); return element; },
  };
  const context = { window: { PicoToolWeb: { cli } }, document, Blob, URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} },
    setTimeout() {}, console, Uint8Array, TextEncoder, TextDecoder };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "ui.js"), "utf8"), context);
  return { get, calls, downloads, radios, change: (key) => changeHandlers.get(key)?.({ target: get(key) }) };
}

test("UI maps a batch format command to CLI options and keeps input bytes unchanged", async () => {
  const h = harness();
  h.radios.set("transform", "luafmt");
  h.get("transform-all").checked = true;
  h.get("transform-overwrite").checked = true;
  h.get("transform-indent").value = "4";
  const input = h.get("cartridge-input");
  input.files = [bytesFile("one.p8", [1, 2]), bytesFile("two.p8", [3, 4])];
  await input.handlers.change({ target: input });

  await h.get("run-transform").click();
  const request = h.calls.find(([command]) => command === "luafmt")[1];
  assert.deepEqual(Array.from(request.cartridges, (file) => file.name), ["one.p8", "two.p8"]);
  assert.equal(request.indentwidth, 4);
  assert.equal(request.overwrite, true);
  assert.deepEqual(Array.from(request.cartridges[0].bytes), [1, 2]);
  assert.equal(h.get("transform-results").children.length, 2);
  assert.equal(typeof h.get("transform-results").children[0].children.at(-1).handlers.click, "function");
});

test("UI exposes the ten CLI commands and omits non-CLI editing controls", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const commands = ["stats", "listlua", "listrawlua", "listtokens", "printast", "luafind", "writep8", "luamin", "luafmt", "build"];
  for (const command of commands) assert.match(html, new RegExp(`\\b${command}\\b`), command);
  for (const removed of ["Compare all", "Convert to PNG", "Restore original", "transform-preview", "working-copy-toggle"]) {
    assert.ok(!html.toLowerCase().includes(removed.toLowerCase()), `unexpected non-CLI UI: ${removed}`);
  }
});

test("build uses only a selected cartridge whose name matches the output filename", async () => {
  const h = harness();
  const input = h.get("cartridge-input");
  input.files = [bytesFile("unrelated.p8", [1]), bytesFile("target.p8", [2])];
  await input.handlers.change({ target: input });
  h.get("build-output-name").value = "target";
  h.get("build-output-format").value = ".p8";
  await h.get("preview-build").click();
  const matching = h.calls.find(([command]) => command === "build")[1];
  assert.equal(matching.base.name, "target.p8");

  h.get("build-output-name").value = "new-output";
  await h.get("preview-build").click();
  const requests = h.calls.filter(([command]) => command === "build");
  assert.equal(requests[1][1].base, undefined);

  h.get("build-output-name").value = "target";
  await h.get("preview-build").click();
  const latest = h.calls.filter(([command]) => command === "build").at(-1)[1];
  assert.deepEqual(Array.from(latest.base.bytes), [8]);
});

test("search displays successful matches alongside a per-cartridge CLI error", async () => {
  const h = harness({ luafind: async (request) => {
    h.calls.push(["luafind", request]);
    return { ok: false, results: [{ name: "good.p8", text: "good.p8:1:print(1)\n" }], errors: [{ name: "bad.p8", message: "invalid cartridge" }] };
  } });
  const input = h.get("cartridge-input");
  input.files = [bytesFile("good.p8", [1]), bytesFile("bad.p8", [2])];
  await input.handlers.change({ target: input });
  h.get("search-pattern").value = "print";
  await h.get("run-search").click();
  assert.equal(h.get("search-results").children.length, 1);
  assert.match(h.get("search-status").textContent, /1 failed/);
  assert.equal(h.calls.find(([command]) => command === "luafind")[1].pattern, "print");
});

test("inspection forwards raw listing flags and CSV action invokes stats with csv enabled", async () => {
  const h = harness();
  const input = h.get("cartridge-input"); input.files = [bytesFile("game.p8", [1, 2])];
  await input.handlers.change({ target: input });
  h.get("lua-line-numbers").checked = true;
  h.radios.set("lua-view", "raw");
  h.change("lua-view");
  await h.get("download-csv").click();
  const listing = h.calls.find(([command]) => command === "listrawlua")[1];
  assert.equal(listing.showLineNumbers, true);
  assert.equal(listing.pureLua, false);
  const csvRequest = h.calls.filter(([command]) => command === "stats").at(-1)[1];
  assert.equal(csvRequest.csv, true);

  h.radios.set("lua-view", "normalized");
  h.get("lua-pure").checked = true;
  h.change("lua-view");
  await h.get("export-lua").click();
  const luaExport = h.calls.filter(([command]) => command === "listlua").at(-1)[1];
  assert.equal(luaExport.showLineNumbers, true);
  assert.equal(luaExport.pureLua, true);
  assert.deepEqual(h.downloads.map(([name]) => name), ["picotool-stats.csv", "game.lua.txt"]);
});

test("bundled engine resolves nested build modules and reports its token-optimization error", async () => {
  const engineContext = vm.createContext({ TextEncoder, TextDecoder, Uint8Array, ArrayBuffer, DataView, console });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "vendor", "picotool.js"), "utf8"), engineContext);
  const h = harness(engineContext.PicotoolJS.createBrowserCommands());
  const source = (name, relativePath, contents) => ({ name, webkitRelativePath: relativePath,
    async arrayBuffer() { return new TextEncoder().encode(contents).buffer; } });
  const modules = h.get("module-folder-input");
  modules.files = [source("main.lua", "project/src/main.lua", 'local m=require("mod")\nprint(m)\n'),
    source("mod.lua", "project/src/mod.lua", 'return require("helper")\n'),
    source("helper.lua", "project/src/helper.lua", "return 7\n")];
  await modules.handlers.change({ target: modules });
  h.get("build-entry-module").value = "src/main.lua";
  h.get("lua-path").value = "?;?.lua";
  h.get("build-output-name").value = "nested";
  h.get("build-output-format").value = ".p8";
  await h.get("preview-build").click();
  assert.match(h.get("build-status").textContent, /^Ready/);
  assert.equal(h.get("export-list").children.length, 1);
  h.get("build-optimize-tokens").checked = true;
  await h.get("preview-build").click();
  assert.match(h.get("build-status").textContent, /optimize_tokens not yet implemented/);
  assert.equal(h.get("export-list").children.length, 1);
});
