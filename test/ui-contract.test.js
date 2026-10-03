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
  setAttribute(name, value) { this[name] = value; }
  focus() { this.focused = true; }
  showModal() { this.open = true; }
  close() { this.open = false; }
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

function harness(overrides = {}, useCache = false, requestFrame = (callback) => setImmediate(callback)) {
  const elements = new Map();
  const get = (id) => { if (!elements.has(id)) elements.set(id, new Element(id)); return elements.get(id); };
  const radios = new Map([["transform", "luamin"], ["lua-view", "normalized"], ["structure", "tokens"], ["build-lua", "unchanged"]]);
  const calls = []; const downloads = []; const copied = [];
  const clipboard = { async writeText(text) { copied.push(text); } };
  const changeHandlers = new Map();
  const success = (command, results = []) => ({ ok: true, command, results, errors: [], csv: "Filename\r\n" });
  const cli = Object.fromEntries(["stats", "listlua", "listrawlua", "listtokens", "printast", "luafind", "writep8", "luamin", "luafmt", "build"].map((command) => [command, async (request) => {
    calls.push([command, request]);
    if (command === "stats") return success(command, request.cartridges.map((file) => ({ ...file, title: "Game", version: 1, lineCount: 1, characterCount: 1, tokenCount: 1, compressedSize: 1 })));
    if (["listlua", "listrawlua", "listtokens", "printast"].includes(command)) return success(command, [{ text: command }]);
    if (command === "luafind") return success(command, []);
    if (["luamin", "luafmt", "writep8"].includes(command)) return success(command, request.cartridges.map((file) => ({ name: file.name, lua: "print(1)", output: { name: command === "luafmt" && request.overwrite ? file.name : file.name.replace(/\.p8$/, "_fmt.p8"), bytes: Uint8Array.from([9]) } })));
    if (command === "build") return success(command, [{ output: { name: request.outputName, bytes: Uint8Array.from([8]) }, stats: { tokenCount: 1 } }]);
    return success(command);
  }]));
  Object.assign(cli, overrides);
  const document = {
    getElementById: get,
    querySelector: (selector) => selector === ".workspace" ? get("workspace") : (() => {
      const match = /input\[name="([^"]+)"\]:checked/.exec(selector);
      const choice = /input\[name="([^"]+)"\]\[value="([^"]+)"\]/.exec(selector);
      if (choice) return { set checked(value) { if (value) radios.set(choice[1], choice[2]); } };
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
  const context = { window: { PicoToolWeb: useCache ? require("../app.js").createPicoToolWebApi({ engineAdapter: cli }) : { cli } }, document, navigator: { clipboard }, Blob, URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} },
    requestAnimationFrame: requestFrame, setTimeout() {}, console, Uint8Array, TextEncoder, TextDecoder };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "ui.js"), "utf8"), context);
  return { get, calls, downloads, copied, clipboard, radios, change: (key) => changeHandlers.get(key)?.({ target: get(key) }) };
}

test("UI maps a batch format command to CLI options and keeps input bytes unchanged", async () => {
  const h = harness();
  h.radios.set("transform", "luafmt");
  h.get("transform-overwrite").checked = true;
  h.get("transform-indent").value = "4";
  const input = h.get("file-input");
  input.files = [bytesFile("one.p8", [1, 2]), bytesFile("two.p8", [3, 4])];
  await input.handlers.change({ target: input });

  await h.get("open-transform").click();
  const request = h.calls.find(([command]) => command === "luafmt")[1];
  assert.deepEqual(Array.from(request.cartridges, (file) => file.name), ["one.p8", "two.p8"]);
  assert.equal(request.indentwidth, 4);
  assert.equal(request.overwrite, true);
  assert.deepEqual(Array.from(request.cartridges[0].bytes), [1, 2]);
  assert.equal(h.get("transform-output").children.length, 2);
  assert.equal(h.get("transform-dialog").open, true);
  assert.equal(h.get("transform-count").textContent, "2 files");
  assert.equal(h.get("transform-preview").textContent, "print(1)");
  await h.get("copy-transform").click();
  assert.deepEqual(h.copied, ["print(1)"]);
  await h.get("save-transform").click();
  assert.equal(h.downloads.at(-1)[0], "one.p8");
  h.get("transform-output").value = "1";
  h.get("transform-output").handlers.change();
  await h.get("save-transform-lua").click();
  assert.equal(h.downloads.at(-1)[0], "two.lua");
});

test("UI exposes format and minify in a dialog and omits old editing controls", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const commands = ["stats", "listlua", "listrawlua", "listtokens", "printast", "luafind", "luamin", "luafmt", "build"];
  for (const command of commands) assert.match(html, new RegExp(`\\b${command}\\b`), command);
  for (const removed of ["Compare all", "Convert to PNG", "Restore original", "transform-all", "working-copy-toggle"]) {
    assert.ok(!html.toLowerCase().includes(removed.toLowerCase()), `unexpected non-CLI UI: ${removed}`);
  }
});

test("build uses only a selected cartridge whose name matches the output filename", async () => {
  const h = harness();
  const input = h.get("file-input");
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
  const input = h.get("file-input");
  input.files = [bytesFile("good.p8", [1]), bytesFile("bad.p8", [2])];
  await input.handlers.change({ target: input });
  h.get("search-pattern").value = "print";
  await h.get("search-form").handlers.submit({ preventDefault() {} });
  assert.equal(h.get("search-results").children.length, 1);
  assert.match(h.get("search-status").textContent, /1 failed/);
  assert.equal(h.calls.find(([command]) => command === "luafind")[1].pattern, "print");
});

test("inspection forwards raw listing flags and CSV action invokes stats with csv enabled", async () => {
  const h = harness();
  const input = h.get("file-input"); input.files = [bytesFile("game.p8", [1, 2])];
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
  assert.deepEqual(h.downloads.map(([name]) => name), ["picotool-stats.csv", "game.lua"]);
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


test("mixed files route to cartridges, Lua modules and name lists; removal clears dependent choices", async () => {
  const h = harness();
  const input = h.get("file-input");
  input.files = [bytesFile("game.p8", [1]), bytesFile("main.lua", [2]),
    bytesFile("first.txt", [3]), bytesFile("keep.txt", [4]), bytesFile("photo.png", [5])];
  await input.handlers.change({ target: input });
  assert.equal(h.get("file-list").children.length, 4);
  assert.match(h.get("workspace-status").textContent, /Not added: photo.png/);
  assert.equal(input.value, "");
  h.get("transform-name-list").value = "keep.txt";
  h.get("build-name-list").value = "keep.txt";
  h.get("build-entry-module").value = "main.lua";
  // Removing an earlier name list must not change the selected list.
  h.get("file-list").children[2].children[1].handlers.click();
  assert.equal(h.get("transform-name-list").value, "keep.txt");
  await h.get("open-transform").click();
  assert.deepEqual(Array.from(h.calls.find(([command]) => command === "luamin")[1].keepNamesBytes), [4]);
  h.get("build-output-name").value = "out";
  h.get("build-output-format").value = ".p8";
  await h.get("preview-build").click();
  const build = h.calls.find(([command]) => command === "build")[1];
  assert.equal(build.sources.lua.name, "main.lua");
  assert.equal(build.modules.length, 1);
  h.get("file-list").children[1].children[1].handlers.click();
  assert.equal(h.get("build-entry-module").value, "");
  h.get("file-list").children[1].children[1].handlers.click();
  assert.equal(h.get("transform-name-list").value, "");
  assert.equal(h.get("build-name-list").value, "");
  h.get("file-list").children[0].children[1].handlers.click();
  assert.equal(h.get("active-file-name").textContent, "No cartridge selected");
  assert.equal(h.get("lua-preview").textContent, "Select a cartridge to view this listing.");
  await input.handlers.change({ target: input });
  assert.equal(h.get("file-list").children.length, 4);
});

test("file help opens and closes, and dropping files uses the unified loader", async () => {
  const h = harness();
  h.get("file-help-button").click();
  assert.equal(h.get("file-help").open, true);
  h.get("close-file-help").click();
  assert.equal(h.get("file-help").open, false);
  await h.get("workspace").handlers.drop({ preventDefault() {}, dataTransfer: {
    files: [bytesFile("cart.p8.png", [1]), bytesFile("module.lua", [2]), bytesFile("bad.zip", [3])],
  } });
  assert.equal(h.get("file-list").children.length, 2);
  assert.match(h.get("workspace-status").textContent, /bad.zip/);
});

test("stats rows and CSV follow toggled file selection, excluding support files", async () => {
  const h = harness();
  const input = h.get("file-input");
  input.files = [bytesFile("one.p8", [1]), bytesFile("two.p8", [2]), bytesFile("names.txt", [3])];
  await input.handlers.change({ target: input });
  assert.equal(h.get("stats-rows").children.length, 2);
  assert.match(h.get("stats-summary").textContent, /one.p8, two.p8/);
  assert.match(h.get("stats-summary").textContent, /1 selected Lua\/text file is excluded/);
  h.get("file-list").children[0].children[0].handlers.click({ metaKey: true });
  await h.get("download-csv").click();
  const request = h.calls.filter(([command]) => command === "stats").at(-1)[1];
  assert.deepEqual(Array.from(request.cartridges, (file) => file.name), ["two.p8"]);
  assert.equal(h.get("stats-rows").children.length, 1);
  assert.equal(h.get("stats-rows").children[0].children[0].textContent, "two.p8");
  assert.equal(h.get("file-list").children[0].children[0]["aria-pressed"], "false");
  h.get("file-list").children[1].children[0].handlers.click({ ctrlKey: true });
  assert.equal(h.get("stats-rows").children.length, 0);
  assert.equal(h.get("download-csv").disabled, true);
});

test("a stale stats request cannot replace the latest selection", async () => {
  const pending = [];
  const h = harness({ stats: (request) => new Promise((resolve) => pending.push({ request, resolve })) });
  const input = h.get("file-input");
  input.files = [bytesFile("one.p8", [1]), bytesFile("two.p8", [2])];
  const loading = input.handlers.change({ target: input });
  await new Promise((resolve) => setImmediate(resolve));
  h.get("file-list").children[0].children[0].handlers.click({ metaKey: true });
  const finish = (item) => item.resolve({ ok: true, errors: [], results: item.request.cartridges.map((file) => ({
    name: file.name, lineCount: 1, characterCount: 1, tokenCount: 1, compressedSize: 1, version: 1,
  })) });
  finish(pending[2]);
  await new Promise((resolve) => setImmediate(resolve));
  finish(pending[0]);
  finish(pending[1]);
  await loading;
  assert.equal(h.get("stats-rows").children.length, 1);
  assert.equal(h.get("stats-rows").children[0].children[0].textContent, "two.p8");
});


test("single click selects one file, modifier click toggles, and Shift selects a range", async () => {
  const h = harness();
  const input = h.get("file-input");
  input.files = [bytesFile("one.p8", [1]), bytesFile("two.p8", [2]), bytesFile("three.p8", [3]), bytesFile("names.txt", [4])];
  await input.handlers.change({ target: input });
  const select = async (index, modifiers = {}) => {
    h.get("file-list").children[index].children[0].handlers.click(modifiers);
    await new Promise((resolve) => setImmediate(resolve));
  };
  const names = () => h.get("stats-rows").children.map((row) => row.children[0].textContent);
  await select(0);
  assert.deepEqual(names(), ["one.p8"]);
  await select(0);
  assert.deepEqual(names(), ["one.p8"]);
  await select(2, { metaKey: true });
  assert.deepEqual(names(), ["one.p8", "three.p8"]);
  await select(0, { ctrlKey: true });
  assert.deepEqual(names(), ["three.p8"]);
  await select(0);
  await select(2, { shiftKey: true });
  assert.deepEqual(names(), ["one.p8", "two.p8", "three.p8"]);
  await select(3);
  assert.deepEqual(names(), []);
  assert.equal(h.get("active-file-name").textContent, "No cartridge selected");
  assert.equal(h.get("download-csv").disabled, true);
});

test("selection loading is independent per section and stale completions cannot clear it", async () => {
  const pending = { stats: [], listlua: [], listtokens: [] };
  const overrides = Object.fromEntries(Object.keys(pending).map((command) => [command,
    () => new Promise((resolve) => pending[command].push(resolve))]));
  const h = harness(overrides);
  const input = h.get("file-input");
  input.files = [bytesFile("one.p8", [1]), bytesFile("two.p8", [2])];
  const initial = input.handlers.change({ target: input });
  await new Promise((resolve) => setImmediate(resolve));
  for (const section of ["stats", "lua", "structure"]) assert.equal(h.get(`${section}-section`)["aria-busy"], "true");
  h.get("file-list").children[1].children[0].handlers.click({});
  for (const command of Object.keys(pending)) pending[command][0]({ ok: true, results: [{ text: "old" }], errors: [] });
  pending.stats[1]({ ok: true, results: [], errors: [] });
  await initial;
  for (const section of ["stats", "lua", "structure"]) assert.equal(h.get(`${section}-section`)["aria-busy"], "true");
  pending.listlua[1]({ ok: true, results: [{ text: "new" }], errors: [] });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(h.get("lua-section")["aria-busy"], "false");
  assert.equal(h.get("lua-preview").textContent, "new");
  assert.equal(h.get("structure-section")["aria-busy"], "true");
  pending.listtokens[1]({ ok: false, results: [], errors: [{ name: "two.p8", message: "invalid" }] });
  pending.stats[2]({ ok: false, results: [], errors: [{ name: "two.p8", message: "invalid" }] });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(h.get("structure-section")["aria-busy"], "false");
  assert.equal(h.get("stats-section")["aria-busy"], "false");
  assert.match(h.get("structure-preview").textContent, /invalid/);
  assert.match(h.get("stats-summary").textContent, /invalid/);
});


test("selection changes reuse per-file stats and changed reimports recalculate only that file", async () => {
  const h = harness({}, true);
  const input = h.get("file-input");
  input.files = [bytesFile("one.p8", [1]), bytesFile("two.p8", [2])];
  await input.handlers.change({ target: input });
  assert.equal(h.calls.filter(([command]) => command === "stats").length, 2);
  h.get("file-list").children[1].children[0].handlers.click({});
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(h.calls.filter(([command]) => command === "stats").length, 2);
  assert.equal(h.get("stats-rows").children.length, 1);
  input.files = [bytesFile("one.p8", [9])];
  await input.handlers.change({ target: input });
  const requests = h.calls.filter(([command]) => command === "stats");
  assert.equal(requests.length, 3);
  assert.equal(requests[2][1].cartridges[0].name, "one.p8");
  assert.equal(requests[2][1].cartridges[0].bytes[0], 9);
  assert.equal(h.get("stats-rows").children.length, 2);
});

test("file View opens one modal without changing selection and all views target that file", async () => {
  const h = harness();
  const input = h.get("file-input");
  input.files = [bytesFile("one.p8", [1]), bytesFile("two.p8.png", [2])];
  await input.handlers.change({ target: input });
  h.get("file-list").children[0].children[0].handlers.click({});
  const view = h.get("file-list").children[1].children[2];
  assert.equal(view["aria-label"], "View two.p8.png");
  view.handlers.click();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(h.get("lua-dialog").open, true);
  assert.equal(h.get("lua-filename").textContent, "two.p8.png");
  assert.equal(h.get("active-file-name").textContent, "one.p8");
  assert.equal(h.get("stats-rows").children.length, 1);
  assert.equal(h.get("lua-preview").textContent, "listlua");
  assert.equal(h.get("structure-preview").textContent, "listtokens");
  h.radios.set("lua-view", "raw");
  h.radios.set("structure", "ast");
  h.change("lua-view");
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(h.get("lua-preview").textContent, "listrawlua");
  assert.equal(h.get("structure-preview").textContent, "printast");
  for (const command of ["listlua", "listrawlua", "listtokens", "printast"]) {
    assert.equal(h.calls.filter(([name]) => name === command).at(-1)[1].cartridges[0].name, "two.p8.png");
  }
  await h.get("download-lua").click();
  assert.equal(h.downloads.at(-1)[0], "two.lua");
  await h.get("close-lua-dialog").click();
  assert.equal(h.get("lua-dialog").open, false);
});

test("support files show text in the same viewer without cartridge operations", async () => {
  const h = harness();
  const input = h.get("file-input");
  input.files = [bytesFile("main.lua", [112, 114, 105, 110, 116, 40, 41]), bytesFile("keep.txt", [97])];
  await input.handlers.change({ target: input });
  const before = h.calls.length;
  for (const [index, expected] of [[0, "print()"], [1, "a"]]) {
    h.get("file-list").children[index].children[2].handlers.click();
    assert.equal(h.get("lua-dialog").open, true);
    assert.equal(h.get("lua-preview").textContent, expected);
    assert.equal(h.get("structure-section").hidden, true);
    assert.equal(h.get("lua-options").hidden, true);
    await h.get("close-lua-dialog").click();
  }
  assert.equal(h.calls.length, before);
});

test("share copies the displayed listing and reports clipboard failure", async () => {
  const h = harness();
  const input = h.get("file-input"); input.files = [bytesFile("game.p8", [1])];
  await input.handlers.change({ target: input });
  h.get("file-list").children[0].children[2].handlers.click();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(h.get("copy-lua").disabled, false);
  h.get("listing-share").open = true;
  await h.get("copy-lua").click();
  assert.deepEqual(h.copied, [h.get("lua-preview").textContent]);
  assert.equal(h.get("listing-share").open, false);
  assert.match(h.get("listing-share-status").textContent, /Copied/);
  h.clipboard.writeText = async () => { throw new Error("Permission denied"); };
  await h.get("copy-lua").click();
  assert.match(h.get("listing-share-status").textContent, /Could not copy/);
  await h.get("download-lua").click();
  assert.equal(h.downloads.at(-1)[0], "game.lua");
  assert.match(h.get("listing-share-status").textContent, /Download started/);
});

test("listing downloads use a nonempty fallback for unnamed cartridges", async () => {
  const h = harness();
  const input = h.get("file-input"); input.files = [bytesFile(".p8", [1])];
  await input.handlers.change({ target: input });
  h.get("file-list").children[0].children[2].handlers.click();
  await new Promise((resolve) => setImmediate(resolve));
  await h.get("download-lua").click();
  assert.equal(h.downloads.at(-1)[0], "cartridge.lua");
});


test("transform selection excludes support files and disables the launcher for text-only selection", async () => {
  const h = harness();
  const input = h.get("file-input");
  input.files = [bytesFile("one.p8", [1]), bytesFile("two.p8", [2]), bytesFile("names.txt", [3])];
  await input.handlers.change({ target: input });
  h.get("file-list").children[1].children[0].handlers.click({});
  assert.equal(h.get("transform-count").textContent, "1 files");
  await h.get("open-transform").click();
  const request = h.calls.filter(([command]) => command === "luamin").at(-1)[1];
  assert.deepEqual(Array.from(request.cartridges, (file) => file.name), ["two.p8"]);
  h.get("file-list").children[2].children[0].handlers.click({});
  assert.equal(h.get("transform-count").textContent, "0 files");
  assert.equal(h.get("open-transform").disabled, true);
});

test("transform ignores outdated previews and reports per-file failures", async () => {
  const pending = [];
  const h = harness({ luamin: () => new Promise((resolve) => pending.push(resolve)) });
  const input = h.get("file-input"); input.files = [bytesFile("one.p8", [1])];
  await input.handlers.change({ target: input });
  const first = h.get("open-transform").click();
  await new Promise((resolve) => setImmediate(() => setImmediate(resolve)));
  const second = h.get("open-transform").click();
  await new Promise((resolve) => setImmediate(() => setImmediate(resolve)));
  pending[1]({ results: [{ name: "one.p8", lua: "new", output: { name: "one_fmt.p8", bytes: [1] } }],
    errors: [{ name: "bad.p8", message: "Invalid Lua" }] });
  await second;
  pending[0]({ results: [{ name: "one.p8", lua: "old", output: { name: "one_fmt.p8", bytes: [2] } }], errors: [] });
  await first;
  assert.equal(h.get("transform-preview").textContent, "new");
  assert.match(h.get("transform-status").textContent, /Invalid Lua/);
  assert.equal(h.get("copy-transform").disabled, false);
});


test("transform paints the modal and busy state before processing on open and option changes", async () => {
  const frames = [];
  const h = harness({}, false, (callback) => frames.push(callback));
  const input = h.get("file-input"); input.files = [bytesFile("one.p8", [1])];
  await input.handlers.change({ target: input });
  const count = () => h.calls.filter(([command]) => ["luamin", "luafmt"].includes(command)).length;

  const opening = h.get("open-transform").click();
  assert.equal(h.get("transform-dialog").open, true);
  assert.equal(h.get("transform-section")["aria-busy"], "true");
  assert.equal(count(), 0);
  frames.shift()();
  await Promise.resolve();
  assert.equal(count(), 0, "the first frame must remain available for painting");
  frames.shift()();
  await opening;
  assert.equal(count(), 1);
  assert.equal(h.get("transform-section")["aria-busy"], "false");

  h.radios.set("transform", "luafmt");
  h.get("transform-indent").value = "4";
  const changing = h.change("transform");
  assert.equal(h.get("transform-section")["aria-busy"], "true");
  assert.equal(h.get("copy-transform").disabled, true);
  assert.equal(count(), 1);
  frames.shift()();
  frames.shift()();
  await changing;
  assert.equal(count(), 2);
  assert.equal(h.calls.filter(([command]) => command === "luafmt").at(-1)[1].indentwidth, 4);
  assert.equal(h.get("transform-section")["aria-busy"], "false");
});

test("closing the transform modal before paint skips pending processing", async () => {
  const frames = [];
  const h = harness({}, false, (callback) => frames.push(callback));
  const input = h.get("file-input"); input.files = [bytesFile("one.p8", [1])];
  await input.handlers.change({ target: input });
  const opening = h.get("open-transform").click();
  await h.get("close-transform-dialog").click();
  h.get("transform-dialog").handlers.close();
  frames.shift()();
  frames.shift()();
  await opening;
  assert.equal(h.calls.filter(([command]) => command === "luamin").length, 0);
  assert.equal(h.get("transform-section")["aria-busy"], "false");
});
