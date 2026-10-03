"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { createPicoToolWebApi } = require("../app.js");
const file = (byte = 1) => ({ name: "game.p8", bytes: new Uint8Array([byte]) });
const success = (request) => ({ ok: true, results: [{ name: request.cartridges?.[0]?.name, bytes: new Uint8Array([7]) }], errors: [] });

test("identical contents coalesce pending work and reuse results; mutations and options miss", async () => {
  let calls = 0;
  const api = createPicoToolWebApi({ engineAdapter: { stats: async (request) => { calls++; return success(request); } } });
  const request = { cartridges: [file()] };
  const [a, b] = await Promise.all([api.cli.stats(request), api.cli.stats(structuredClone(request))]);
  assert.equal(calls, 1);
  a.results[0].bytes[0] = 99;
  assert.equal(b.results[0].bytes[0], 7);
  assert.equal((await api.cli.stats(request)).results[0].bytes[0], 7);
  request.cartridges[0].bytes[0] = 2;
  await api.cli.stats(request);
  assert.equal(calls, 2);
  await api.cli.stats({ ...request, csv: true });
  assert.equal(calls, 3);
  request.cartridges[0].name = "renamed.p8";
  await api.cli.stats(request);
  assert.equal(calls, 4);
});

test("all build inputs participate in cache identity", async () => {
  let calls = 0;
  const api = createPicoToolWebApi({ engineAdapter: { build: async (request) => { calls++; return success(request); } } });
  const request = { base: file(), sources: { lua: file() }, modules: [file()], keepNamesBytes: new Uint8Array([1]),
    luaPath: "?.lua", luaMode: "minify", outputName: "out.p8", empty: [] };
  await api.cli.build(request);
  await api.cli.build(structuredClone(request));
  assert.equal(calls, 1);
  const edits = [() => request.base.bytes[0]++, () => request.sources.lua.bytes[0]++,
    () => request.modules[0].bytes[0]++, () => request.keepNamesBytes[0]++,
    () => request.luaPath = "src/?.lua", () => request.luaMode = "format",
    () => request.outputName = "other.p8", () => request.empty.push("gfx")];
  for (const edit of edits) { edit(); await api.cli.build(request); }
  assert.equal(calls, 1 + edits.length);
});

test("adapter replacement clears caches; failed calculations are retried", async () => {
  let calls = 0;
  const api = createPicoToolWebApi({ engineAdapter: { stats: async (request) => {
    calls++;
    if (calls === 1) throw new Error("temporary");
    if (calls === 2) return { ok: false, results: [], errors: [] };
    return success(request);
  } } });
  const request = { cartridges: [file()] };
  await assert.rejects(api.cli.stats(request), /temporary/);
  await api.cli.stats(request);
  await api.cli.stats(request);
  await api.cli.stats(request);
  assert.equal(calls, 3);
  api.setEngineAdapter({ stats: async () => ({ ok: true, results: ["new"], errors: [] }) });
  assert.deepEqual((await api.cli.stats(request)).results, ["new"]);
});

test("pending inputs are snapshotted and old adapter results cannot repopulate the cache", async () => {
  let finish, captured;
  const api = createPicoToolWebApi({ engineAdapter: { stats: (request) => {
    captured = request;
    return new Promise((resolve) => { finish = resolve; });
  } } });
  const request = { cartridges: [file()] };
  const old = api.cli.stats(request);
  request.cartridges[0].bytes[0] = 9;
  await Promise.resolve();
  assert.equal(captured.cartridges[0].bytes[0], 1);
  let calls = 0;
  api.setEngineAdapter({ stats: async () => { calls++; return { ok: true, results: ["new"], errors: [] }; } });
  await api.cli.stats({ cartridges: [file()] });
  finish(success(captured));
  await old;
  assert.deepEqual((await api.cli.stats({ cartridges: [file()] })).results, ["new"]);
  assert.equal(calls, 1);
});

test("cache evicts least-recently-used calculations", async () => {
  let calls = 0;
  const api = createPicoToolWebApi({ engineAdapter: { stats: async (request) => { calls++; return success(request); } } });
  for (let i = 0; i < 65; i++) await api.cli.stats({ cartridges: [file(i)] });
  await api.cli.stats({ cartridges: [file(64)] });
  assert.equal(calls, 65);
  await api.cli.stats({ cartridges: [file(0)] });
  assert.equal(calls, 66);
});
