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
