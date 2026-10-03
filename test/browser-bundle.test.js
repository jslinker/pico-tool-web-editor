"use strict";

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

test("bundled browser engine connects every app command without Node globals", async () => {
  const context = vm.createContext({
    ArrayBuffer, DataView, Error, Map, Math, Object, Promise, RangeError, RegExp, Set,
    String, TextDecoder, TextEncoder, TypeError, Uint8Array, WebAssembly,
    console,
    window: { document: { documentElement: { dataset: {} } } },
  });
  context.globalThis = context;
  vm.runInContext(readFileSync(resolve(__dirname, "../vendor/picotool.js"), "utf8"), context);
  vm.runInContext(readFileSync(resolve(__dirname, "../app.js"), "utf8"), context);

  const engine = context.PicotoolJS;
  const api = context.window.PicoToolWeb;
  const source = engine.encodeUtf8(`${engine.HEADER}\nversion 33\n__lua__\n-- title\n-- byline\nprint(42)\n`);
  const cartridges = [{ name: "game.p8", bytes: source }];

  for (const command of api.listCliCommands()) {
    const request = command === "build"
      ? { outputName: "built.p8", sources: { lua: { name: "main.lua", data: "print(1)\n" } } }
      : { cartridges, pattern: "print" };
    const result = await api.cli[command](request);
    assert.equal(result.implemented, true, command);
    assert.equal(result.ok, true, `${command}: ${JSON.stringify(result.errors)}`);
  }
});

test("bundled AST command handles cartridge glyphs, locals, and PICO-8 operators", async () => {
  const context = vm.createContext({ TextEncoder, TextDecoder, Uint8Array, ArrayBuffer, DataView, console,
    window: { document: { documentElement: { dataset: {} } } } });
  vm.runInContext(readFileSync(resolve(__dirname, "../vendor/picotool.js"), "utf8"), context);
  vm.runInContext(readFileSync(resolve(__dirname, "../app.js"), "utf8"), context);
  const source = String.raw`if btn(⬅️) then
 local x=7\2
 x=x>>>1
 print("⬆️",x)
end
`;
  const bytes = new TextEncoder().encode(`pico-8 cartridge // http://www.pico-8.com\nversion 42\n__lua__\n${source}`);
  const result = await context.window.PicoToolWeb.cli.printast({ cartridges: [{ name: "glyphs.p8", bytes }] });
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.match(result.results[0].text, /TokString<b/);
  assert.doesNotMatch(result.results[0].text, /_TokString/);
  assert.match(result.results[0].text, /StatIf/);
  assert.match(result.results[0].text, /StatLocalAssignment/);
  assert.match(result.results[0].text, />>>/);
  assert.ok(!/[\u0005\u000f]/.test(result.results[0].text));
});
