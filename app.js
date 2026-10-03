/*
 * PICO Tool Web application API
 *
 * This file is intentionally framework- and DOM-independent. It is loaded by
 * index.html and can also be required directly by Node tests and development
 * tools. Keep the CLI entry-point groups below easy to find and named exactly
 * like their picotool CLI counterparts.
 */
(function exposePicoToolWeb(root, createApiModule) {
  "use strict";

  const apiModule = createApiModule();

  if (typeof module === "object" && module.exports) {
    module.exports = apiModule;
  }

  if (typeof window === "object" && window.document) {
    window.PicoToolWeb = apiModule;
    window.document.documentElement.dataset.picoToolWebApi = "ready";
  }
})(typeof globalThis === "object" ? globalThis : this, function createApiModule() {
  "use strict";

  const CLI_COMMAND_NAMES = Object.freeze([
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
  ]);

  /**
   * Create an isolated application API. Tests should create their own instance
   * when injecting an engine adapter so no state leaks between test cases.
   *
   * An engine adapter is an object whose keys are CLI command names and whose
   * values are functions accepting a single request object.
   */
  function createPicoToolWebApi(options) {
    const settings = options || {};
    let engineAdapter = settings.engineAdapter || null;

    // Exact content keys avoid identity-based hits when callers mutate input bytes.
    // Bound retained keys/results to 32 MiB and 64 entries, including pending work.
    const cache = new Map();
    const maxCacheBytes = 32 * 1024 * 1024;
    let cacheBytes = 0;
    function contentKey(value, seen = new Set()) {
      if (value === null) return "null";
      if (value === undefined) return "undefined";
      if (["string", "boolean", "number"].includes(typeof value)) {
        return `${typeof value}:${typeof value === "number" ? (Object.is(value, -0) ? "-0" : String(value)) : JSON.stringify(value)}`;
      }
      if (typeof value !== "object" || seen.has(value)) throw new TypeError("Uncacheable request");
      if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
        const bytes = value instanceof ArrayBuffer ? new Uint8Array(value)
          : new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
        let text = "";
        for (let i = 0; i < bytes.length; i += 8192) text += String.fromCharCode(...bytes.subarray(i, i + 8192));
        return `${Object.prototype.toString.call(value)}:${JSON.stringify(text)}`;
      }
      seen.add(value);
      let key;
      if (Array.isArray(value)) key = `[${Array.from(value, (item) => contentKey(item, seen)).join(",")}]`;
      else if (Object.getPrototypeOf(value) === null || (Object.prototype.toString.call(value) === "[object Object]" && Object.getPrototypeOf(Object.getPrototypeOf(value)) === null)) {
        key = `{${Object.keys(value).sort().map((name) => `${JSON.stringify(name)}:${contentKey(value[name], seen)}`).join(",")}}`;
      } else throw new TypeError("Uncacheable request");
      seen.delete(value);
      return key;
    }
    function removeCached(key, entry) {
      if (cache.get(key) !== entry) return;
      cache.delete(key);
      cacheBytes -= entry.size;
    }
    function trimCache() {
      while (cache.size > 64 || cacheBytes > maxCacheBytes) {
        const [key, entry] = cache.entries().next().value;
        removeCached(key, entry);
      }
    }
    async function calculate(command, request, implementation) {
      let snapshot, key;
      try {
        // Special inputs (callbacks, Blob, RegExp, etc.) use the engine directly.
        // All UI requests are plain data and byte arrays.
        contentKey(request);
        snapshot = structuredClone(request);
        key = `${command}:${contentKey(snapshot)}`;
      } catch { return implementation(request); }
      let entry = cache.get(key);
      if (entry) {
        cache.delete(key);
        cache.set(key, entry);
      } else {
        entry = { size: key.length * 2, promise: null };
        entry.promise = Promise.resolve().then(() => implementation(snapshot)).then((result) => {
          if (!result.ok) removeCached(key, entry);
          else if (cache.get(key) === entry) {
            try {
              const resultSize = contentKey(result).length * 2;
              entry.size += resultSize;
              cacheBytes += resultSize;
              trimCache();
            } catch { removeCached(key, entry); }
          }
          return structuredClone(result);
        }, (error) => { removeCached(key, entry); throw error; });
        cache.set(key, entry);
        cacheBytes += entry.size;
        trimCache();
      }
      // Callers may edit results or output bytes without corrupting cached data.
      return structuredClone(await entry.promise);
    }

    function notImplementedResult(command, request) {
      return Object.freeze({
        ok: false,
        implemented: false,
        command,
        request,
        error: Object.freeze({
          code: "NOT_IMPLEMENTED",
          message: `${command} is not connected to the browser engine adapter yet.`,
        }),
      });
    }

    async function invokeCliCommand(command, request) {
      const normalizedRequest = request === undefined ? {} : request;
      const implementation = engineAdapter && engineAdapter[command];

      if (typeof implementation === "function") {
        return calculate(command, normalizedRequest, implementation);
      }

      return notImplementedResult(command, normalizedRequest);
    }

    // ======================================================================
    // CLI ENTRY POINTS: INSPECT AND SEARCH
    // Maps to: stats, listlua, listrawlua, listtokens, printast, luafind
    // ======================================================================

    /** stats [--csv] CARTRIDGE... */
    function stats(request) {
      return invokeCliCommand("stats", request);
    }

    /** listlua [--show-line-numbers] [--pure-lua] CARTRIDGE... */
    function listlua(request) {
      return invokeCliCommand("listlua", request);
    }

    /** listrawlua [--show-line-numbers] CARTRIDGE... */
    function listrawlua(request) {
      return invokeCliCommand("listrawlua", request);
    }

    /** listtokens CARTRIDGE... */
    function listtokens(request) {
      return invokeCliCommand("listtokens", request);
    }

    /** printast CARTRIDGE... */
    function printast(request) {
      return invokeCliCommand("printast", request);
    }

    /** luafind [--listfiles] PATTERN CARTRIDGE... */
    function luafind(request) {
      return invokeCliCommand("luafind", request);
    }

    // ======================================================================
    // CLI ENTRY POINTS: REWRITE, MINIFY, AND FORMAT
    // Maps to: writep8, luamin, luafmt
    // ======================================================================

    /** writep8 CARTRIDGE... */
    function writep8(request) {
      return invokeCliCommand("writep8", request);
    }

    /** luamin [--keep-all-names] [--keep-names-from-file FILE] CARTRIDGE... */
    function luamin(request) {
      return invokeCliCommand("luamin", request);
    }

    /** luafmt [--indentwidth N] CARTRIDGE... */
    function luafmt(request) {
      return invokeCliCommand("luafmt", request);
    }

    // ======================================================================
    // CLI ENTRY POINTS: BUILD AND COMBINE
    // Maps to: build and all of its section, Lua, and module options
    // ======================================================================

    /** build [SECTION AND LUA OPTIONS] OUTPUT */
    function build(request) {
      return invokeCliCommand("build", request);
    }

    // These grouped objects are the primary discoverable entry points.
    const commandGroups = Object.freeze({
      inspectAndSearch: Object.freeze({
        stats,
        listlua,
        listrawlua,
        listtokens,
        printast,
        luafind,
      }),
      rewriteMinifyAndFormat: Object.freeze({
        writep8,
        luamin,
        luafmt,
      }),
      buildAndCombine: Object.freeze({
        build,
      }),
    });

    // The flat registry supports generic command runners and parameterized tests.
    const cli = Object.freeze({
      stats,
      listlua,
      listrawlua,
      listtokens,
      printast,
      luafind,
      writep8,
      luamin,
      luafmt,
      build,
    });

    function listCliCommands() {
      return CLI_COMMAND_NAMES.slice();
    }

    function executeCliCommand(command, request) {
      const entryPoint = cli[command];

      if (!entryPoint) {
        throw new RangeError(
          `Unknown picotool command "${command}". Available commands: ${CLI_COMMAND_NAMES.join(", ")}`,
        );
      }

      return entryPoint(request);
    }

    function setEngineAdapter(nextAdapter) {
      if (nextAdapter !== null && (typeof nextAdapter !== "object" || Array.isArray(nextAdapter))) {
        throw new TypeError("The engine adapter must be an object or null.");
      }

      engineAdapter = nextAdapter;
      cache.clear();
      cacheBytes = 0;
    }

    return Object.freeze({
      cli,
      commandGroups,
      executeCliCommand,
      listCliCommands,
      setEngineAdapter,
    });
  }

  const browserEngine = typeof globalThis === "object" && globalThis.PicotoolJS
    && typeof globalThis.PicotoolJS.createBrowserCommands === "function"
    ? globalThis.PicotoolJS.createBrowserCommands()
    : null;
  const defaultApi = createPicoToolWebApi({ engineAdapter: browserEngine });

  return Object.freeze({
    ...defaultApi,
    createPicoToolWebApi,
  });
});
