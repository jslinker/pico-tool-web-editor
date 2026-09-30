"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const PicoToolWeb = require("../app.js");

const EXPECTED_COMMANDS = [
  "stats",
  "listlua",
  "listrawlua",
  "listtokens",
  "printast",
  "luafind",
  "writep8",
  "luamin",
  "luafmt",
  "build",
];

test("publishes one direct entry point for every supported CLI command", () => {
  assert.deepEqual(PicoToolWeb.listCliCommands(), EXPECTED_COMMANDS);
  assert.deepEqual(Object.keys(PicoToolWeb.cli), EXPECTED_COMMANDS);

  for (const command of EXPECTED_COMMANDS) {
    assert.equal(typeof PicoToolWeb.cli[command], "function", command);
  }
});

test("groups CLI entry points by the workflows shown in the interface", () => {
  assert.deepEqual(Object.keys(PicoToolWeb.commandGroups.inspectAndSearch), [
    "stats",
    "listlua",
    "listrawlua",
    "listtokens",
    "printast",
    "luafind",
  ]);
  assert.deepEqual(Object.keys(PicoToolWeb.commandGroups.rewriteMinifyAndFormat), [
    "writep8",
    "luamin",
    "luafmt",
  ]);
  assert.deepEqual(Object.keys(PicoToolWeb.commandGroups.buildAndCombine), ["build"]);
});

test("returns a stable result while an entry point is still a stub", async () => {
  const request = { cartridges: ["game.p8"], csv: true };
  const result = await PicoToolWeb.cli.stats(request);

  assert.equal(result.ok, false);
  assert.equal(result.implemented, false);
  assert.equal(result.command, "stats");
  assert.equal(result.request, request);
  assert.equal(result.error.code, "NOT_IMPLEMENTED");
});

test("routes direct and generic calls through an injected engine adapter", async () => {
  const calls = [];
  const api = PicoToolWeb.createPicoToolWebApi({
    engineAdapter: {
      stats(request) {
        calls.push(["stats", request]);
        return { ok: true, rows: [{ filename: request.filename, tokens: 42 }] };
      },
      build(request) {
        calls.push(["build", request]);
        return { ok: true, output: request.output };
      },
    },
  });

  assert.deepEqual(await api.cli.stats({ filename: "game.p8" }), {
    ok: true,
    rows: [{ filename: "game.p8", tokens: 42 }],
  });
  assert.deepEqual(await api.executeCliCommand("build", { output: "game.p8.png" }), {
    ok: true,
    output: "game.p8.png",
  });
  assert.deepEqual(calls, [
    ["stats", { filename: "game.p8" }],
    ["build", { output: "game.p8.png" }],
  ]);
});

test("rejects unknown command names before reaching an adapter", () => {
  assert.throws(
    () => PicoToolWeb.executeCliCommand("play", {}),
    /Unknown picotool command "play"/,
  );
});
