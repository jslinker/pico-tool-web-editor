"use strict";
var PicotoolJS = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __esm = (fn, res, err2) => function __init() {
    if (err2) throw err2[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err2 = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require2() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // ../picotool-js/src/p8scii-map.js
  var require_p8scii_map = __commonJS({
    "../picotool-js/src/p8scii-map.js"(exports, module) {
      (function(root) {
        const table = ["\0", "", "", "", "", "", "", "\x07", "\b", "	", "\n", "\v", "\f", "\r", "", "", "\u25AE", "\u25A0", "\u25A1", "\u2059", "\u2058", "\u2016", "\u25C0", "\u25B6", "\u300C", "\u300D", "\xA5", "\u2022", "\u3001", "\u3002", "\u309B", "\u309C", " ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "\u25CB", "\u2588", "\u2592", "\u{1F431}", "\u2B07\uFE0F", "\u2591", "\u273D", "\u25CF", "\u2665", "\u2609", "\uC6C3", "\u2302", "\u2B05\uFE0F", "\u{1F610}", "\u266A", "\u{1F17E}\uFE0F", "\u25C6", "\u2026", "\u27A1\uFE0F", "\u2605", "\u29D7", "\u2B06\uFE0F", "\u02C7", "\u2227", "\u274E", "\u25A4", "\u25A5", "\u3042", "\u3044", "\u3046", "\u3048", "\u304A", "\u304B", "\u304D", "\u304F", "\u3051", "\u3053", "\u3055", "\u3057", "\u3059", "\u305B", "\u305D", "\u305F", "\u3061", "\u3064", "\u3066", "\u3068", "\u306A", "\u306B", "\u306C", "\u306D", "\u306E", "\u306F", "\u3072", "\u3075", "\u3078", "\u307B", "\u307E", "\u307F", "\u3080", "\u3081", "\u3082", "\u3084", "\u3086", "\u3088", "\u3089", "\u308A", "\u308B", "\u308C", "\u308D", "\u308F", "\u3092", "\u3093", "\u3063", "\u3083", "\u3085", "\u3087", "\u30A2", "\u30A4", "\u30A6", "\u30A8", "\u30AA", "\u30AB", "\u30AD", "\u30AF", "\u30B1", "\u30B3", "\u30B5", "\u30B7", "\u30B9", "\u30BB", "\u30BD", "\u30BF", "\u30C1", "\u30C4", "\u30C6", "\u30C8", "\u30CA", "\u30CB", "\u30CC", "\u30CD", "\u30CE", "\u30CF", "\u30D2", "\u30D5", "\u30D8", "\u30DB", "\u30DE", "\u30DF", "\u30E0", "\u30E1", "\u30E2", "\u30E4", "\u30E6", "\u30E8", "\u30E9", "\u30EA", "\u30EB", "\u30EC", "\u30ED", "\u30EF", "\u30F2", "\u30F3", "\u30C3", "\u30E3", "\u30E5", "\u30E7", "\u25DC", "\u25DD"];
        if (typeof module === "object" && module.exports) module.exports = table;
        if (root) root.PicotoolP8SCII = table;
      })(typeof globalThis === "object" ? globalThis : exports);
    }
  });

  // ../picotool-js/src/picotool.js
  var require_picotool = __commonJS({
    "../picotool-js/src/picotool.js"(exports, module) {
      (function initializePicotool(root, factory) {
        const api = factory();
        if (typeof module === "object" && module.exports) module.exports = api;
        if (root) root.PicotoolJS = api;
      })(typeof globalThis === "object" ? globalThis : exports, function createPicotool() {
        "use strict";
        const P8SCII = typeof globalThis === "object" && globalThis.PicotoolP8SCII ? globalThis.PicotoolP8SCII : typeof __require === "function" ? require_p8scii_map() : void 0;
        if (!P8SCII) throw new Error("p8scii-map.js must load before picotool.js");
        const UNICODE_TO_P8SCII = new Map(P8SCII.map((value, code) => [value, code]));
        const UNICODE_WIDTHS = new Map([...UNICODE_TO_P8SCII.keys()].map((value) => [value[0], value.length]));
        const REPORT_SCHEMA = "picotool-parity/1";
        const HEADER = "pico-8 cartridge // http://www.pico-8.com";
        const SECTION_NAMES = Object.freeze(["lua", "gfx", "gff", "map", "sfx", "music", "label"]);
        const SECTION_NAME_SET = new Set(SECTION_NAMES);
        class P8Error extends Error {
          constructor(code, message, details) {
            super(message);
            this.name = "P8Error";
            this.code = code;
            if (details !== void 0) this.details = details;
          }
        }
        function decodeUtf8(bytes) {
          if (typeof TextDecoder === "function") return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
          const encoded = Array.from(bytes, (byte) => `%${byte.toString(16).padStart(2, "0")}`).join("");
          return decodeURIComponent(encoded);
        }
        function encodeUtf8(value) {
          if (typeof TextEncoder === "function") return new TextEncoder().encode(value);
          const encoded = unescape(encodeURIComponent(value));
          return Uint8Array.from(encoded, (character) => character.charCodeAt(0));
        }
        function encodeP8scii(value) {
          const result = [];
          for (let index = 0; index < value.length; ) {
            const width = UNICODE_WIDTHS.get(value[index]);
            if (width === void 0) throw new TypeError(`Character is not in P8SCII: ${value[index]}`);
            const symbol = value.slice(index, index + width);
            const code = UNICODE_TO_P8SCII.get(symbol);
            if (code === void 0) throw new TypeError(`Character is not in P8SCII: ${symbol}`);
            result.push(code);
            index += width;
          }
          return Uint8Array.from(result);
        }
        function decodeP8scii(value) {
          return Array.from(value, (byte) => P8SCII[byte]).join("");
        }
        function toText(source) {
          if (typeof source === "string") return source;
          if (source instanceof Uint8Array || source instanceof ArrayBuffer) {
            const bytes = source instanceof Uint8Array ? source : new Uint8Array(source);
            return decodeUtf8(bytes);
          }
          throw new TypeError("PICO-8 cartridge input must be a string, Uint8Array, or ArrayBuffer");
        }
        function linesWithEndings(source) {
          return source.match(/[^\n]*\n|[^\n]+$/g) || [];
        }
        function withoutEnding(line) {
          return line.endsWith("\n") ? line.slice(0, -1) : line;
        }
        function parseP8(source) {
          const normalized = toText(source).replace(/\r\n?/g, "\n");
          const lines = linesWithEndings(normalized);
          if (withoutEnding(lines[0] || "") !== HEADER) {
            throw new P8Error("INVALID_HEADER", "Invalid .p8: missing or corrupt header");
          }
          const versionMatch = /^version (\d+)$/.exec(withoutEnding(lines[1] || ""));
          if (!versionMatch) throw new P8Error("INVALID_HEADER", "Invalid .p8: missing or corrupt header");
          const sections = /* @__PURE__ */ Object.create(null);
          const sectionOrder = [];
          let current;
          for (let index = 2; index < lines.length; index += 1) {
            const line = lines[index];
            const delimiter = /^__(\w+)__$/.exec(withoutEnding(line));
            if (delimiter) {
              const name = delimiter[1];
              if (!SECTION_NAME_SET.has(name)) {
                throw new P8Error("INVALID_SECTION", `Invalid .p8: bad section delimiter ${name}`, name);
              }
              if (!Object.prototype.hasOwnProperty.call(sections, name)) sectionOrder.push(name);
              sections[name] = [];
              current = name;
            } else if (current !== void 0) {
              sections[current].push(line);
            }
          }
          return Object.freeze({
            format: "p8",
            version: Number(versionMatch[1]),
            sectionOrder: Object.freeze(sectionOrder),
            sections: Object.freeze(sections)
          });
        }
        function fnv1a32(bytes) {
          let hash = 2166136261;
          for (const byte of bytes) {
            hash ^= byte;
            hash = Math.imul(hash, 16777619) >>> 0;
          }
          return hash.toString(16).padStart(8, "0");
        }
        function snapshotP8(source, name) {
          const parsed = parseP8(source);
          return {
            name,
            version: parsed.version,
            sectionOrder: [...parsed.sectionOrder],
            sections: parsed.sectionOrder.map((sectionName) => {
              const lines = parsed.sections[sectionName];
              const bytes = encodeP8scii(lines.join(""));
              return {
                name: sectionName,
                lineCount: lines.length,
                byteLength: bytes.length,
                fnv1a32: fnv1a32(bytes)
              };
            })
          };
        }
        function normalizedResult(action) {
          try {
            return { status: "ok", value: action() };
          } catch (error) {
            if (error instanceof P8Error) return { status: "error", value: error.code };
            throw error;
          }
        }
        return Object.freeze({
          HEADER,
          P8Error,
          REPORT_SCHEMA,
          SECTION_NAMES,
          encodeUtf8,
          encodeP8scii,
          decodeP8scii,
          fnv1a32,
          normalizedResult,
          parseP8,
          snapshotP8
        });
      });
    }
  });

  // ../picotool-js/src/sections.js
  var require_sections = __commonJS({
    "../picotool-js/src/sections.js"(exports, module) {
      (function initializeSections(root, factory) {
        const base = root?.PicotoolJS || (typeof __require === "function" ? require_picotool() : void 0);
        const api = factory(base);
        if (typeof module === "object" && module.exports) module.exports = api;
        if (root) {
          root.PicotoolJSSections = api;
          root.PicotoolJS = Object.freeze({ ...base, ...api });
        }
      })(typeof globalThis === "object" ? globalThis : exports, function createSections(base) {
        "use strict";
        if (!base) throw new Error("picotool.js must load before sections.js");
        const TRANSPARENT = 16;
        const GFF = Object.freeze({ RED: 1, ORANGE: 2, YELLOW: 4, GREEN: 8, BLUE: 16, PURPLE: 32, PINK: 64, PEACH: 128, ALL: 255 });
        function assertInteger(value, minimum, maximum, name) {
          if (!Number.isInteger(value) || value < minimum || value > maximum) throw new RangeError(`${name} must be ${minimum}..${maximum}`);
        }
        function hexToBytes(value) {
          const compact = value.trim();
          if (compact.length % 2 || /[^0-9a-f]/i.test(compact)) throw new Error("Invalid hexadecimal data");
          return Uint8Array.from({ length: compact.length / 2 }, (_, index) => Number.parseInt(compact.slice(index * 2, index * 2 + 2), 16));
        }
        function bytesToHex(bytes) {
          return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
        }
        class BaseSection {
          constructor(data, version = 4) {
            this._data = data instanceof Uint8Array ? data.slice() : Uint8Array.from(data || []);
            this._version = version;
          }
          static fromLines(lines, version = 4) {
            return new this(hexToBytes(lines.join("").replace(/\s/g, "")), version);
          }
          static fromBytes(data, version = 4) {
            return new this(data, version);
          }
          toBytes() {
            return this._data.slice();
          }
          toLines() {
            const lineBytes = this.constructor.HEX_LINE_LENGTH_BYTES || 64;
            const result = [];
            for (let offset = 0; offset < this._data.length; offset += lineBytes) result.push(`${bytesToHex(this._data.subarray(offset, offset + lineBytes))}
`);
            return result;
          }
        }
        class Gfx extends BaseSection {
          static HEX_LINE_LENGTH_BYTES = 64;
          static empty(version = 4) {
            return new Gfx(new Uint8Array(8192), version);
          }
          static fromLines(lines, version = 4) {
            const rows = [];
            for (const line of lines) {
              if (line.length !== 129) continue;
              const pixels = line.trim();
              let swapped = "";
              for (let index = 0; index < 128; index += 2) swapped += pixels[index + 1] + pixels[index];
              rows.push(hexToBytes(swapped));
            }
            const data = new Uint8Array(rows.length * 64);
            rows.forEach((row, index) => data.set(row, index * 64));
            return new Gfx(data, version);
          }
          toLines() {
            const result = [];
            for (let offset = 0; offset < this._data.length; offset += 64) {
              let line = "";
              for (const byte of this._data.subarray(offset, offset + 64)) line += ((byte & 15) << 4 | byte >> 4).toString(16).padStart(2, "0");
              result.push(`${line}
`);
            }
            return result;
          }
          getSprite(id, tileWidth = 1, tileHeight = 1) {
            assertInteger(id, 0, 255, "Sprite ID");
            if (!Number.isInteger(tileWidth) || tileWidth < 1 || !Number.isInteger(tileHeight) || tileHeight < 1) throw new RangeError("Sprite dimensions must be positive integers");
            const firstRow = Math.floor(id / 16), firstColumn = id % 16, result = [];
            for (let tileY = firstRow; tileY < firstRow + tileHeight; tileY += 1) {
              for (let pixelY = 0; pixelY < 8; pixelY += 1) {
                const row = [];
                for (let tileX = firstColumn; tileX < firstColumn + tileWidth; tileX += 1) {
                  if (tileX > 15 || tileY > 15) {
                    row.push(...Array(8).fill(0));
                    continue;
                  }
                  for (let pixelX = 0; pixelX < 8; pixelX += 1) {
                    const byte = this._data[tileY * 512 + pixelY * 64 + tileX * 4 + Math.floor(pixelX / 2)];
                    row.push(pixelX % 2 ? byte >> 4 : byte & 15);
                  }
                }
                result.push(row);
              }
            }
            return result;
          }
          setSprite(id, sprite, tileXOffset = 0, tileYOffset = 0) {
            assertInteger(id, 0, 255, "Sprite ID");
            const startX = id % 16 * 8 + tileXOffset, startY = Math.floor(id / 16) * 8 + tileYOffset;
            sprite.forEach((row, y) => row.forEach((value, x2) => {
              const targetX = startX + x2, targetY = startY + y;
              if (value === TRANSPARENT || targetX < 0 || targetY < 0 || targetX >= 128 || targetY >= 128) return;
              assertInteger(value, 0, 15, "Pixel");
              const offset = targetY * 64 + Math.floor(targetX / 2), byte = this._data[offset];
              this._data[offset] = targetX % 2 ? byte & 15 | value << 4 : byte & 240 | value;
            }));
          }
        }
        class Gff extends BaseSection {
          static HEX_LINE_LENGTH_BYTES = 128;
          static empty(version = 4) {
            return new Gff(new Uint8Array(256), version);
          }
          getFlags(id, flags = GFF.ALL) {
            assertInteger(id, 0, 255, "Sprite ID");
            return this._data[id] & flags;
          }
          setFlags(id, flags) {
            assertInteger(id, 0, 255, "Sprite ID");
            this._data[id] |= flags & GFF.ALL;
          }
          clearFlags(id, flags) {
            assertInteger(id, 0, 255, "Sprite ID");
            this._data[id] &= ~flags & GFF.ALL;
          }
          resetFlags(id, flags) {
            assertInteger(id, 0, 255, "Sprite ID");
            this._data[id] = flags & GFF.ALL;
          }
        }
        class MapSection extends BaseSection {
          static HEX_LINE_LENGTH_BYTES = 128;
          constructor(data, version = 4, gfx = null) {
            super(data, version);
            this._gfx = gfx;
          }
          static empty(version = 4, gfx = null) {
            return new MapSection(new Uint8Array(4096), version, gfx);
          }
          static fromLines(lines, version = 4, gfx = null) {
            return new MapSection(hexToBytes(lines.join("").replace(/\s/g, "")), version, gfx);
          }
          static fromBytes(data, version = 4, gfx = null) {
            return new MapSection(data, version, gfx);
          }
          getCell(x2, y) {
            assertInteger(x2, 0, 127, "Map x");
            assertInteger(y, 0, this._gfx ? 63 : 31, "Map y");
            return y < 32 ? this._data[y * 128 + x2] : this._gfx._data[4096 + (y - 32) * 128 + x2];
          }
          setCell(x2, y, value) {
            assertInteger(x2, 0, 127, "Map x");
            assertInteger(y, 0, this._gfx ? 63 : 31, "Map y");
            assertInteger(value, 0, 255, "Tile");
            if (y < 32) this._data[y * 128 + x2] = value;
            else this._gfx._data[4096 + (y - 32) * 128 + x2] = value;
          }
          getRectTiles(x2, y, width = 1, height = 1) {
            assertInteger(x2, 0, 127, "Map x");
            if (width < 1 || height < 1 || y < 0 || y + height > (this._gfx ? 64 : 32)) throw new RangeError("Invalid map rectangle");
            return Array.from({ length: height }, (_, dy) => Array.from({ length: width }, (_2, dx) => x2 + dx > 127 ? 0 : this.getCell(x2 + dx, y + dy)));
          }
          setRectTiles(rect, x2, y) {
            rect.forEach((row, dy) => row.forEach((value, dx) => {
              if (x2 + dx > 127 || y + dy > 63) return;
              this.setCell(x2 + dx, y + dy, value);
            }));
          }
          getRectPixels(x2, y, width = 1, height = 1) {
            if (!this._gfx) throw new Error("Map needs graphics data");
            const result = [];
            for (const tileRow of this.getRectTiles(x2, y, width, height)) {
              const pixelRows = Array.from({ length: 8 }, () => []);
              for (const id of tileRow) {
                const sprite = id === 0 ? Array.from({ length: 8 }, () => Array(8).fill(0)) : this._gfx.getSprite(id);
                for (let row = 0; row < 8; row += 1) pixelRows[row].push(...sprite[row]);
              }
              result.push(...pixelRows);
            }
            return result;
          }
        }
        class Music extends BaseSection {
          static empty(version = 4) {
            return new Music(Uint8Array.from(Array(64).fill([65, 66, 67, 68]).flat()), version);
          }
          static fromLines(lines, version = 4) {
            const data = [];
            for (const line of lines) {
              if (!line.includes(" ")) continue;
              const [flagText, channelText] = line.trim().split(" "), flags = Number.parseInt(flagText, 16);
              const channels = hexToBytes(channelText);
              data.push(channels[0] | (flags & 1) << 7, channels[1] | (flags & 2) << 6, channels[2] | (flags & 4) << 5, channels[3]);
            }
            return new Music(data, version);
          }
          toLines() {
            const lines = [];
            for (let offset = 0; offset < this._data.length; offset += 4) {
              const flags = (this._data[offset] & 128) >> 7 | (this._data[offset + 1] & 128) >> 6 | (this._data[offset + 2] & 128) >> 5;
              const channels = this._data.subarray(offset, offset + 4).map((value) => value & 127);
              lines.push(`${flags.toString(16).padStart(2, "0")} ${bytesToHex(channels)}
`);
            }
            return lines;
          }
          getChannel(id, channel) {
            assertInteger(id, 0, 63, "Music ID");
            assertInteger(channel, 0, 3, "Channel");
            const value = this._data[id * 4 + channel] & 127;
            return value > 63 ? null : value;
          }
          setChannel(id, channel, pattern) {
            assertInteger(id, 0, 63, "Music ID");
            assertInteger(channel, 0, 3, "Channel");
            if (pattern !== null) assertInteger(pattern, 0, 63, "SFX ID");
            const value = pattern === null ? 65 + channel : pattern;
            this._data[id * 4 + channel] = this._data[id * 4 + channel] & 128 | value;
          }
          getProperties(id) {
            assertInteger(id, 0, 63, "Music ID");
            return [0, 1, 2].map((channel) => Boolean(this._data[id * 4 + channel] & 128));
          }
          setProperties(id, properties = {}) {
            assertInteger(id, 0, 63, "Music ID");
            ["begin", "end", "stop"].forEach((name, channel) => {
              if (properties[name] === void 0 || properties[name] === null) return;
              this._data[id * 4 + channel] = this._data[id * 4 + channel] & 127 | (properties[name] ? 128 : 0);
            });
          }
        }
        class Sfx extends BaseSection {
          static empty(version = 4) {
            const result = new Sfx(new Uint8Array(4352), version);
            result.setProperties(0, { noteDuration: 1 });
            for (let id = 1; id < 64; id += 1) result.setProperties(id, { noteDuration: 16 });
            return result;
          }
          static fromLines(lines, version = 4) {
            const result = Sfx.empty(version);
            let id = 0;
            for (const line of lines) {
              if (line.length !== 169) continue;
              result.setProperties(id, { editorMode: Number.parseInt(line.slice(0, 2), 16), noteDuration: Number.parseInt(line.slice(2, 4), 16), loopStart: Number.parseInt(line.slice(4, 6), 16), loopEnd: Number.parseInt(line.slice(6, 8), 16) });
              for (let note = 0; note < 32; note += 1) {
                const offset = 8 + note * 5;
                result.setNote(id, note, { pitch: Number.parseInt(line.slice(offset, offset + 2), 16), waveform: Number.parseInt(line[offset + 2], 16), volume: Number.parseInt(line[offset + 3], 16), effect: Number.parseInt(line[offset + 4], 16) });
              }
              id += 1;
            }
            return result;
          }
          toLines() {
            const lines = [];
            for (let id = 0; id < 64; id += 1) {
              let line = bytesToHex(this.getProperties(id));
              for (let note = 0; note < 32; note += 1) {
                const [pitch, waveform, volume, effect] = this.getNote(id, note);
                line += `${pitch.toString(16).padStart(2, "0")}${waveform.toString(16)}${volume.toString(16)}${effect.toString(16)}`;
              }
              lines.push(`${line}
`);
            }
            return lines;
          }
          getNote(id, note) {
            assertInteger(id, 0, 63, "SFX ID");
            assertInteger(note, 0, 31, "Note");
            const lsb = this._data[id * 68 + note * 2], msb = this._data[id * 68 + note * 2 + 1];
            return [lsb & 63, (msb & 128) >> 4 | (msb & 1) << 2 | (lsb & 192) >> 6, (msb & 14) >> 1, (msb & 112) >> 4];
          }
          setNote(id, note, values = {}) {
            assertInteger(id, 0, 63, "SFX ID");
            assertInteger(note, 0, 31, "Note");
            const offset = id * 68 + note * 2;
            let lsb = this._data[offset], msb = this._data[offset + 1];
            if (values.pitch !== void 0) {
              assertInteger(values.pitch, 0, 63, "Pitch");
              lsb = lsb & 192 | values.pitch;
            }
            if (values.waveform !== void 0) {
              assertInteger(values.waveform, 0, 15, "Waveform");
              lsb = lsb & 63 | (values.waveform & 3) << 6;
              msb = msb & 126 | (values.waveform & 4) >> 2 | (values.waveform & 8) << 4;
            }
            if (values.volume !== void 0) {
              assertInteger(values.volume, 0, 7, "Volume");
              msb = msb & 241 | values.volume << 1;
            }
            if (values.effect !== void 0) {
              assertInteger(values.effect, 0, 7, "Effect");
              msb = msb & 143 | values.effect << 4;
            }
            this._data[offset] = lsb;
            this._data[offset + 1] = msb;
          }
          getProperties(id) {
            assertInteger(id, 0, 63, "SFX ID");
            return Array.from(this._data.subarray(id * 68 + 64, id * 68 + 68));
          }
          setProperties(id, values = {}) {
            assertInteger(id, 0, 63, "SFX ID");
            const fields = [["editorMode", 64], ["noteDuration", 65], ["loopStart", 66], ["loopEnd", 67]];
            for (const [name, offset] of fields) if (values[name] !== void 0 && values[name] !== null) this._data[id * 68 + offset] = values[name];
          }
        }
        function snapshotDomainP8(source, name) {
          const parsed = base.parseP8(source), version = parsed.version, domains = [];
          const constructors = { gfx: Gfx, gff: Gff, map: MapSection, sfx: Sfx, music: Music };
          let graphics = null;
          for (const sectionName of ["gfx", "gff", "map", "sfx", "music"]) {
            if (!parsed.sections[sectionName]) continue;
            const instance = sectionName === "map" ? MapSection.fromLines(parsed.sections.map, version, graphics) : constructors[sectionName].fromLines(parsed.sections[sectionName], version);
            if (sectionName === "gfx") graphics = instance;
            domains.push({ name: sectionName, byteLength: instance._data.length, fnv1a32: base.fnv1a32(instance._data) });
          }
          return { ...base.snapshotP8(source, name), domainMemory: domains };
        }
        return Object.freeze({ BaseSection, GFF, Gff, Gfx, MapSection, Music, Sfx, TRANSPARENT, bytesToHex, hexToBytes, snapshotDomainP8 });
      });
    }
  });

  // ../picotool-js/src/p8png.js
  var require_p8png = __commonJS({
    "../picotool-js/src/p8png.js"(exports, module) {
      (function initializeP8Png(root, factory) {
        const base = root?.PicotoolJS || (typeof __require === "function" ? { ...require_picotool(), ...require_sections() } : void 0);
        const api = factory(base);
        if (typeof module === "object" && module.exports) module.exports = api;
        if (root) {
          root.PicotoolJSPng = api;
          root.PicotoolJS = Object.freeze({ ...base, ...api });
        }
      })(typeof globalThis === "object" ? globalThis : exports, function createP8Png(base) {
        "use strict";
        if (!base) throw new Error("picotool.js and sections.js must load before p8png.js");
        const CODE_OFFSET = 17152;
        const CODE_END = 32768;
        const VERSION_OFFSET = 32768;
        const COMPRESSED_LUA_CHAR_TABLE = base.encodeUtf8("#\n 0123456789abcdefghijklmnopqrstuvwxyz!#%(){}[]<>+=/*:;.,~_");
        const FUTURE_CODE_1 = base.encodeUtf8("if(_update60)_update=function()_update60()_update60()end");
        const FUTURE_CODE_2 = base.encodeUtf8("if(_update60)_update=function()_update60()_update_buttons()_update60()end");
        function asBytes(value) {
          if (typeof value === "string") return base.encodeUtf8(value);
          if (value instanceof Uint8Array) return value;
          if (value instanceof ArrayBuffer) return new Uint8Array(value);
          return Uint8Array.from(value);
        }
        function endsWithBytes(value, suffix) {
          if (suffix.length > value.length) return false;
          for (let index = 0; index < suffix.length; index += 1) if (value[value.length - suffix.length + index] !== suffix[index]) return false;
          return true;
        }
        function containsBytes(value, search) {
          outer: for (let start = 0; start <= value.length - search.length; start += 1) {
            for (let index = 0; index < search.length; index += 1) if (value[start + index] !== search[index]) continue outer;
            return true;
          }
          return false;
        }
        function findRepeatableBlock(data, position) {
          const maximumLength = Math.min(17, data.length - position);
          const maximumHistory = Math.min((255 - COMPRESSED_LUA_CHAR_TABLE.length) * 16, position);
          let bestLength = 0, bestIndex = -1e5;
          for (let index = position - maximumHistory; index < position; index += 1) {
            let cursor = index;
            while (cursor - index < maximumLength && cursor < position && data[cursor] === data[position + cursor - index]) cursor += 1;
            if (cursor - index > bestLength) {
              bestLength = cursor - index;
              bestIndex = index;
            }
          }
          return [bestLength, position - bestIndex];
        }
        function compressCode(input) {
          let data = asBytes(input);
          const update60 = base.encodeUtf8("_update60");
          if (containsBytes(data, update60) && data.length < 65537 - FUTURE_CODE_2.length - 1) {
            const separator = data.at(-1) === 32 || data.at(-1) === 10 ? new Uint8Array() : Uint8Array.of(10);
            const expanded = new Uint8Array(data.length + separator.length + FUTURE_CODE_2.length);
            expanded.set(data);
            expanded.set(separator, data.length);
            expanded.set(FUTURE_CODE_2, data.length + separator.length);
            data = expanded;
          }
          const literalIndex = new Uint8Array(256);
          for (let index = 1; index < COMPRESSED_LUA_CHAR_TABLE.length; index += 1) literalIndex[COMPRESSED_LUA_CHAR_TABLE[index]] = index;
          const output = [];
          for (let position = 0; position < data.length; ) {
            const [length, offset] = findRepeatableBlock(data, position);
            if (length >= 3) {
              output.push(Math.floor(offset / 16) + COMPRESSED_LUA_CHAR_TABLE.length, offset % 16 + (length - 2) * 16);
              position += length;
            } else {
              const literal = literalIndex[data[position]];
              output.push(literal);
              if (literal === 0) output.push(data[position]);
              position += 1;
            }
          }
          return Uint8Array.from(output);
        }
        function decompressCode(input) {
          const data = asBytes(input), codeLength = data[4] << 8 | data[5];
          if (data[6] !== 0 || data[7] !== 0) throw new Error("Invalid compressed Lua header");
          const output = new Uint8Array(codeLength);
          let inputIndex = 8, outputIndex = 0;
          while (outputIndex < codeLength && inputIndex < data.length) {
            const command = data[inputIndex];
            if (command === 0) {
              inputIndex += 1;
              output[outputIndex] = data[inputIndex];
              outputIndex += 1;
            } else if (command <= 59) {
              output[outputIndex] = COMPRESSED_LUA_CHAR_TABLE[command];
              outputIndex += 1;
            } else {
              inputIndex += 1;
              const offset = (command - 60) * 16 + (data[inputIndex] & 15), length = (data[inputIndex] >> 4) + 2;
              output.set(output.slice(outputIndex - offset, outputIndex - offset + length), outputIndex);
              outputIndex += length;
            }
            inputIndex += 1;
          }
          let start = 0, end = output.length;
          while (start < end && output[start] === 0) start += 1;
          while (end > start && output[end - 1] === 0) end -= 1;
          let code = output.slice(start, end);
          for (const suffix of [FUTURE_CODE_1, FUTURE_CODE_2]) if (endsWithBytes(code, suffix)) {
            code = code.slice(0, code.length - suffix.length);
            if (code.at(-1) === 10) code = code.slice(0, -1);
            break;
          }
          return { codeLength, code, compressedSize: inputIndex };
        }
        function getCodeFromBytes(input, version) {
          const data = asBytes(input);
          let result;
          if (version === 0 || data[0] !== 58 || data[1] !== 99 || data[2] !== 58 || data[3] !== 0) {
            const zero = data.indexOf(0), codeLength = zero < 0 ? CODE_END - CODE_OFFSET : zero;
            const code = new Uint8Array(codeLength + 1);
            code.set(data.slice(0, codeLength));
            code[codeLength] = 10;
            result = { codeLength, code, compressedSize: null };
          } else result = decompressCode(data);
          result.code = result.code.map((byte) => byte === 13 ? 32 : byte);
          return result;
        }
        function getBytesFromCode(input) {
          const code = asBytes(input), compressed = compressCode(code);
          if (code.length > 65535) throw new RangeError("PICO-8 Lua code is too large for the PNG code-length header");
          let encoded;
          if (compressed.length < code.length) {
            encoded = new Uint8Array(8 + compressed.length);
            encoded.set([58, 99, 58, 0, code.length >> 8, code.length & 255, 0, 0]);
            encoded.set(compressed, 8);
          } else encoded = code;
          const output = new Uint8Array(CODE_END - CODE_OFFSET);
          if (encoded.length > output.length) throw new RangeError("PICO-8 Lua code does not fit in the PNG code region");
          output.set(encoded);
          return output;
        }
        function getPicodataFromRgba(width, height, rgba) {
          const pixels = asBytes(rgba);
          if (pixels.length !== width * height * 4) throw new RangeError("RGBA data length does not match the image dimensions");
          const picodata = new Uint8Array(width * height);
          for (let pixel = 0; pixel < picodata.length; pixel += 1) {
            const offset = pixel * 4;
            picodata[pixel] = pixels[offset + 2] & 3 | (pixels[offset + 1] & 3) << 2 | (pixels[offset] & 3) << 4 | (pixels[offset + 3] & 3) << 6;
          }
          return picodata;
        }
        function getRgbaFromPicodata(picodataInput, rgbaInput) {
          const picodata = asBytes(picodataInput), rgba = asBytes(rgbaInput).slice();
          const count = Math.min(picodata.length, Math.floor(rgba.length / 4));
          for (let pixel = 0; pixel < count; pixel += 1) {
            const offset = pixel * 4, byte = picodata[pixel];
            rgba[offset + 2] = rgba[offset + 2] & 252 | byte & 3;
            rgba[offset + 1] = rgba[offset + 1] & 252 | byte >> 2 & 3;
            rgba[offset] = rgba[offset] & 252 | byte >> 4 & 3;
            rgba[offset + 3] = rgba[offset + 3] & 252 | byte >> 6 & 3;
          }
          return rgba;
        }
        function parseP8PngPicodata(input) {
          const data = asBytes(input);
          if (data.length <= VERSION_OFFSET) throw new RangeError("P8 PNG data must contain at least 0x8001 hidden bytes");
          const version = data[VERSION_OFFSET], code = getCodeFromBytes(data.slice(CODE_OFFSET, CODE_END), version);
          const gfx = base.Gfx.fromBytes(data.slice(0, 8192), version);
          return Object.freeze({
            format: "p8.png",
            version,
            code,
            gfx,
            map: base.MapSection.fromBytes(data.slice(8192, 12288), version, gfx),
            gff: base.Gff.fromBytes(data.slice(12288, 12544), version),
            music: base.Music.fromBytes(data.slice(12544, 12800), version),
            sfx: base.Sfx.fromBytes(data.slice(12800, 17152), version)
          });
        }
        function serializeP8PngPicodata(cartridge, luaBytes) {
          const output = new Uint8Array(VERSION_OFFSET + 1);
          output.set(cartridge.gfx.toBytes(), 0);
          output.set(cartridge.map.toBytes(), 8192);
          output.set(cartridge.gff.toBytes(), 12288);
          output.set(cartridge.music.toBytes(), 12544);
          output.set(cartridge.sfx.toBytes(), 12800);
          output.set(getBytesFromCode(luaBytes ?? cartridge.code?.code ?? new Uint8Array()), CODE_OFFSET);
          output[VERSION_OFFSET] = cartridge.version;
          return output;
        }
        function snapshotP8PngPicodata(input, name) {
          const parsed = parseP8PngPicodata(input);
          const domains = ["gfx", "gff", "map", "sfx", "music"].map((domain) => ({ name: domain, byteLength: parsed[domain]._data.length, fnv1a32: base.fnv1a32(parsed[domain]._data) }));
          return {
            name,
            version: parsed.version,
            code: { byteLength: parsed.code.code.length, codeLength: parsed.code.codeLength, compressedSize: parsed.code.compressedSize, fnv1a32: base.fnv1a32(parsed.code.code) },
            domainMemory: domains
          };
        }
        return Object.freeze({
          CODE_END,
          CODE_OFFSET,
          VERSION_OFFSET,
          compressCode,
          decompressCode,
          getCodeFromBytes,
          getBytesFromCode,
          getPicodataFromRgba,
          getRgbaFromPicodata,
          parseP8PngPicodata,
          serializeP8PngPicodata,
          snapshotP8PngPicodata
        });
      });
    }
  });

  // ../picotool-js/node_modules/fflate/esm/browser.js
  function zlibSync(data, opts) {
    if (!opts)
      opts = {};
    var a = adler();
    a.p(data);
    var d = dopt(data, opts, opts.dictionary ? 6 : 2, 4);
    return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
  }
  function unzlibSync(data, opts) {
    return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  var u8, u16, i32, fleb, fdeb, clim, freb, _a, fl, revfl, _b, fd, revfd, rev, x, i, hMap, flt, i, i, i, i, fdt, i, flm, flrm, fdm, fdrm, max, bits, bits16, shft, slc, ec, err, inflt, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, deo, et, dflt, adler, dopt, wbytes, zlh, zls, Inflate, Unzlib, td, tds;
  var init_browser = __esm({
    "../picotool-js/node_modules/fflate/esm/browser.js"() {
      u8 = Uint8Array;
      u16 = Uint16Array;
      i32 = Int32Array;
      fleb = new u8([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        0,
        /* unused */
        0,
        0,
        /* impossible */
        0
      ]);
      fdeb = new u8([
        0,
        0,
        0,
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8,
        9,
        9,
        10,
        10,
        11,
        11,
        12,
        12,
        13,
        13,
        /* unused */
        0,
        0
      ]);
      clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
      freb = function(eb, start) {
        var b = new u16(31);
        for (var i2 = 0; i2 < 31; ++i2) {
          b[i2] = start += 1 << eb[i2 - 1];
        }
        var r = new i32(b[30]);
        for (var i2 = 1; i2 < 30; ++i2) {
          for (var j = b[i2]; j < b[i2 + 1]; ++j) {
            r[j] = j - b[i2] << 5 | i2;
          }
        }
        return { b, r };
      };
      _a = freb(fleb, 2);
      fl = _a.b;
      revfl = _a.r;
      fl[28] = 258, revfl[258] = 28;
      _b = freb(fdeb, 0);
      fd = _b.b;
      revfd = _b.r;
      rev = new u16(32768);
      for (i = 0; i < 32768; ++i) {
        x = (i & 43690) >> 1 | (i & 21845) << 1;
        x = (x & 52428) >> 2 | (x & 13107) << 2;
        x = (x & 61680) >> 4 | (x & 3855) << 4;
        rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
      }
      hMap = (function(cd, mb, r) {
        var s = cd.length;
        var i2 = 0;
        var l = new u16(mb);
        for (; i2 < s; ++i2) {
          if (cd[i2])
            ++l[cd[i2] - 1];
        }
        var le = new u16(mb);
        for (i2 = 1; i2 < mb; ++i2) {
          le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
        }
        var co;
        if (r) {
          co = new u16(1 << mb);
          var rvb = 15 - mb;
          for (i2 = 0; i2 < s; ++i2) {
            if (cd[i2]) {
              var sv = i2 << 4 | cd[i2];
              var r_1 = mb - cd[i2];
              var v = le[cd[i2] - 1]++ << r_1;
              for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
                co[rev[v] >> rvb] = sv;
              }
            }
          }
        } else {
          co = new u16(s);
          for (i2 = 0; i2 < s; ++i2) {
            if (cd[i2]) {
              co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
            }
          }
        }
        return co;
      });
      flt = new u8(288);
      for (i = 0; i < 144; ++i)
        flt[i] = 8;
      for (i = 144; i < 256; ++i)
        flt[i] = 9;
      for (i = 256; i < 280; ++i)
        flt[i] = 7;
      for (i = 280; i < 288; ++i)
        flt[i] = 8;
      fdt = new u8(32);
      for (i = 0; i < 32; ++i)
        fdt[i] = 5;
      flm = /* @__PURE__ */ hMap(flt, 9, 0);
      flrm = /* @__PURE__ */ hMap(flt, 9, 1);
      fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
      fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
      max = function(a) {
        var m = a[0];
        for (var i2 = 1; i2 < a.length; ++i2) {
          if (a[i2] > m)
            m = a[i2];
        }
        return m;
      };
      bits = function(d, p, m) {
        var o = p / 8 | 0;
        return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
      };
      bits16 = function(d, p) {
        var o = p / 8 | 0;
        return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
      };
      shft = function(p) {
        return (p + 7) / 8 | 0;
      };
      slc = function(v, s, e) {
        if (s == null || s < 0)
          s = 0;
        if (e == null || e > v.length)
          e = v.length;
        return new u8(v.subarray(s, e));
      };
      ec = [
        "unexpected EOF",
        "invalid block type",
        "invalid length/literal",
        "invalid distance",
        "stream finished",
        "no stream handler",
        ,
        // determined by compression function
        "no callback",
        "invalid UTF-8 data",
        "extra field too long",
        "date not in range 1980-2099",
        "filename too long",
        "stream finishing",
        "invalid zip data"
        // determined by unknown compression method
      ];
      err = function(ind, msg, nt) {
        var e = new Error(msg || ec[ind]);
        e.code = ind;
        if (Error.captureStackTrace)
          Error.captureStackTrace(e, err);
        if (!nt)
          throw e;
        return e;
      };
      inflt = function(dat, st, buf, dict) {
        var sl = dat.length, dl = dict ? dict.length : 0;
        if (!sl || st.f && !st.l)
          return buf || new u8(0);
        var noBuf = !buf;
        var resize = noBuf || st.i != 2;
        var noSt = st.i;
        if (noBuf)
          buf = new u8(sl * 3);
        var cbuf = function(l2) {
          var bl = buf.length;
          if (l2 > bl) {
            var nbuf = new u8(Math.max(bl * 2, l2));
            nbuf.set(buf);
            buf = nbuf;
          }
        };
        var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
        var tbts = sl * 8;
        do {
          if (!lm) {
            final = bits(dat, pos, 1);
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
              var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
              if (t > sl) {
                if (noSt)
                  err(0);
                break;
              }
              if (resize)
                cbuf(bt + l);
              buf.set(dat.subarray(s, t), bt);
              st.b = bt += l, st.p = pos = t * 8, st.f = final;
              continue;
            } else if (type == 1)
              lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
              var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
              var tl = hLit + bits(dat, pos + 5, 31) + 1;
              pos += 14;
              var ldt = new u8(tl);
              var clt = new u8(19);
              for (var i2 = 0; i2 < hcLen; ++i2) {
                clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
              }
              pos += hcLen * 3;
              var clb = max(clt), clbmsk = (1 << clb) - 1;
              var clm = hMap(clt, clb, 1);
              for (var i2 = 0; i2 < tl; ) {
                var r = clm[bits(dat, pos, clbmsk)];
                pos += r & 15;
                var s = r >> 4;
                if (s < 16) {
                  ldt[i2++] = s;
                } else {
                  var c = 0, n = 0;
                  if (s == 16)
                    n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
                  else if (s == 17)
                    n = 3 + bits(dat, pos, 7), pos += 3;
                  else if (s == 18)
                    n = 11 + bits(dat, pos, 127), pos += 7;
                  while (n--)
                    ldt[i2++] = c;
                }
              }
              var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
              lbt = max(lt);
              dbt = max(dt);
              lm = hMap(lt, lbt, 1);
              dm = hMap(dt, dbt, 1);
            } else
              err(1);
            if (pos > tbts) {
              if (noSt)
                err(0);
              break;
            }
          }
          if (resize)
            cbuf(bt + 131072);
          var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
          var lpos = pos;
          for (; ; lpos = pos) {
            var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
            pos += c & 15;
            if (pos > tbts) {
              if (noSt)
                err(0);
              break;
            }
            if (!c)
              err(2);
            if (sym < 256)
              buf[bt++] = sym;
            else if (sym == 256) {
              lpos = pos, lm = null;
              break;
            } else {
              var add = sym - 254;
              if (sym > 264) {
                var i2 = sym - 257, b = fleb[i2];
                add = bits(dat, pos, (1 << b) - 1) + fl[i2];
                pos += b;
              }
              var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
              if (!d)
                err(3);
              pos += d & 15;
              var dt = fd[dsym];
              if (dsym > 3) {
                var b = fdeb[dsym];
                dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
              }
              if (pos > tbts) {
                if (noSt)
                  err(0);
                break;
              }
              if (resize)
                cbuf(bt + 131072);
              var end = bt + add;
              if (bt < dt) {
                var shift = dl - dt, dend = Math.min(dt, end);
                if (shift + bt < 0)
                  err(3);
                for (; bt < dend; ++bt)
                  buf[bt] = dict[shift + bt];
              }
              for (; bt < end; ++bt)
                buf[bt] = buf[bt - dt];
            }
          }
          st.l = lm, st.p = lpos, st.b = bt, st.f = final;
          if (lm)
            final = 1, st.m = lbt, st.d = dm, st.n = dbt;
        } while (!final);
        return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
      };
      wbits = function(d, p, v) {
        v <<= p & 7;
        var o = p / 8 | 0;
        d[o] |= v;
        d[o + 1] |= v >> 8;
      };
      wbits16 = function(d, p, v) {
        v <<= p & 7;
        var o = p / 8 | 0;
        d[o] |= v;
        d[o + 1] |= v >> 8;
        d[o + 2] |= v >> 16;
      };
      hTree = function(d, mb) {
        var t = [];
        for (var i2 = 0; i2 < d.length; ++i2) {
          if (d[i2])
            t.push({ s: i2, f: d[i2] });
        }
        var s = t.length;
        var t2 = t.slice();
        if (!s)
          return { t: et, l: 0 };
        if (s == 1) {
          var v = new u8(t[0].s + 1);
          v[t[0].s] = 1;
          return { t: v, l: 1 };
        }
        t.sort(function(a, b) {
          return a.f - b.f;
        });
        t.push({ s: -1, f: 25001 });
        var l = t[0], r = t[1], i0 = 0, i1 = 1, i22 = 2;
        t[0] = { s: -1, f: l.f + r.f, l, r };
        while (i1 != s - 1) {
          l = t[t[i0].f < t[i22].f ? i0++ : i22++];
          r = t[i0 != i1 && t[i0].f < t[i22].f ? i0++ : i22++];
          t[i1++] = { s: -1, f: l.f + r.f, l, r };
        }
        var maxSym = t2[0].s;
        for (var i2 = 1; i2 < s; ++i2) {
          if (t2[i2].s > maxSym)
            maxSym = t2[i2].s;
        }
        var tr = new u16(maxSym + 1);
        var mbt = ln(t[i1 - 1], tr, 0);
        if (mbt > mb) {
          var i2 = 0, dt = 0;
          var lft = mbt - mb, cst = 1 << lft;
          t2.sort(function(a, b) {
            return tr[b.s] - tr[a.s] || a.f - b.f;
          });
          for (; i2 < s; ++i2) {
            var i2_1 = t2[i2].s;
            if (tr[i2_1] > mb) {
              dt += cst - (1 << mbt - tr[i2_1]);
              tr[i2_1] = mb;
            } else
              break;
          }
          dt >>= lft;
          while (dt > 0) {
            var i2_2 = t2[i2].s;
            if (tr[i2_2] < mb)
              dt -= 1 << mb - tr[i2_2]++ - 1;
            else
              ++i2;
          }
          for (; i2 >= 0 && dt; --i2) {
            var i2_3 = t2[i2].s;
            if (tr[i2_3] == mb) {
              --tr[i2_3];
              ++dt;
            }
          }
          mbt = mb;
        }
        return { t: new u8(tr), l: mbt };
      };
      ln = function(n, l, d) {
        return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
      };
      lc = function(c) {
        var s = c.length;
        while (s && !c[--s])
          ;
        var cl = new u16(++s);
        var cli = 0, cln = c[0], cls = 1;
        var w = function(v) {
          cl[cli++] = v;
        };
        for (var i2 = 1; i2 <= s; ++i2) {
          if (c[i2] == cln && i2 != s)
            ++cls;
          else {
            if (!cln && cls > 2) {
              for (; cls > 138; cls -= 138)
                w(32754);
              if (cls > 2) {
                w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
                cls = 0;
              }
            } else if (cls > 3) {
              w(cln), --cls;
              for (; cls > 6; cls -= 6)
                w(8304);
              if (cls > 2)
                w(cls - 3 << 5 | 8208), cls = 0;
            }
            while (cls--)
              w(cln);
            cls = 1;
            cln = c[i2];
          }
        }
        return { c: cl.subarray(0, cli), n: s };
      };
      clen = function(cf, cl) {
        var l = 0;
        for (var i2 = 0; i2 < cl.length; ++i2)
          l += cf[i2] * cl[i2];
        return l;
      };
      wfblk = function(out, pos, dat) {
        var s = dat.length;
        var o = shft(pos + 2);
        out[o] = s & 255;
        out[o + 1] = s >> 8;
        out[o + 2] = out[o] ^ 255;
        out[o + 3] = out[o + 1] ^ 255;
        for (var i2 = 0; i2 < s; ++i2)
          out[o + i2 + 4] = dat[i2];
        return (o + 4 + s) * 8;
      };
      wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
        wbits(out, p++, final);
        ++lf[256];
        var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
        var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
        var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
        var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
        var lcfreq = new u16(19);
        for (var i2 = 0; i2 < lclt.length; ++i2)
          ++lcfreq[lclt[i2] & 31];
        for (var i2 = 0; i2 < lcdt.length; ++i2)
          ++lcfreq[lcdt[i2] & 31];
        var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
        var nlcc = 19;
        for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
          ;
        var flen = bl + 5 << 3;
        var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
        var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
        if (bs >= 0 && flen <= ftlen && flen <= dtlen)
          return wfblk(out, p, dat.subarray(bs, bs + bl));
        var lm, ll, dm, dl;
        wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
        if (dtlen < ftlen) {
          lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
          var llm = hMap(lct, mlcb, 0);
          wbits(out, p, nlc - 257);
          wbits(out, p + 5, ndc - 1);
          wbits(out, p + 10, nlcc - 4);
          p += 14;
          for (var i2 = 0; i2 < nlcc; ++i2)
            wbits(out, p + 3 * i2, lct[clim[i2]]);
          p += 3 * nlcc;
          var lcts = [lclt, lcdt];
          for (var it = 0; it < 2; ++it) {
            var clct = lcts[it];
            for (var i2 = 0; i2 < clct.length; ++i2) {
              var len = clct[i2] & 31;
              wbits(out, p, llm[len]), p += lct[len];
              if (len > 15)
                wbits(out, p, clct[i2] >> 5 & 127), p += clct[i2] >> 12;
            }
          }
        } else {
          lm = flm, ll = flt, dm = fdm, dl = fdt;
        }
        for (var i2 = 0; i2 < li; ++i2) {
          var sym = syms[i2];
          if (sym > 255) {
            var len = sym >> 18 & 31;
            wbits16(out, p, lm[len + 257]), p += ll[len + 257];
            if (len > 7)
              wbits(out, p, sym >> 23 & 31), p += fleb[len];
            var dst = sym & 31;
            wbits16(out, p, dm[dst]), p += dl[dst];
            if (dst > 3)
              wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
          } else {
            wbits16(out, p, lm[sym]), p += ll[sym];
          }
        }
        wbits16(out, p, lm[256]);
        return p + ll[256];
      };
      deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
      et = /* @__PURE__ */ new u8(0);
      dflt = function(dat, lvl, plvl, pre, post, st) {
        var s = st.z || dat.length;
        var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
        var w = o.subarray(pre, o.length - post);
        var lst = st.l;
        var pos = (st.r || 0) & 7;
        if (lvl) {
          if (pos)
            w[0] = st.r >> 3;
          var opt = deo[lvl - 1];
          var n = opt >> 13, c = opt & 8191;
          var msk_1 = (1 << plvl) - 1;
          var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
          var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
          var hsh = function(i3) {
            return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
          };
          var syms = new i32(25e3);
          var lf = new u16(288), df = new u16(32);
          var lc_1 = 0, eb = 0, i2 = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
          for (; i2 + 2 < s; ++i2) {
            var hv = hsh(i2);
            var imod = i2 & 32767, pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            if (wi <= i2) {
              var rem = s - i2;
              if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
                pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
                li = lc_1 = eb = 0, bs = i2;
                for (var j = 0; j < 286; ++j)
                  lf[j] = 0;
                for (var j = 0; j < 30; ++j)
                  df[j] = 0;
              }
              var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
              if (rem > 2 && hv == hsh(i2 - dif)) {
                var maxn = Math.min(n, rem) - 1;
                var maxd = Math.min(32767, i2);
                var ml = Math.min(258, rem);
                while (dif <= maxd && --ch_1 && imod != pimod) {
                  if (dat[i2 + l] == dat[i2 + l - dif]) {
                    var nl = 0;
                    for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                      ;
                    if (nl > l) {
                      l = nl, d = dif;
                      if (nl > maxn)
                        break;
                      var mmd = Math.min(dif, nl - 2);
                      var md = 0;
                      for (var j = 0; j < mmd; ++j) {
                        var ti = i2 - dif + j & 32767;
                        var pti = prev[ti];
                        var cd = ti - pti & 32767;
                        if (cd > md)
                          md = cd, pimod = ti;
                      }
                    }
                  }
                  imod = pimod, pimod = prev[imod];
                  dif += imod - pimod & 32767;
                }
              }
              if (d) {
                syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
                var lin = revfl[l] & 31, din = revfd[d] & 31;
                eb += fleb[lin] + fdeb[din];
                ++lf[257 + lin];
                ++df[din];
                wi = i2 + l;
                ++lc_1;
              } else {
                syms[li++] = dat[i2];
                ++lf[dat[i2]];
              }
            }
          }
          for (i2 = Math.max(i2, wi); i2 < s; ++i2) {
            syms[li++] = dat[i2];
            ++lf[dat[i2]];
          }
          pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
          if (!lst) {
            st.r = pos & 7 | w[pos / 8 | 0] << 3;
            pos -= 7;
            st.h = head, st.p = prev, st.i = i2, st.w = wi;
          }
        } else {
          for (var i2 = st.w || 0; i2 < s + lst; i2 += 65535) {
            var e = i2 + 65535;
            if (e >= s) {
              w[pos / 8 | 0] = lst;
              e = s;
            }
            pos = wfblk(w, pos + 1, dat.subarray(i2, e));
          }
          st.i = s;
        }
        return slc(o, 0, pre + shft(pos) + post);
      };
      adler = function() {
        var a = 1, b = 0;
        return {
          p: function(d) {
            var n = a, m = b;
            var l = d.length | 0;
            for (var i2 = 0; i2 != l; ) {
              var e = Math.min(i2 + 2655, l);
              for (; i2 < e; ++i2)
                m += n += d[i2];
              n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
            }
            a = n, b = m;
          },
          d: function() {
            a %= 65521, b %= 65521;
            return (a & 255) << 24 | (a & 65280) << 8 | (b & 255) << 8 | b >> 8;
          }
        };
      };
      dopt = function(dat, opt, pre, post, st) {
        if (!st) {
          st = { l: 1 };
          if (opt.dictionary) {
            var dict = opt.dictionary.subarray(-32768);
            var newDat = new u8(dict.length + dat.length);
            newDat.set(dict);
            newDat.set(dat, dict.length);
            dat = newDat;
            st.w = dict.length;
          }
        }
        return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
      };
      wbytes = function(d, b, v) {
        for (; v; ++b)
          d[b] = v, v >>>= 8;
      };
      zlh = function(c, o) {
        var lv = o.level, fl2 = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
        c[0] = 120, c[1] = fl2 << 6 | (o.dictionary && 32);
        c[1] |= 31 - (c[0] << 8 | c[1]) % 31;
        if (o.dictionary) {
          var h = adler();
          h.p(o.dictionary);
          wbytes(c, 2, h.d());
        }
      };
      zls = function(d, dict) {
        if ((d[0] & 15) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31)
          err(6, "invalid zlib data");
        if ((d[1] >> 5 & 1) == +!dict)
          err(6, "invalid zlib data: " + (d[1] & 32 ? "need" : "unexpected") + " dictionary");
        return (d[1] >> 3 & 4) + 2;
      };
      Inflate = /* @__PURE__ */ (function() {
        function Inflate2(opts, cb) {
          if (typeof opts == "function")
            cb = opts, opts = {};
          this.ondata = cb;
          var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
          this.s = { i: 0, b: dict ? dict.length : 0 };
          this.o = new u8(32768);
          this.p = new u8(0);
          if (dict)
            this.o.set(dict);
        }
        Inflate2.prototype.e = function(c) {
          if (!this.ondata)
            err(5);
          if (this.d)
            err(4);
          if (!this.p.length)
            this.p = c;
          else if (c.length) {
            var n = new u8(this.p.length + c.length);
            n.set(this.p), n.set(c, this.p.length), this.p = n;
          }
        };
        Inflate2.prototype.c = function(final) {
          this.s.i = +(this.d = final || false);
          var bts = this.s.b;
          var dt = inflt(this.p, this.s, this.o);
          this.ondata(slc(dt, bts, this.s.b), this.d);
          this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
          this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
        };
        Inflate2.prototype.push = function(chunk, final) {
          this.e(chunk), this.c(final);
        };
        return Inflate2;
      })();
      Unzlib = /* @__PURE__ */ (function() {
        function Unzlib2(opts, cb) {
          Inflate.call(this, opts, cb);
          this.v = opts && opts.dictionary ? 2 : 1;
        }
        Unzlib2.prototype.push = function(chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
            if (this.p.length < 6 && !final)
              return;
            this.p = this.p.subarray(zls(this.p, this.v - 1)), this.v = 0;
          }
          if (final) {
            if (this.p.length < 4)
              err(6, "invalid zlib data");
            this.p = this.p.subarray(0, -4);
          }
          Inflate.prototype.c.call(this, final);
        };
        return Unzlib2;
      })();
      td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
      tds = 0;
      try {
        td.decode(et, { stream: true });
        tds = 1;
      } catch (e) {
      }
    }
  });

  // ../picotool-js/node_modules/iobuffer/lib/text.js
  function decode(bytes, encoding = "utf8") {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(bytes);
  }
  function encode(str) {
    return encoder.encode(str);
  }
  var encoder;
  var init_text = __esm({
    "../picotool-js/node_modules/iobuffer/lib/text.js"() {
      encoder = new TextEncoder();
    }
  });

  // ../picotool-js/node_modules/iobuffer/lib/iobuffer.js
  var defaultByteLength, hostBigEndian, typedArrays, IOBuffer;
  var init_iobuffer = __esm({
    "../picotool-js/node_modules/iobuffer/lib/iobuffer.js"() {
      init_text();
      defaultByteLength = 1024 * 8;
      hostBigEndian = (() => {
        const array = new Uint8Array(4);
        const view = new Uint32Array(array.buffer);
        return !((view[0] = 1) & array[0]);
      })();
      typedArrays = {
        int8: globalThis.Int8Array,
        uint8: globalThis.Uint8Array,
        int16: globalThis.Int16Array,
        uint16: globalThis.Uint16Array,
        int32: globalThis.Int32Array,
        uint32: globalThis.Uint32Array,
        uint64: globalThis.BigUint64Array,
        int64: globalThis.BigInt64Array,
        float32: globalThis.Float32Array,
        float64: globalThis.Float64Array
      };
      IOBuffer = class _IOBuffer {
        /**
         * Reference to the internal ArrayBuffer object.
         */
        buffer;
        /**
         * Byte length of the internal ArrayBuffer.
         */
        byteLength;
        /**
         * Byte offset of the internal ArrayBuffer.
         */
        byteOffset;
        /**
         * Byte length of the internal ArrayBuffer.
         */
        length;
        /**
         * The current offset of the buffer's pointer.
         */
        offset;
        lastWrittenByte;
        littleEndian;
        _data;
        _mark;
        _marks;
        /**
         * Create a new IOBuffer.
         * @param data - The data to construct the IOBuffer with.
         * If data is a number, it will be the new buffer's length<br>
         * If data is `undefined`, the buffer will be initialized with a default length of 8Kb<br>
         * If data is an ArrayBuffer, SharedArrayBuffer, an ArrayBufferView (Typed Array), an IOBuffer instance,
         * or a Node.js Buffer, a view will be created over the underlying ArrayBuffer.
         * @param options - An object for the options.
         * @returns A new IOBuffer instance.
         */
        constructor(data = defaultByteLength, options = {}) {
          let dataIsGiven = false;
          if (typeof data === "number") {
            data = new ArrayBuffer(data);
          } else {
            dataIsGiven = true;
            this.lastWrittenByte = data.byteLength;
          }
          const offset = options.offset ? options.offset >>> 0 : 0;
          const byteLength = data.byteLength - offset;
          let dvOffset = offset;
          if (ArrayBuffer.isView(data) || data instanceof _IOBuffer) {
            if (data.byteLength !== data.buffer.byteLength) {
              dvOffset = data.byteOffset + offset;
            }
            data = data.buffer;
          }
          if (dataIsGiven) {
            this.lastWrittenByte = byteLength;
          } else {
            this.lastWrittenByte = 0;
          }
          this.buffer = data;
          this.length = byteLength;
          this.byteLength = byteLength;
          this.byteOffset = dvOffset;
          this.offset = 0;
          this.littleEndian = true;
          this._data = new DataView(this.buffer, dvOffset, byteLength);
          this._mark = 0;
          this._marks = [];
        }
        /**
         * Checks if the memory allocated to the buffer is sufficient to store more
         * bytes after the offset.
         * @param byteLength - The needed memory in bytes.
         * @returns `true` if there is sufficient space and `false` otherwise.
         */
        available(byteLength = 1) {
          return this.offset + byteLength <= this.length;
        }
        /**
         * Check if little-endian mode is used for reading and writing multi-byte
         * values.
         * @returns `true` if little-endian mode is used, `false` otherwise.
         */
        isLittleEndian() {
          return this.littleEndian;
        }
        /**
         * Set little-endian mode for reading and writing multi-byte values.
         * @returns This.
         */
        setLittleEndian() {
          this.littleEndian = true;
          return this;
        }
        /**
         * Check if big-endian mode is used for reading and writing multi-byte values.
         * @returns `true` if big-endian mode is used, `false` otherwise.
         */
        isBigEndian() {
          return !this.littleEndian;
        }
        /**
         * Switches to big-endian mode for reading and writing multi-byte values.
         * @returns This.
         */
        setBigEndian() {
          this.littleEndian = false;
          return this;
        }
        /**
         * Move the pointer n bytes forward.
         * @param n - Number of bytes to skip.
         * @returns This.
         */
        skip(n = 1) {
          this.offset += n;
          return this;
        }
        /**
         * Move the pointer n bytes backward.
         * @param n - Number of bytes to move back.
         * @returns This.
         */
        back(n = 1) {
          this.offset -= n;
          return this;
        }
        /**
         * Move the pointer to the given offset.
         * @param offset - The offset to move to.
         * @returns This.
         */
        seek(offset) {
          this.offset = offset;
          return this;
        }
        /**
         * Store the current pointer offset.
         * @see {@link IOBuffer#reset}
         * @returns This.
         */
        mark() {
          this._mark = this.offset;
          return this;
        }
        /**
         * Move the pointer back to the last pointer offset set by mark.
         * @see {@link IOBuffer#mark}
         * @returns This.
         */
        reset() {
          this.offset = this._mark;
          return this;
        }
        /**
         * Push the current pointer offset to the mark stack.
         * @see {@link IOBuffer#popMark}
         * @returns This.
         */
        pushMark() {
          this._marks.push(this.offset);
          return this;
        }
        /**
         * Pop the last pointer offset from the mark stack, and set the current
         * pointer offset to the popped value.
         * @see {@link IOBuffer#pushMark}
         * @returns This.
         */
        popMark() {
          const offset = this._marks.pop();
          if (offset === void 0) {
            throw new Error("Mark stack empty");
          }
          this.seek(offset);
          return this;
        }
        /**
         * Move the pointer offset back to 0.
         * @returns This.
         */
        rewind() {
          this.offset = 0;
          return this;
        }
        /**
         * Make sure the buffer has sufficient memory to write a given byteLength at
         * the current pointer offset.
         * If the buffer's memory is insufficient, this method will create a new
         * buffer (a copy) with a length that is twice (byteLength + current offset).
         * @param byteLength - The needed memory in bytes.
         * @returns This.
         */
        ensureAvailable(byteLength = 1) {
          if (!this.available(byteLength)) {
            const lengthNeeded = this.offset + byteLength;
            const newLength = lengthNeeded * 2;
            const newArray = new Uint8Array(newLength);
            newArray.set(new Uint8Array(this.buffer));
            this.buffer = newArray.buffer;
            this.length = newLength;
            this.byteLength = newLength;
            this._data = new DataView(this.buffer);
          }
          return this;
        }
        /**
         * Read a byte and return false if the byte's value is 0, or true otherwise.
         * Moves pointer forward by one byte.
         * @returns The read boolean.
         */
        readBoolean() {
          return this.readUint8() !== 0;
        }
        /**
         * Read a signed 8-bit integer and move pointer forward by 1 byte.
         * @returns The read byte.
         */
        readInt8() {
          return this._data.getInt8(this.offset++);
        }
        /**
         * Read an unsigned 8-bit integer and move pointer forward by 1 byte.
         * @returns The read byte.
         */
        readUint8() {
          return this._data.getUint8(this.offset++);
        }
        /**
         * Alias for {@link IOBuffer#readUint8}.
         * @returns The read byte.
         */
        readByte() {
          return this.readUint8();
        }
        /**
         * Read `n` bytes and move pointer forward by `n` bytes.
         * @param n - Number of bytes to read.
         * @returns The read bytes.
         */
        readBytes(n = 1) {
          return this.readArray(n, "uint8");
        }
        /**
         * Creates an array of corresponding to the type `type` and size `size`.
         * For example, type `uint8` will create a `Uint8Array`.
         * @param size - size of the resulting array
         * @param type - number type of elements to read
         * @returns The read array.
         */
        readArray(size, type) {
          const bytes = typedArrays[type].BYTES_PER_ELEMENT * size;
          const offset = this.byteOffset + this.offset;
          const slice = this.buffer.slice(offset, offset + bytes);
          if (this.littleEndian === hostBigEndian && type !== "uint8" && type !== "int8") {
            const slice2 = new Uint8Array(this.buffer.slice(offset, offset + bytes));
            slice2.reverse();
            const returnArray2 = new typedArrays[type](slice2.buffer);
            this.offset += bytes;
            returnArray2.reverse();
            return returnArray2;
          }
          const returnArray = new typedArrays[type](slice);
          this.offset += bytes;
          return returnArray;
        }
        /**
         * Read a 16-bit signed integer and move pointer forward by 2 bytes.
         * @returns The read value.
         */
        readInt16() {
          const value = this._data.getInt16(this.offset, this.littleEndian);
          this.offset += 2;
          return value;
        }
        /**
         * Read a 16-bit unsigned integer and move pointer forward by 2 bytes.
         * @returns The read value.
         */
        readUint16() {
          const value = this._data.getUint16(this.offset, this.littleEndian);
          this.offset += 2;
          return value;
        }
        /**
         * Read a 32-bit signed integer and move pointer forward by 4 bytes.
         * @returns The read value.
         */
        readInt32() {
          const value = this._data.getInt32(this.offset, this.littleEndian);
          this.offset += 4;
          return value;
        }
        /**
         * Read a 32-bit unsigned integer and move pointer forward by 4 bytes.
         * @returns The read value.
         */
        readUint32() {
          const value = this._data.getUint32(this.offset, this.littleEndian);
          this.offset += 4;
          return value;
        }
        /**
         * Read a 32-bit floating number and move pointer forward by 4 bytes.
         * @returns The read value.
         */
        readFloat32() {
          const value = this._data.getFloat32(this.offset, this.littleEndian);
          this.offset += 4;
          return value;
        }
        /**
         * Read a 64-bit floating number and move pointer forward by 8 bytes.
         * @returns The read value.
         */
        readFloat64() {
          const value = this._data.getFloat64(this.offset, this.littleEndian);
          this.offset += 8;
          return value;
        }
        /**
         * Read a 64-bit signed integer number and move pointer forward by 8 bytes.
         * @returns The read value.
         */
        readBigInt64() {
          const value = this._data.getBigInt64(this.offset, this.littleEndian);
          this.offset += 8;
          return value;
        }
        /**
         * Read a 64-bit unsigned integer number and move pointer forward by 8 bytes.
         * @returns The read value.
         */
        readBigUint64() {
          const value = this._data.getBigUint64(this.offset, this.littleEndian);
          this.offset += 8;
          return value;
        }
        /**
         * Read a 1-byte ASCII character and move pointer forward by 1 byte.
         * @returns The read character.
         */
        readChar() {
          return String.fromCharCode(this.readInt8());
        }
        /**
         * Read `n` 1-byte ASCII characters and move pointer forward by `n` bytes.
         * @param n - Number of characters to read.
         * @returns The read characters.
         */
        readChars(n = 1) {
          let result = "";
          for (let i2 = 0; i2 < n; i2++) {
            result += this.readChar();
          }
          return result;
        }
        /**
         * Read the next `n` bytes, return a UTF-8 decoded string and move pointer
         * forward by `n` bytes.
         * @param n - Number of bytes to read.
         * @returns The decoded string.
         */
        readUtf8(n = 1) {
          return decode(this.readBytes(n));
        }
        /**
         * Read the next `n` bytes, return a string decoded with `encoding` and move pointer
         * forward by `n` bytes.
         * If no encoding is passed, the function is equivalent to @see {@link IOBuffer#readUtf8}
         * @param n - Number of bytes to read.
         * @param encoding - The encoding to use. Default is 'utf8'.
         * @returns The decoded string.
         */
        decodeText(n = 1, encoding = "utf8") {
          return decode(this.readBytes(n), encoding);
        }
        /**
         * Write 0xff if the passed value is truthy, 0x00 otherwise and move pointer
         * forward by 1 byte.
         * @param value - The value to write.
         * @returns This.
         */
        writeBoolean(value) {
          this.writeUint8(value ? 255 : 0);
          return this;
        }
        /**
         * Write `value` as an 8-bit signed integer and move pointer forward by 1 byte.
         * @param value - The value to write.
         * @returns This.
         */
        writeInt8(value) {
          this.ensureAvailable(1);
          this._data.setInt8(this.offset++, value);
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write `value` as an 8-bit unsigned integer and move pointer forward by 1
         * byte.
         * @param value - The value to write.
         * @returns This.
         */
        writeUint8(value) {
          this.ensureAvailable(1);
          this._data.setUint8(this.offset++, value);
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * An alias for {@link IOBuffer#writeUint8}.
         * @param value - The value to write.
         * @returns This.
         */
        writeByte(value) {
          return this.writeUint8(value);
        }
        /**
         * Write all elements of `bytes` as uint8 values and move pointer forward by
         * `bytes.length` bytes.
         * @param bytes - The array of bytes to write.
         * @returns This.
         */
        writeBytes(bytes) {
          this.ensureAvailable(bytes.length);
          for (let i2 = 0; i2 < bytes.length; i2++) {
            this._data.setUint8(this.offset++, bytes[i2]);
          }
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write `value` as a 16-bit signed integer and move pointer forward by 2
         * bytes.
         * @param value - The value to write.
         * @returns This.
         */
        writeInt16(value) {
          this.ensureAvailable(2);
          this._data.setInt16(this.offset, value, this.littleEndian);
          this.offset += 2;
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write `value` as a 16-bit unsigned integer and move pointer forward by 2
         * bytes.
         * @param value - The value to write.
         * @returns This.
         */
        writeUint16(value) {
          this.ensureAvailable(2);
          this._data.setUint16(this.offset, value, this.littleEndian);
          this.offset += 2;
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write `value` as a 32-bit signed integer and move pointer forward by 4
         * bytes.
         * @param value - The value to write.
         * @returns This.
         */
        writeInt32(value) {
          this.ensureAvailable(4);
          this._data.setInt32(this.offset, value, this.littleEndian);
          this.offset += 4;
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write `value` as a 32-bit unsigned integer and move pointer forward by 4
         * bytes.
         * @param value - The value to write.
         * @returns This.
         */
        writeUint32(value) {
          this.ensureAvailable(4);
          this._data.setUint32(this.offset, value, this.littleEndian);
          this.offset += 4;
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write `value` as a 32-bit floating number and move pointer forward by 4
         * bytes.
         * @param value - The value to write.
         * @returns This.
         */
        writeFloat32(value) {
          this.ensureAvailable(4);
          this._data.setFloat32(this.offset, value, this.littleEndian);
          this.offset += 4;
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write `value` as a 64-bit floating number and move pointer forward by 8
         * bytes.
         * @param value - The value to write.
         * @returns This.
         */
        writeFloat64(value) {
          this.ensureAvailable(8);
          this._data.setFloat64(this.offset, value, this.littleEndian);
          this.offset += 8;
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write `value` as a 64-bit signed bigint and move pointer forward by 8
         * bytes.
         * @param value - The value to write.
         * @returns This.
         */
        writeBigInt64(value) {
          this.ensureAvailable(8);
          this._data.setBigInt64(this.offset, value, this.littleEndian);
          this.offset += 8;
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write `value` as a 64-bit unsigned bigint and move pointer forward by 8
         * bytes.
         * @param value - The value to write.
         * @returns This.
         */
        writeBigUint64(value) {
          this.ensureAvailable(8);
          this._data.setBigUint64(this.offset, value, this.littleEndian);
          this.offset += 8;
          this._updateLastWrittenByte();
          return this;
        }
        /**
         * Write the charCode of `str`'s first character as an 8-bit unsigned integer
         * and move pointer forward by 1 byte.
         * @param str - The character to write.
         * @returns This.
         */
        writeChar(str) {
          return this.writeUint8(str.charCodeAt(0));
        }
        /**
         * Write the charCodes of all `str`'s characters as 8-bit unsigned integers
         * and move pointer forward by `str.length` bytes.
         * @param str - The characters to write.
         * @returns This.
         */
        writeChars(str) {
          for (let i2 = 0; i2 < str.length; i2++) {
            this.writeUint8(str.charCodeAt(i2));
          }
          return this;
        }
        /**
         * UTF-8 encode and write `str` to the current pointer offset and move pointer
         * forward according to the encoded length.
         * @param str - The string to write.
         * @returns This.
         */
        writeUtf8(str) {
          return this.writeBytes(encode(str));
        }
        /**
         * Export a Uint8Array view of the internal buffer.
         * The view starts at the byte offset and its length
         * is calculated to stop at the last written byte or the original length.
         * @returns A new Uint8Array view.
         */
        toArray() {
          return new Uint8Array(this.buffer, this.byteOffset, this.lastWrittenByte);
        }
        /**
         *  Get the total number of bytes written so far, regardless of the current offset.
         * @returns - Total number of bytes.
         */
        getWrittenByteLength() {
          return this.lastWrittenByte - this.byteOffset;
        }
        /**
         * Update the last written byte offset
         * @private
         */
        _updateLastWrittenByte() {
          if (this.offset > this.lastWrittenByte) {
            this.lastWrittenByte = this.offset;
          }
        }
      };
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/helpers/crc.js
  function updateCrc(currentCrc, data, length) {
    let c = currentCrc;
    for (let n = 0; n < length; n++) {
      c = crcTable[(c ^ data[n]) & 255] ^ c >>> 8;
    }
    return c;
  }
  function crc(data, length) {
    return (updateCrc(initialCrc, data, length) ^ initialCrc) >>> 0;
  }
  function checkCrc(buffer, crcLength, chunkName) {
    const expectedCrc = buffer.readUint32();
    const actualCrc = crc(new Uint8Array(buffer.buffer, buffer.byteOffset + buffer.offset - crcLength - 4, crcLength), crcLength);
    if (actualCrc !== expectedCrc) {
      throw new Error(`CRC mismatch for chunk ${chunkName}. Expected ${expectedCrc}, found ${actualCrc}`);
    }
  }
  function writeCrc(buffer, length) {
    buffer.writeUint32(crc(new Uint8Array(buffer.buffer, buffer.byteOffset + buffer.offset - length, length), length));
  }
  var crcTable, initialCrc;
  var init_crc = __esm({
    "../picotool-js/node_modules/fast-png/lib/helpers/crc.js"() {
      crcTable = [];
      for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
          if (c & 1) {
            c = 3988292384 ^ c >>> 1;
          } else {
            c = c >>> 1;
          }
        }
        crcTable[n] = c;
      }
      initialCrc = 4294967295;
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/helpers/unfilter.js
  function unfilterNone(currentLine, newLine, bytesPerLine) {
    for (let i2 = 0; i2 < bytesPerLine; i2++) {
      newLine[i2] = currentLine[i2];
    }
  }
  function unfilterSub(currentLine, newLine, bytesPerLine, bytesPerPixel) {
    let i2 = 0;
    for (; i2 < bytesPerPixel; i2++) {
      newLine[i2] = currentLine[i2];
    }
    for (; i2 < bytesPerLine; i2++) {
      newLine[i2] = currentLine[i2] + newLine[i2 - bytesPerPixel] & 255;
    }
  }
  function unfilterUp(currentLine, newLine, prevLine, bytesPerLine) {
    let i2 = 0;
    if (prevLine.length === 0) {
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2];
      }
    } else {
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + prevLine[i2] & 255;
      }
    }
  }
  function unfilterAverage(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel) {
    let i2 = 0;
    if (prevLine.length === 0) {
      for (; i2 < bytesPerPixel; i2++) {
        newLine[i2] = currentLine[i2];
      }
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + (newLine[i2 - bytesPerPixel] >> 1) & 255;
      }
    } else {
      for (; i2 < bytesPerPixel; i2++) {
        newLine[i2] = currentLine[i2] + (prevLine[i2] >> 1) & 255;
      }
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + (newLine[i2 - bytesPerPixel] + prevLine[i2] >> 1) & 255;
      }
    }
  }
  function unfilterPaeth(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel) {
    let i2 = 0;
    if (prevLine.length === 0) {
      for (; i2 < bytesPerPixel; i2++) {
        newLine[i2] = currentLine[i2];
      }
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + newLine[i2 - bytesPerPixel] & 255;
      }
    } else {
      for (; i2 < bytesPerPixel; i2++) {
        newLine[i2] = currentLine[i2] + prevLine[i2] & 255;
      }
      for (; i2 < bytesPerLine; i2++) {
        newLine[i2] = currentLine[i2] + paethPredictor(newLine[i2 - bytesPerPixel], prevLine[i2], prevLine[i2 - bytesPerPixel]) & 255;
      }
    }
  }
  function paethPredictor(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc)
      return a;
    else if (pb <= pc)
      return b;
    else
      return c;
  }
  var init_unfilter = __esm({
    "../picotool-js/node_modules/fast-png/lib/helpers/unfilter.js"() {
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/helpers/apply_unfilter.js
  function applyUnfilter(filterType, currentLine, newLine, prevLine, passLineBytes, bytesPerPixel) {
    switch (filterType) {
      case 0:
        unfilterNone(currentLine, newLine, passLineBytes);
        break;
      case 1:
        unfilterSub(currentLine, newLine, passLineBytes, bytesPerPixel);
        break;
      case 2:
        unfilterUp(currentLine, newLine, prevLine, passLineBytes);
        break;
      case 3:
        unfilterAverage(currentLine, newLine, prevLine, passLineBytes, bytesPerPixel);
        break;
      case 4:
        unfilterPaeth(currentLine, newLine, prevLine, passLineBytes, bytesPerPixel);
        break;
      default:
        throw new Error(`Unsupported filter: ${filterType}`);
    }
  }
  var init_apply_unfilter = __esm({
    "../picotool-js/node_modules/fast-png/lib/helpers/apply_unfilter.js"() {
      init_unfilter();
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/helpers/decode_interlace_adam7.js
  function decodeInterlaceAdam7(params) {
    const { data, width, height, channels, depth } = params;
    const passes = [
      { x: 0, y: 0, xStep: 8, yStep: 8 },
      // Pass 1
      { x: 4, y: 0, xStep: 8, yStep: 8 },
      // Pass 2
      { x: 0, y: 4, xStep: 4, yStep: 8 },
      // Pass 3
      { x: 2, y: 0, xStep: 4, yStep: 4 },
      // Pass 4
      { x: 0, y: 2, xStep: 2, yStep: 4 },
      // Pass 5
      { x: 1, y: 0, xStep: 2, yStep: 2 },
      // Pass 6
      { x: 0, y: 1, xStep: 1, yStep: 2 }
      // Pass 7
    ];
    const bytesPerPixel = Math.ceil(depth / 8) * channels;
    const resultData = new Uint8Array(height * width * bytesPerPixel);
    let offset = 0;
    for (let passIndex = 0; passIndex < 7; passIndex++) {
      const pass = passes[passIndex];
      const passWidth = Math.ceil((width - pass.x) / pass.xStep);
      const passHeight = Math.ceil((height - pass.y) / pass.yStep);
      if (passWidth <= 0 || passHeight <= 0)
        continue;
      const passLineBytes = passWidth * bytesPerPixel;
      const prevLine = new Uint8Array(passLineBytes);
      for (let y = 0; y < passHeight; y++) {
        const filterType = data[offset++];
        const currentLine = data.subarray(offset, offset + passLineBytes);
        offset += passLineBytes;
        const newLine = new Uint8Array(passLineBytes);
        applyUnfilter(filterType, currentLine, newLine, prevLine, passLineBytes, bytesPerPixel);
        prevLine.set(newLine);
        for (let x2 = 0; x2 < passWidth; x2++) {
          const outputX = pass.x + x2 * pass.xStep;
          const outputY = pass.y + y * pass.yStep;
          if (outputX >= width || outputY >= height)
            continue;
          for (let i2 = 0; i2 < bytesPerPixel; i2++) {
            resultData[(outputY * width + outputX) * bytesPerPixel + i2] = newLine[x2 * bytesPerPixel + i2];
          }
        }
      }
    }
    if (depth === 16) {
      const uint16Data = new Uint16Array(resultData.buffer);
      if (osIsLittleEndian) {
        for (let k = 0; k < uint16Data.length; k++) {
          uint16Data[k] = swap16(uint16Data[k]);
        }
      }
      return uint16Data;
    } else {
      return resultData;
    }
  }
  function swap16(val) {
    return (val & 255) << 8 | val >> 8 & 255;
  }
  var uint16, uint8, osIsLittleEndian;
  var init_decode_interlace_adam7 = __esm({
    "../picotool-js/node_modules/fast-png/lib/helpers/decode_interlace_adam7.js"() {
      init_apply_unfilter();
      uint16 = new Uint16Array([255]);
      uint8 = new Uint8Array(uint16.buffer);
      osIsLittleEndian = uint8[0] === 255;
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/helpers/decode_interlace_null.js
  function decodeInterlaceNull(params) {
    const { data, width, height, channels, depth } = params;
    const bytesPerPixel = Math.ceil(depth / 8) * channels;
    const bytesPerLine = Math.ceil(depth / 8 * channels * width);
    const newData = new Uint8Array(height * bytesPerLine);
    let prevLine = empty;
    let offset = 0;
    let currentLine;
    let newLine;
    for (let i2 = 0; i2 < height; i2++) {
      currentLine = data.subarray(offset + 1, offset + 1 + bytesPerLine);
      newLine = newData.subarray(i2 * bytesPerLine, (i2 + 1) * bytesPerLine);
      switch (data[offset]) {
        case 0:
          unfilterNone(currentLine, newLine, bytesPerLine);
          break;
        case 1:
          unfilterSub(currentLine, newLine, bytesPerLine, bytesPerPixel);
          break;
        case 2:
          unfilterUp(currentLine, newLine, prevLine, bytesPerLine);
          break;
        case 3:
          unfilterAverage(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel);
          break;
        case 4:
          unfilterPaeth(currentLine, newLine, prevLine, bytesPerLine, bytesPerPixel);
          break;
        default:
          throw new Error(`Unsupported filter: ${data[offset]}`);
      }
      prevLine = newLine;
      offset += bytesPerLine + 1;
    }
    if (depth === 16) {
      const uint16Data = new Uint16Array(newData.buffer);
      if (osIsLittleEndian2) {
        for (let k = 0; k < uint16Data.length; k++) {
          uint16Data[k] = swap162(uint16Data[k]);
        }
      }
      return uint16Data;
    } else {
      return newData;
    }
  }
  function swap162(val) {
    return (val & 255) << 8 | val >> 8 & 255;
  }
  var uint162, uint82, osIsLittleEndian2, empty;
  var init_decode_interlace_null = __esm({
    "../picotool-js/node_modules/fast-png/lib/helpers/decode_interlace_null.js"() {
      init_unfilter();
      uint162 = new Uint16Array([255]);
      uint82 = new Uint8Array(uint162.buffer);
      osIsLittleEndian2 = uint82[0] === 255;
      empty = new Uint8Array(0);
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/helpers/signature.js
  function writeSignature(buffer) {
    buffer.writeBytes(pngSignature);
  }
  function checkSignature(buffer) {
    if (!hasPngSignature(buffer.readBytes(pngSignature.length))) {
      throw new Error("wrong PNG signature");
    }
  }
  function hasPngSignature(array) {
    if (array.length < pngSignature.length) {
      return false;
    }
    for (let i2 = 0; i2 < pngSignature.length; i2++) {
      if (array[i2] !== pngSignature[i2]) {
        return false;
      }
    }
    return true;
  }
  var pngSignature;
  var init_signature = __esm({
    "../picotool-js/node_modules/fast-png/lib/helpers/signature.js"() {
      pngSignature = Uint8Array.of(137, 80, 78, 71, 13, 10, 26, 10);
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/helpers/text.js
  function validateKeyword(keyword) {
    validateLatin1(keyword);
    if (keyword.length === 0 || keyword.length > 79) {
      throw new Error("keyword length must be between 1 and 79");
    }
  }
  function validateLatin1(text) {
    if (!latin1Regex.test(text)) {
      throw new Error("invalid latin1 text");
    }
  }
  function decodetEXt(text, buffer, length) {
    const keyword = readKeyword(buffer);
    text[keyword] = readLatin1(buffer, length - keyword.length - 1);
  }
  function encodetEXt(buffer, keyword, text) {
    validateKeyword(keyword);
    validateLatin1(text);
    const length = keyword.length + 1 + text.length;
    buffer.writeUint32(length);
    buffer.writeChars(textChunkName);
    buffer.writeChars(keyword);
    buffer.writeByte(NULL);
    buffer.writeChars(text);
    writeCrc(buffer, length + 4);
  }
  function readKeyword(buffer) {
    buffer.mark();
    while (buffer.readByte() !== NULL) {
    }
    const end = buffer.offset;
    buffer.reset();
    const keyword = latin1Decoder.decode(buffer.readBytes(end - buffer.offset - 1));
    buffer.skip(1);
    validateKeyword(keyword);
    return keyword;
  }
  function readLatin1(buffer, length) {
    return latin1Decoder.decode(buffer.readBytes(length));
  }
  var textChunkName, NULL, latin1Decoder, latin1Regex;
  var init_text2 = __esm({
    "../picotool-js/node_modules/fast-png/lib/helpers/text.js"() {
      init_crc();
      textChunkName = "tEXt";
      NULL = 0;
      latin1Decoder = new TextDecoder("latin1");
      latin1Regex = /^[\u0000-\u00FF]*$/;
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/internal_types.js
  var ColorType, CompressionMethod, FilterMethod, InterlaceMethod, DisposeOpType, BlendOpType;
  var init_internal_types = __esm({
    "../picotool-js/node_modules/fast-png/lib/internal_types.js"() {
      ColorType = {
        UNKNOWN: -1,
        GREYSCALE: 0,
        TRUECOLOUR: 2,
        INDEXED_COLOUR: 3,
        GREYSCALE_ALPHA: 4,
        TRUECOLOUR_ALPHA: 6
      };
      CompressionMethod = {
        UNKNOWN: -1,
        DEFLATE: 0
      };
      FilterMethod = {
        UNKNOWN: -1,
        ADAPTIVE: 0
      };
      InterlaceMethod = {
        UNKNOWN: -1,
        NO_INTERLACE: 0,
        ADAM7: 1
      };
      DisposeOpType = {
        NONE: 0,
        BACKGROUND: 1,
        PREVIOUS: 2
      };
      BlendOpType = {
        SOURCE: 0,
        OVER: 1
      };
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/png_decoder.js
  function checkBitDepth(value) {
    if (value !== 1 && value !== 2 && value !== 4 && value !== 8 && value !== 16) {
      throw new Error(`invalid bit depth: ${value}`);
    }
    return value;
  }
  var PngDecoder;
  var init_png_decoder = __esm({
    "../picotool-js/node_modules/fast-png/lib/png_decoder.js"() {
      init_browser();
      init_iobuffer();
      init_crc();
      init_decode_interlace_adam7();
      init_decode_interlace_null();
      init_signature();
      init_text2();
      init_internal_types();
      PngDecoder = class extends IOBuffer {
        _checkCrc;
        _inflator;
        _png;
        _apng;
        _end;
        _hasPalette;
        _palette;
        _hasTransparency;
        _transparency;
        _compressionMethod;
        _filterMethod;
        _interlaceMethod;
        _colorType;
        _isAnimated;
        _numberOfFrames;
        _numberOfPlays;
        _frames;
        _writingDataChunks;
        _chunks;
        _inflatorResult;
        constructor(data, options = {}) {
          super(data);
          const { checkCrc: checkCrc2 = false } = options;
          this._checkCrc = checkCrc2;
          this._inflator = new Unzlib((chunk, final) => {
            this._chunks.push(chunk);
            if (final) {
              const totalLength = this._chunks.reduce((sum, c) => sum + c.length, 0);
              this._inflatorResult = new Uint8Array(totalLength);
              let offset = 0;
              for (const chunk2 of this._chunks) {
                this._inflatorResult.set(chunk2, offset);
                offset += chunk2.length;
              }
              this._chunks = [];
            }
          });
          this._chunks = [];
          this._png = {
            width: -1,
            height: -1,
            channels: -1,
            data: new Uint8Array(0),
            depth: 1,
            text: {}
          };
          this._apng = {
            width: -1,
            height: -1,
            channels: -1,
            depth: 1,
            numberOfFrames: 1,
            numberOfPlays: 0,
            text: {},
            frames: []
          };
          this._end = false;
          this._hasPalette = false;
          this._palette = [];
          this._hasTransparency = false;
          this._transparency = new Uint16Array(0);
          this._compressionMethod = CompressionMethod.UNKNOWN;
          this._filterMethod = FilterMethod.UNKNOWN;
          this._interlaceMethod = InterlaceMethod.UNKNOWN;
          this._colorType = ColorType.UNKNOWN;
          this._isAnimated = false;
          this._numberOfFrames = 1;
          this._numberOfPlays = 0;
          this._frames = [];
          this._writingDataChunks = false;
          this._inflatorResult = new Uint8Array(0);
          this.setBigEndian();
        }
        decode() {
          checkSignature(this);
          while (!this._end) {
            const length = this.readUint32();
            const type = this.readChars(4);
            this.decodeChunk(length, type);
          }
          this._inflator.push(new Uint8Array(0), true);
          this.decodeImage();
          return this._png;
        }
        decodeApng() {
          checkSignature(this);
          while (!this._end) {
            const length = this.readUint32();
            const type = this.readChars(4);
            this.decodeApngChunk(length, type);
          }
          this.decodeApngImage();
          return this._apng;
        }
        // https://www.w3.org/TR/PNG/#5Chunk-layout
        decodeChunk(length, type) {
          const offset = this.offset;
          switch (type) {
            // 11.2 Critical chunks
            case "IHDR":
              this.decodeIHDR();
              break;
            case "PLTE":
              this.decodePLTE(length);
              break;
            case "IDAT":
              this.decodeIDAT(length);
              break;
            case "IEND":
              this._end = true;
              break;
            // 11.3 Ancillary chunks
            case "tRNS":
              this.decodetRNS(length);
              break;
            case "iCCP":
              this.decodeiCCP(length);
              break;
            case textChunkName:
              decodetEXt(this._png.text, this, length);
              break;
            case "pHYs":
              this.decodepHYs();
              break;
            default:
              this.skip(length);
              break;
          }
          if (this.offset - offset !== length) {
            throw new Error(`Length mismatch while decoding chunk ${type}`);
          }
          if (this._checkCrc) {
            checkCrc(this, length + 4, type);
          } else {
            this.skip(4);
          }
        }
        decodeApngChunk(length, type) {
          const offset = this.offset;
          if (type !== "fdAT" && type !== "IDAT" && this._writingDataChunks) {
            this.pushDataToFrame();
          }
          switch (type) {
            case "acTL":
              this.decodeACTL();
              break;
            case "fcTL":
              this.decodeFCTL();
              break;
            case "fdAT":
              this.decodeFDAT(length);
              break;
            default:
              this.decodeChunk(length, type);
              this.offset = offset + length;
              break;
          }
          if (this.offset - offset !== length) {
            throw new Error(`Length mismatch while decoding chunk ${type}`);
          }
          if (this._checkCrc) {
            checkCrc(this, length + 4, type);
          } else {
            this.skip(4);
          }
        }
        // https://www.w3.org/TR/PNG/#11IHDR
        decodeIHDR() {
          const image = this._png;
          image.width = this.readUint32();
          image.height = this.readUint32();
          image.depth = checkBitDepth(this.readUint8());
          const colorType = this.readUint8();
          this._colorType = colorType;
          let channels;
          switch (colorType) {
            case ColorType.GREYSCALE:
              channels = 1;
              break;
            case ColorType.TRUECOLOUR:
              channels = 3;
              break;
            case ColorType.INDEXED_COLOUR:
              channels = 1;
              break;
            case ColorType.GREYSCALE_ALPHA:
              channels = 2;
              break;
            case ColorType.TRUECOLOUR_ALPHA:
              channels = 4;
              break;
            // Kept for exhaustiveness.
            // eslint-disable-next-line unicorn/no-useless-switch-case
            case ColorType.UNKNOWN:
            default:
              throw new Error(`Unknown color type: ${colorType}`);
          }
          this._png.channels = channels;
          this._compressionMethod = this.readUint8();
          if (this._compressionMethod !== CompressionMethod.DEFLATE) {
            throw new Error(`Unsupported compression method: ${this._compressionMethod}`);
          }
          this._filterMethod = this.readUint8();
          this._interlaceMethod = this.readUint8();
        }
        decodeACTL() {
          this._numberOfFrames = this.readUint32();
          this._numberOfPlays = this.readUint32();
          this._isAnimated = true;
        }
        decodeFCTL() {
          const image = {
            sequenceNumber: this.readUint32(),
            width: this.readUint32(),
            height: this.readUint32(),
            xOffset: this.readUint32(),
            yOffset: this.readUint32(),
            delayNumber: this.readUint16(),
            delayDenominator: this.readUint16(),
            disposeOp: this.readUint8(),
            blendOp: this.readUint8(),
            data: new Uint8Array(0)
          };
          this._frames.push(image);
        }
        // https://www.w3.org/TR/PNG/#11PLTE
        decodePLTE(length) {
          if (length % 3 !== 0) {
            throw new RangeError(`PLTE field length must be a multiple of 3. Got ${length}`);
          }
          const l = length / 3;
          this._hasPalette = true;
          const palette = [];
          this._palette = palette;
          for (let i2 = 0; i2 < l; i2++) {
            palette.push([this.readUint8(), this.readUint8(), this.readUint8()]);
          }
        }
        // https://www.w3.org/TR/PNG/#11IDAT
        decodeIDAT(length) {
          this._writingDataChunks = true;
          const dataLength = length;
          const dataOffset = this.offset + this.byteOffset;
          try {
            this._inflator.push(new Uint8Array(this.buffer, dataOffset, dataLength), false);
          } catch (error) {
            throw new Error("Error while decompressing the data:", { cause: error });
          }
          this.skip(length);
        }
        decodeFDAT(length) {
          this._writingDataChunks = true;
          let dataLength = length;
          let dataOffset = this.offset + this.byteOffset;
          dataOffset += 4;
          dataLength -= 4;
          try {
            this._inflator.push(new Uint8Array(this.buffer, dataOffset, dataLength), false);
          } catch (error) {
            throw new Error("Error while decompressing the data:", { cause: error });
          }
          this.skip(length);
        }
        // https://www.w3.org/TR/PNG/#11tRNS
        decodetRNS(length) {
          switch (this._colorType) {
            case ColorType.GREYSCALE:
            case ColorType.TRUECOLOUR: {
              if (length % 2 !== 0) {
                throw new RangeError(`tRNS chunk length must be a multiple of 2. Got ${length}`);
              }
              if (length / 2 > this._png.width * this._png.height) {
                throw new Error(`tRNS chunk contains more alpha values than there are pixels (${length / 2} vs ${this._png.width * this._png.height})`);
              }
              this._hasTransparency = true;
              this._transparency = new Uint16Array(length / 2);
              for (let i2 = 0; i2 < length / 2; i2++) {
                this._transparency[i2] = this.readUint16();
              }
              break;
            }
            case ColorType.INDEXED_COLOUR: {
              if (length > this._palette.length) {
                throw new Error(`tRNS chunk contains more alpha values than there are palette colors (${length} vs ${this._palette.length})`);
              }
              let i2 = 0;
              for (; i2 < length; i2++) {
                const alpha = this.readByte();
                this._palette[i2].push(alpha);
              }
              for (; i2 < this._palette.length; i2++) {
                this._palette[i2].push(255);
              }
              break;
            }
            // Kept for exhaustiveness.
            /* eslint-disable unicorn/no-useless-switch-case */
            case ColorType.UNKNOWN:
            case ColorType.GREYSCALE_ALPHA:
            case ColorType.TRUECOLOUR_ALPHA:
            default: {
              throw new Error(`tRNS chunk is not supported for color type ${this._colorType}`);
            }
          }
        }
        // https://www.w3.org/TR/PNG/#11iCCP
        decodeiCCP(length) {
          const name = readKeyword(this);
          const compressionMethod = this.readUint8();
          if (compressionMethod !== CompressionMethod.DEFLATE) {
            throw new Error(`Unsupported iCCP compression method: ${compressionMethod}`);
          }
          const compressedProfile = this.readBytes(length - name.length - 2);
          this._png.iccEmbeddedProfile = {
            name,
            profile: unzlibSync(compressedProfile)
          };
        }
        // https://www.w3.org/TR/PNG/#11pHYs
        decodepHYs() {
          const ppuX = this.readUint32();
          const ppuY = this.readUint32();
          const unitSpecifier = this.readByte();
          this._png.resolution = {
            x: ppuX,
            y: ppuY,
            unit: unitSpecifier
          };
        }
        decodeApngImage() {
          this._apng.width = this._png.width;
          this._apng.height = this._png.height;
          this._apng.channels = this._png.channels;
          this._apng.depth = this._png.depth;
          this._apng.numberOfFrames = this._numberOfFrames;
          this._apng.numberOfPlays = this._numberOfPlays;
          this._apng.text = this._png.text;
          this._apng.resolution = this._png.resolution;
          for (let i2 = 0; i2 < this._numberOfFrames; i2++) {
            const newFrame = {
              sequenceNumber: this._frames[i2].sequenceNumber,
              delayNumber: this._frames[i2].delayNumber,
              delayDenominator: this._frames[i2].delayDenominator,
              data: this._apng.depth === 8 ? new Uint8Array(this._apng.width * this._apng.height * this._apng.channels) : new Uint16Array(this._apng.width * this._apng.height * this._apng.channels)
            };
            const frame = this._frames.at(i2);
            if (frame) {
              frame.data = decodeInterlaceNull({
                data: frame.data,
                width: frame.width,
                height: frame.height,
                channels: this._apng.channels,
                depth: this._apng.depth
              });
              if (this._hasPalette) {
                this._apng.palette = this._palette;
              }
              if (this._hasTransparency) {
                this._apng.transparency = this._transparency;
              }
              if (i2 === 0 || frame.xOffset === 0 && frame.yOffset === 0 && frame.width === this._png.width && frame.height === this._png.height) {
                newFrame.data = frame.data;
              } else {
                const prevFrame = this._apng.frames.at(i2 - 1);
                this.disposeFrame(frame, prevFrame, newFrame);
                this.addFrameDataToCanvas(newFrame, frame);
              }
              this._apng.frames.push(newFrame);
            }
          }
          return this._apng;
        }
        disposeFrame(frame, prevFrame, imageFrame) {
          switch (frame.disposeOp) {
            case DisposeOpType.NONE:
              break;
            case DisposeOpType.BACKGROUND:
              for (let row = 0; row < this._png.height; row++) {
                for (let col = 0; col < this._png.width; col++) {
                  const index = (row * frame.width + col) * this._png.channels;
                  for (let channel = 0; channel < this._png.channels; channel++) {
                    imageFrame.data[index + channel] = 0;
                  }
                }
              }
              break;
            case DisposeOpType.PREVIOUS:
              imageFrame.data.set(prevFrame.data);
              break;
            default:
              throw new Error("Unknown disposeOp");
          }
        }
        addFrameDataToCanvas(imageFrame, frame) {
          const maxValue = 1 << this._png.depth;
          const calculatePixelIndices = (row, col) => {
            const index = ((row + frame.yOffset) * this._png.width + frame.xOffset + col) * this._png.channels;
            const frameIndex = (row * frame.width + col) * this._png.channels;
            return { index, frameIndex };
          };
          switch (frame.blendOp) {
            case BlendOpType.SOURCE:
              for (let row = 0; row < frame.height; row++) {
                for (let col = 0; col < frame.width; col++) {
                  const { index, frameIndex } = calculatePixelIndices(row, col);
                  for (let channel = 0; channel < this._png.channels; channel++) {
                    imageFrame.data[index + channel] = frame.data[frameIndex + channel];
                  }
                }
              }
              break;
            // https://www.w3.org/TR/png-3/#13Alpha-channel-processing
            case BlendOpType.OVER:
              for (let row = 0; row < frame.height; row++) {
                for (let col = 0; col < frame.width; col++) {
                  const { index, frameIndex } = calculatePixelIndices(row, col);
                  for (let channel = 0; channel < this._png.channels; channel++) {
                    const sourceAlpha = frame.data[frameIndex + this._png.channels - 1] / maxValue;
                    const foregroundValue = channel % (this._png.channels - 1) === 0 ? 1 : frame.data[frameIndex + channel];
                    const value = Math.floor(sourceAlpha * foregroundValue + (1 - sourceAlpha) * imageFrame.data[index + channel]);
                    imageFrame.data[index + channel] += value;
                  }
                }
              }
              break;
            default:
              throw new Error("Unknown blendOp");
          }
        }
        decodeImage() {
          const data = this._inflatorResult;
          if (this._filterMethod !== FilterMethod.ADAPTIVE) {
            throw new Error(`Filter method ${this._filterMethod} not supported`);
          }
          if (this._interlaceMethod === InterlaceMethod.NO_INTERLACE) {
            this._png.data = decodeInterlaceNull({
              data,
              width: this._png.width,
              height: this._png.height,
              channels: this._png.channels,
              depth: this._png.depth
            });
          } else if (this._interlaceMethod === InterlaceMethod.ADAM7) {
            this._png.data = decodeInterlaceAdam7({
              data,
              width: this._png.width,
              height: this._png.height,
              channels: this._png.channels,
              depth: this._png.depth
            });
          } else {
            throw new Error(`Interlace method ${this._interlaceMethod} not supported`);
          }
          if (this._hasPalette) {
            this._png.palette = this._palette;
          }
          if (this._hasTransparency) {
            this._png.transparency = this._transparency;
          }
        }
        pushDataToFrame() {
          this._inflator.push(new Uint8Array(0), true);
          const result = this._inflatorResult;
          const lastFrame = this._frames.at(-1);
          if (lastFrame) {
            lastFrame.data = result;
          } else {
            this._frames.push({
              sequenceNumber: 0,
              width: this._png.width,
              height: this._png.height,
              xOffset: 0,
              yOffset: 0,
              delayNumber: 0,
              delayDenominator: 0,
              disposeOp: DisposeOpType.NONE,
              blendOp: BlendOpType.SOURCE,
              data: result
            });
          }
          this._inflator = new Unzlib((chunk, final) => {
            this._chunks.push(chunk);
            if (final) {
              const totalLength = this._chunks.reduce((sum, c) => sum + c.length, 0);
              this._inflatorResult = new Uint8Array(totalLength);
              let offset = 0;
              for (const chunk2 of this._chunks) {
                this._inflatorResult.set(chunk2, offset);
                offset += chunk2.length;
              }
              this._chunks = [];
            }
          });
          this._chunks = [];
          this._writingDataChunks = false;
        }
      };
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/png_encoder.js
  function checkInteger(value, name) {
    if (Number.isInteger(value) && value > 0) {
      return value;
    }
    throw new TypeError(`${name} must be a positive integer`);
  }
  function getColorType(data, palette) {
    const { channels = 4, depth = 8 } = data;
    if (channels !== 4 && channels !== 3 && channels !== 2 && channels !== 1) {
      throw new RangeError(`unsupported number of channels: ${channels}`);
    }
    const returnValue = {
      channels,
      depth,
      colorType: ColorType.UNKNOWN
    };
    switch (channels) {
      case 4:
        returnValue.colorType = ColorType.TRUECOLOUR_ALPHA;
        break;
      case 3:
        returnValue.colorType = ColorType.TRUECOLOUR;
        break;
      case 1:
        if (palette) {
          returnValue.colorType = ColorType.INDEXED_COLOUR;
        } else {
          returnValue.colorType = ColorType.GREYSCALE;
        }
        break;
      case 2:
        returnValue.colorType = ColorType.GREYSCALE_ALPHA;
        break;
      default:
        throw new Error("unsupported number of channels");
    }
    return returnValue;
  }
  function writeDataBytes(data, newData, slotsPerLine, offset) {
    for (let j = 0; j < slotsPerLine; j++) {
      newData.writeByte(data[offset++]);
    }
    return offset;
  }
  function writeDataInterlaced(imageData, data, newData, offset) {
    const passes = [
      { x: 0, y: 0, xStep: 8, yStep: 8 },
      { x: 4, y: 0, xStep: 8, yStep: 8 },
      { x: 0, y: 4, xStep: 4, yStep: 8 },
      { x: 2, y: 0, xStep: 4, yStep: 4 },
      { x: 0, y: 2, xStep: 2, yStep: 4 },
      { x: 1, y: 0, xStep: 2, yStep: 2 },
      { x: 0, y: 1, xStep: 1, yStep: 2 }
    ];
    const { width, height, channels, depth } = imageData;
    let pixelSize;
    if (depth === 16) {
      pixelSize = channels * depth / 8 / 2;
    } else {
      pixelSize = channels * depth / 8;
    }
    for (let passIndex = 0; passIndex < 7; passIndex++) {
      const pass = passes[passIndex];
      const passWidth = Math.floor((width - pass.x + pass.xStep - 1) / pass.xStep);
      const passHeight = Math.floor((height - pass.y + pass.yStep - 1) / pass.yStep);
      if (passWidth <= 0 || passHeight <= 0)
        continue;
      const passLineBytes = passWidth * pixelSize;
      for (let y = 0; y < passHeight; y++) {
        const imageY = pass.y + y * pass.yStep;
        const rawScanline = depth <= 8 ? new Uint8Array(passLineBytes) : new Uint16Array(passLineBytes);
        let rawOffset = 0;
        for (let x2 = 0; x2 < passWidth; x2++) {
          const imageX = pass.x + x2 * pass.xStep;
          if (imageX < width && imageY < height) {
            const srcPos = (imageY * width + imageX) * pixelSize;
            for (let i2 = 0; i2 < pixelSize; i2++) {
              rawScanline[rawOffset++] = data[srcPos + i2];
            }
          }
        }
        newData.writeByte(0);
        if (depth === 8) {
          newData.writeBytes(rawScanline);
        } else if (depth === 16) {
          for (const value of rawScanline) {
            newData.writeByte(value >> 8 & 255);
            newData.writeByte(value & 255);
          }
        }
      }
    }
    return offset;
  }
  function writeDataUint16(data, newData, slotsPerLine, offset) {
    for (let j = 0; j < slotsPerLine; j++) {
      newData.writeUint16(data[offset++]);
    }
    return offset;
  }
  var defaultZlibOptions, PngEncoder;
  var init_png_encoder = __esm({
    "../picotool-js/node_modules/fast-png/lib/png_encoder.js"() {
      init_browser();
      init_iobuffer();
      init_crc();
      init_signature();
      init_text2();
      init_internal_types();
      defaultZlibOptions = {
        level: 3
      };
      PngEncoder = class extends IOBuffer {
        _png;
        _zlibOptions;
        _colorType;
        _interlaceMethod;
        constructor(data, options = {}) {
          super();
          this._colorType = ColorType.UNKNOWN;
          this._zlibOptions = { ...defaultZlibOptions, ...options.zlib };
          this._png = this._checkData(data);
          this._interlaceMethod = (options.interlace === "Adam7" ? InterlaceMethod.ADAM7 : InterlaceMethod.NO_INTERLACE) ?? InterlaceMethod.NO_INTERLACE;
          this.setBigEndian();
        }
        encode() {
          writeSignature(this);
          this.encodeIHDR();
          if (this._png.palette) {
            this.encodePLTE();
            if (this._png.palette[0].length === 4) {
              this.encodeTRNS();
            }
          }
          this.encodeData();
          if (this._png.text) {
            for (const [keyword, text] of Object.entries(this._png.text)) {
              encodetEXt(this, keyword, text);
            }
          }
          this.encodeIEND();
          return this.toArray();
        }
        // https://www.w3.org/TR/PNG/#11IHDR
        encodeIHDR() {
          this.writeUint32(13);
          this.writeChars("IHDR");
          this.writeUint32(this._png.width);
          this.writeUint32(this._png.height);
          this.writeByte(this._png.depth);
          this.writeByte(this._colorType);
          this.writeByte(CompressionMethod.DEFLATE);
          this.writeByte(FilterMethod.ADAPTIVE);
          this.writeByte(this._interlaceMethod);
          writeCrc(this, 17);
        }
        // https://www.w3.org/TR/PNG/#11IEND
        encodeIEND() {
          this.writeUint32(0);
          this.writeChars("IEND");
          writeCrc(this, 4);
        }
        encodePLTE() {
          const paletteLength = this._png.palette?.length * 3;
          this.writeUint32(paletteLength);
          this.writeChars("PLTE");
          for (const color of this._png.palette) {
            this.writeByte(color[0]);
            this.writeByte(color[1]);
            this.writeByte(color[2]);
          }
          writeCrc(this, 4 + paletteLength);
        }
        encodeTRNS() {
          const alpha = this._png.palette.filter((color) => {
            return color.at(-1) !== 255;
          });
          this.writeUint32(alpha.length);
          this.writeChars("tRNS");
          for (const el of alpha) {
            this.writeByte(el.at(-1));
          }
          writeCrc(this, 4 + alpha.length);
        }
        // https://www.w3.org/TR/PNG/#11IDAT
        encodeIDAT(data) {
          this.writeUint32(data.length);
          this.writeChars("IDAT");
          this.writeBytes(data);
          writeCrc(this, data.length + 4);
        }
        encodeData() {
          const { width, height, channels, depth, data } = this._png;
          const slotsPerLine = depth <= 8 ? Math.ceil(width * depth / 8) * channels : Math.ceil(width * depth / 8 * channels / 2);
          const newData = new IOBuffer().setBigEndian();
          let offset = 0;
          if (this._interlaceMethod === InterlaceMethod.NO_INTERLACE) {
            for (let i2 = 0; i2 < height; i2++) {
              newData.writeByte(0);
              if (depth === 16) {
                offset = writeDataUint16(data, newData, slotsPerLine, offset);
              } else {
                offset = writeDataBytes(data, newData, slotsPerLine, offset);
              }
            }
          } else if (this._interlaceMethod === InterlaceMethod.ADAM7) {
            offset = writeDataInterlaced(this._png, data, newData, offset);
          }
          const buffer = newData.toArray();
          const compressed = zlibSync(buffer, this._zlibOptions);
          this.encodeIDAT(compressed);
        }
        _checkData(data) {
          const { colorType, channels, depth } = getColorType(data, data.palette);
          const png = {
            width: checkInteger(data.width, "width"),
            height: checkInteger(data.height, "height"),
            channels,
            data: data.data,
            depth,
            text: data.text,
            palette: data.palette
          };
          this._colorType = colorType;
          const expectedSize = depth < 8 ? Math.ceil(png.width * depth / 8) * png.height * channels : png.width * png.height * channels;
          if (png.data.length !== expectedSize) {
            throw new RangeError(`wrong data size. Found ${png.data.length}, expected ${expectedSize}`);
          }
          return png;
        }
      };
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/types.js
  var ResolutionUnitSpecifier;
  var init_types = __esm({
    "../picotool-js/node_modules/fast-png/lib/types.js"() {
      ResolutionUnitSpecifier = {
        /**
         * Unit is unknown.
         */
        UNKNOWN: 0,
        /**
         * Unit is the metre.
         */
        METRE: 1
      };
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/convert_indexed_to_rgb.js
  function convertIndexedToRgb(decodedImage) {
    const palette = decodedImage.palette;
    const depth = decodedImage.depth;
    if (!palette) {
      throw new Error("Color palette is undefined.");
    }
    checkDataSize(decodedImage);
    const indexSize = decodedImage.width * decodedImage.height;
    const resSize = indexSize * palette[0].length;
    const res = new Uint8Array(resSize);
    let indexPos = 0;
    let offset = 0;
    const indexes = new Uint8Array(indexSize);
    let bit = 255;
    switch (depth) {
      case 1:
        bit = 128;
        break;
      case 2:
        bit = 192;
        break;
      case 4:
        bit = 240;
        break;
      case 8:
        bit = 255;
        break;
      default:
        throw new Error("Incorrect depth value");
    }
    for (const byte of decodedImage.data) {
      let bit2 = bit;
      let shift = 8;
      while (bit2) {
        shift -= depth;
        indexes[indexPos++] = (byte & bit2) >> shift;
        bit2 = bit2 >> depth;
        if (indexPos % decodedImage.width === 0) {
          break;
        }
      }
    }
    if (decodedImage.palette) {
      for (const index of indexes) {
        const color = decodedImage.palette.at(index);
        if (!color) {
          throw new Error("Incorrect index of palette color");
        }
        res.set(color, offset);
        offset += color.length;
      }
    }
    return res;
  }
  function checkDataSize(image) {
    const expectedSize = image.depth < 8 ? Math.ceil(image.width * image.depth / 8) * image.height * image.channels : image.width * image.height * image.channels;
    if (image.data.length !== expectedSize) {
      throw new RangeError(`wrong data size. Found ${image.data.length}, expected ${expectedSize}`);
    }
  }
  var init_convert_indexed_to_rgb = __esm({
    "../picotool-js/node_modules/fast-png/lib/convert_indexed_to_rgb.js"() {
    }
  });

  // ../picotool-js/node_modules/fast-png/lib/index.js
  var lib_exports = {};
  __export(lib_exports, {
    ResolutionUnitSpecifier: () => ResolutionUnitSpecifier,
    convertIndexedToRgb: () => convertIndexedToRgb,
    decode: () => decodePng,
    decodeApng: () => decodeApng,
    encode: () => encodePng,
    hasPngSignature: () => hasPngSignature
  });
  function decodePng(data, options) {
    const decoder = new PngDecoder(data, options);
    return decoder.decode();
  }
  function encodePng(png, options) {
    const encoder2 = new PngEncoder(png, options);
    return encoder2.encode();
  }
  function decodeApng(data, options) {
    const decoder = new PngDecoder(data, options);
    return decoder.decodeApng();
  }
  var init_lib = __esm({
    "../picotool-js/node_modules/fast-png/lib/index.js"() {
      init_png_decoder();
      init_png_encoder();
      init_signature();
      init_types();
      init_convert_indexed_to_rgb();
    }
  });

  // ../picotool-js/src/bytes.js
  var require_bytes = __commonJS({
    "../picotool-js/src/bytes.js"(exports, module) {
      "use strict";
      function bytesFrom(value) {
        if (value instanceof Uint8Array) return Uint8Array.from(value);
        if (value instanceof ArrayBuffer) return new Uint8Array(value.slice(0));
        if (ArrayBuffer.isView(value)) {
          return Uint8Array.from(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
        }
        if (typeof value === "string") return latin1Bytes(value);
        return Uint8Array.from(value || []);
      }
      function latin1Bytes(value) {
        const text = String(value);
        const bytes = new Uint8Array(text.length);
        for (let index = 0; index < text.length; index += 1) {
          bytes[index] = text.charCodeAt(index) & 255;
        }
        return bytes;
      }
      function latin1Text(value) {
        const bytes = value instanceof Uint8Array ? value : bytesFrom(value);
        let output = "";
        const chunkSize = 32768;
        for (let offset = 0; offset < bytes.length; offset += chunkSize) {
          output += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
        }
        return output;
      }
      module.exports = Object.freeze({ bytesFrom, latin1Bytes, latin1Text });
    }
  });

  // ../picotool-js/src/lua-token.js
  var require_lua_token = __commonJS({
    "../picotool-js/src/lua-token.js"(exports, module) {
      "use strict";
      var { latin1Bytes, latin1Text } = require_bytes();
      var TYPE_NAMES = Object.freeze({
        space: "whitespace",
        newline: "newline",
        comment: "comment",
        string: "string literal",
        number: "number",
        name: "name",
        label: "label",
        keyword: "keyword",
        symbol: "symbol"
      });
      function asString(value) {
        if (typeof value === "string") return value;
        if (value instanceof Uint8Array || value instanceof ArrayBuffer || ArrayBuffer.isView(value)) return latin1Text(value);
        return String(value);
      }
      function pythonBytesRepr(value) {
        const bytes = latin1Bytes(asString(value));
        const quote = bytes.includes(39) && !bytes.includes(34) ? '"' : "'";
        let escaped = "";
        for (const byte of bytes) {
          if (byte === 92) escaped += "\\\\";
          else if (byte === quote.charCodeAt(0)) escaped += `\\${quote}`;
          else if (byte === 9) escaped += "\\t";
          else if (byte === 10) escaped += "\\n";
          else if (byte === 13) escaped += "\\r";
          else if (byte >= 32 && byte <= 126) escaped += String.fromCharCode(byte);
          else escaped += `\\x${byte.toString(16).padStart(2, "0")}`;
        }
        return `b${quote}${escaped}${quote}`;
      }
      var Token = class _Token {
        constructor(data, line = null, column = null) {
          this._data = asString(data);
          this.line = line;
          this.column = column;
        }
        get type() {
          return this.constructor.type;
        }
        get name() {
          return this.constructor.tokenName;
        }
        get lineno() {
          return this.line;
        }
        get charno() {
          return this.column;
        }
        get value() {
          return this._data;
        }
        get code() {
          return this._data;
        }
        set code(value) {
          this._data = asString(value);
        }
        get length() {
          return this.code.length;
        }
        equals(other) {
          if (!(other instanceof this.constructor) || other.constructor !== this.constructor) return false;
          if (this instanceof TokKeyword) return this._data.toLowerCase() === other._data.toLowerCase();
          return this._data === other._data;
        }
        matches(other) {
          if (typeof other === "function") return this instanceof other;
          return other instanceof _Token && this.equals(other);
        }
        toString() {
          return this.code;
        }
        toPythonRepr() {
          const line = this.line === null ? "None" : this.line;
          const column = this.column === null ? "None" : this.column;
          return `${this.constructor.name}<${pythonBytesRepr(this._data)}, line ${line} char ${column}>`;
        }
      };
      function tokenClass(type, tokenName) {
        return class extends Token {
          static type = type;
          static tokenName = tokenName;
        };
      }
      var TokSpace = class extends tokenClass("space", TYPE_NAMES.space) {
      };
      var TokNewline = class extends tokenClass("newline", TYPE_NAMES.newline) {
      };
      var TokComment = class extends tokenClass("comment", TYPE_NAMES.comment) {
      };
      var ESCAPES = new Map(Object.entries({
        a: 7,
        b: 8,
        f: 12,
        n: 10,
        r: 13,
        t: 9,
        v: 11,
        "\\": 92,
        '"': 34,
        "'": 39,
        "*": 1,
        "#": 2,
        "-": 3,
        "|": 4,
        "+": 5,
        "^": 6
      }));
      var REVERSE_ESCAPES = new Map([...ESCAPES].map(([name, byte]) => [byte, name]));
      for (const [byte, name] of [[0, "0"], [14, "14"], [15, "15"]]) REVERSE_ESCAPES.set(byte, name);
      REVERSE_ESCAPES.delete(34);
      REVERSE_ESCAPES.delete(39);
      var TokString = class _TokString extends Token {
        static type = "string";
        static tokenName = TYPE_NAMES.string;
        constructor(data, line = null, column = null, options = {}) {
          super(data, line, column);
          this.quote = options.quote ?? '"';
          this.multilineQuote = options.multilineQuote ?? null;
        }
        static fromCode(input, line = null, column = null) {
          const code = asString(input);
          const multiline = /^\[(=*)\[([\s\S]*)\]\1\]$/.exec(code);
          if (multiline) return new _TokString(multiline[2], line, column, { multilineQuote: multiline[1] });
          const quote = code[0];
          let value = "";
          for (let index = 1; index < code.length - 1; index += 1) {
            if (code[index] !== "\\") {
              value += code[index];
              continue;
            }
            const digits = /^\d{1,3}/.exec(code.slice(index + 1));
            if (digits) {
              value += String.fromCharCode(Number(digits[0]));
              index += digits[0].length;
            } else if (index + 1 < code.length - 1) {
              const escaped = code[++index];
              value += String.fromCharCode(ESCAPES.get(escaped) ?? escaped.charCodeAt(0));
            }
          }
          return new _TokString(value, line, column, { quote });
        }
        get code() {
          if (this.multilineQuote !== null) return `[${this.multilineQuote}[${this._data}]${this.multilineQuote}]`;
          let escaped = "";
          for (const character of this._data) {
            const byte = character.charCodeAt(0);
            if (REVERSE_ESCAPES.has(byte)) escaped += `\\${REVERSE_ESCAPES.get(byte)}`;
            else if (character === this.quote) escaped += `\\${character}`;
            else escaped += character;
          }
          return `${this.quote}${escaped}${this.quote}`;
        }
        set code(value) {
          this._data = asString(value);
        }
      };
      var TokNumber = class extends tokenClass("number", TYPE_NAMES.number) {
        get value() {
          const data = this._data;
          const lower = data.toLowerCase();
          if (lower.includes("x") || lower.includes("b")) {
            const radix = lower.includes("x") ? 16 : 2;
            const [integer, fraction] = lower.split(".");
            const whole = Number.parseInt(integer.slice(2) || "0", radix);
            return fraction === void 0 ? whole : whole + Number.parseInt(fraction, radix) / radix ** fraction.length;
          }
          return Number(data);
        }
      };
      var TokName = class extends tokenClass("name", TYPE_NAMES.name) {
      };
      var TokLabel = class extends tokenClass("label", TYPE_NAMES.label) {
      };
      var TokKeyword = class extends tokenClass("keyword", TYPE_NAMES.keyword) {
      };
      var TokSymbol = class extends tokenClass("symbol", TYPE_NAMES.symbol) {
      };
      var TOKEN_CLASSES = Object.freeze({
        space: TokSpace,
        newline: TokNewline,
        comment: TokComment,
        string: TokString,
        number: TokNumber,
        name: TokName,
        label: TokLabel,
        keyword: TokKeyword,
        symbol: TokSymbol
      });
      function createToken(type, code, line, column) {
        const TokenType = TOKEN_CLASSES[type];
        if (!TokenType) throw new TypeError(`Unknown Lua token type: ${type}`);
        return type === "string" ? TokString.fromCode(code, line, column) : new TokenType(code, line, column);
      }
      module.exports = Object.freeze({
        Token,
        TokSpace,
        TokNewline,
        TokComment,
        TokString,
        TokNumber,
        TokName,
        TokLabel,
        TokKeyword,
        TokSymbol,
        TOKEN_CLASSES,
        createToken,
        pythonBytesRepr
      });
    }
  });

  // ../picotool-js/src/lua-lexer.js
  var require_lua_lexer = __commonJS({
    "../picotool-js/src/lua-lexer.js"(exports, module) {
      "use strict";
      var { bytesFrom, latin1Bytes, latin1Text } = require_bytes();
      var tokensApi = require_lua_token();
      var KEYWORDS = new Set("and break do else elseif end false for function goto if in local nil not or repeat return then true until while".split(" "));
      var EXEMPT_SYMBOLS = /* @__PURE__ */ new Set([":", ".", ")", "]", "}"]);
      var ESCAPES = new Map(Object.entries({
        a: 7,
        b: 8,
        f: 12,
        n: 10,
        r: 13,
        t: 9,
        v: 11,
        "\\": 92,
        '"': 34,
        "'": 39,
        "*": 1,
        "#": 2,
        "-": 3,
        "|": 4,
        "+": 5,
        "^": 6
      }));
      var REVERSE_ESCAPES = new Map([...ESCAPES].map(([name, byte]) => [byte, name]));
      for (const [byte, name] of [[0, "0"], [14, "14"], [15, "15"]]) REVERSE_ESCAPES.set(byte, name);
      REVERSE_ESCAPES.delete(34);
      REVERSE_ESCAPES.delete(39);
      var SYMBOLS = ["+=", "-=", "*=", "/=", "%=", "..=", "==", "~=", "!=", "<=", ">=", "<<>", ">>>", ">><", "<<", ">>", "^^", "...", "..", "&", "|", "~", "\\", "+", "-", "*", "/", "%", "^", "#", "@", "$", "<", ">", "=", "(", ")", "{", "}", "[", "]", ";", ":", ",", "."];
      var NUMBER_PATTERNS = [
        /^0[xX][0-9a-fA-F]+(?:\.[0-9a-fA-F]+)?/,
        /^0[xX]\.[0-9a-fA-F]+/,
        /^0[bB][01]+(?:\.[01]+)?/,
        /^0[bB]\.[01]+/,
        /^[0-9]+(?:\.(?!\.)[0-9]*)?(?:[eE]-?[0-9]+)?/,
        /^\.[0-9]+(?:[eE]-?[0-9]+)?/
      ];
      var LexerError = class extends SyntaxError {
        constructor(message, line, column) {
          super(`${message} at line ${line} char ${column}`);
          this.name = "LexerError";
        }
      };
      function position(code, index) {
        const before = code.slice(0, index), lines = before.split("\n");
        return [lines.length - 1, lines.at(-1).length];
      }
      function canonicalQuotedCode(code, start, end) {
        const quote = code[start];
        let output = quote;
        for (let index = start + 1; index < end; index += 1) {
          let byte = code.charCodeAt(index);
          if (byte === 92 && index + 1 < end) {
            const digits = /^\d{1,3}/.exec(code.slice(index + 1, end));
            if (digits) {
              byte = Number(digits[0]);
              index += digits[0].length;
            } else if (code[index + 1] === "\n") {
              byte = 10;
              index += 1;
            } else if (ESCAPES.has(code[index + 1])) {
              byte = ESCAPES.get(code[index + 1]);
              index += 1;
            }
          }
          if (byte === quote.charCodeAt(0)) output += `\\${quote}`;
          else if (REVERSE_ESCAPES.has(byte)) output += `\\${REVERSE_ESCAPES.get(byte)}`;
          else output += String.fromCharCode(byte);
        }
        return `${output}${quote}`;
      }
      function scanLua(source, filename) {
        const bytes = bytesFrom(source);
        const code = latin1Text(bytes);
        let tokenCount = 0;
        let characterCount = 0;
        let index = 0;
        const replacements = [];
        const tokens = [];
        function add(type, value, offset = index) {
          const [line, column] = position(code, offset);
          tokens.push(tokensApi.createToken(type, value, line, column));
        }
        while (index < code.length) {
          const rest = code.slice(index);
          let match;
          if ((match = /^(?:\r\n|[\r\n])/.exec(rest)) || (match = /^[ \t]+/.exec(rest))) {
            add(match[0][0] === "\r" || match[0][0] === "\n" ? "newline" : "space", match[0]);
            characterCount += match[0].length;
            index += match[0].length;
            continue;
          }
          if (rest.startsWith("--[[")) {
            const end = code.indexOf("]]", index + 4);
            if (end < 0) throw new LexerError("Unterminated multiline comment", ...position(code, index));
            add("comment", code.slice(index, end + 2));
            characterCount += end + 2 - index;
            index = end + 2;
            continue;
          }
          if (match = /^\[(=*)\[/.exec(rest)) {
            const closing = `]${match[1]}]`, end = code.indexOf(closing, index + match[0].length);
            if (end < 0) throw new LexerError("Unterminated multiline string", ...position(code, index));
            add("string", code.slice(index, end + closing.length));
            characterCount += end + closing.length - index;
            index = end + closing.length;
            tokenCount += 1;
            continue;
          }
          if (rest[0] === "'" || rest[0] === '"') {
            const quote = rest[0];
            let end = index + 1;
            for (; end < code.length; end += 1) {
              if (code[end] === "\\") {
                end += 1;
                continue;
              }
              if (code[end] === quote) break;
            }
            if (end >= code.length) throw new LexerError("Unterminated string", ...position(code, index));
            const canonical = canonicalQuotedCode(code, index, end);
            add("string", canonical);
            replacements.push([index, end + 1, canonical]);
            characterCount += canonical.length;
            index = end + 1;
            tokenCount += 1;
            continue;
          }
          if (match = /^(?:--|\/\/)[^\r\n]*/.exec(rest)) {
            add("comment", match[0]);
            characterCount += match[0].length;
            index += match[0].length;
            continue;
          }
          if (match = /^::[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*::/.exec(rest)) {
            add("label", match[0]);
            characterCount += match[0].length;
            index += match[0].length;
            tokenCount += 1;
            continue;
          }
          let number;
          for (const pattern of NUMBER_PATTERNS) if (number = pattern.exec(rest)) break;
          if (number) {
            add("number", number[0]);
            characterCount += number[0].length;
            index += number[0].length;
            tokenCount += number[0].includes("e") ? 2 : 1;
            continue;
          }
          if (match = /^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*/.exec(rest)) {
            add(KEYWORDS.has(match[0]) ? "keyword" : "name", match[0]);
            characterCount += match[0].length;
            index += match[0].length;
            if (!KEYWORDS.has(match[0]) || !(/* @__PURE__ */ new Set(["local", "end"])).has(match[0])) tokenCount += 1;
            continue;
          }
          const symbol = SYMBOLS.find((candidate) => rest.startsWith(candidate));
          if (symbol) {
            add("symbol", symbol);
            characterCount += symbol.length;
            index += symbol.length;
            if (!EXEMPT_SYMBOLS.has(symbol)) tokenCount += 1;
            continue;
          }
          if (rest[0] === "?") {
            add("name", "?");
            characterCount += 1;
            index += 1;
            tokenCount += 1;
            continue;
          }
          const [line, column] = position(code, index);
          throw new LexerError(`Syntax error (remaining:b'${rest}')`, line + 1, column + 1);
        }
        const warnings = [];
        const prefix = filename ? `${filename}: ` : "";
        if (characterCount > 65535) warnings.push(`${prefix}warning: character count ${characterCount} exceeds the PICO-8 limit of 65535`);
        if (tokenCount > 8192) warnings.push(`${prefix}warning: token count ${tokenCount} exceeds the PICO-8 limit of 8192`);
        let cursor = 0, echo = "";
        for (const [start, end, replacement] of replacements) {
          echo += code.slice(cursor, start) + replacement;
          cursor = end;
        }
        echo += code.slice(cursor);
        return { characterCount, tokenCount, warnings, echo, tokens };
      }
      function analyzeLua(source, filename) {
        const { characterCount, tokenCount, warnings } = scanLua(source, filename);
        return { characterCount, tokenCount, warnings };
      }
      function echoLua(source) {
        return latin1Bytes(scanLua(source).echo);
      }
      function tokenizeLua(source) {
        return scanLua(source).tokens;
      }
      module.exports = Object.freeze({ analyzeLua, echoLua, tokenizeLua, LexerError, ...tokensApi });
    }
  });

  // ../picotool-js/src/lua-parser.js
  var require_lua_parser = __commonJS({
    "../picotool-js/src/lua-parser.js"(exports, module) {
      "use strict";
      var { tokenizeLua } = require_lua_lexer();
      var BINOPS = new Set("& | ^^ << >> >>> <<> >>< \\ < > <= >= ~= != == .. + - * / % ^ and or".split(" "));
      var UNOPS = new Set("- # ~ @ % $ not".split(" "));
      var ASSIGNOPS = new Set("= += -= *= /= %= ..=".split(" "));
      var ParserError = class extends SyntaxError {
        constructor(message, token) {
          super(token ? `${message} at line ${token.line + 1} char ${token.column}` : `${message} at end of file`);
          this.name = "ParserError";
        }
      };
      var Parser = class {
        constructor(tokens) {
          this.tokens = tokens;
          this.pos = 0;
          this.maxPos = null;
        }
        peek() {
          return this.tokens[this.pos];
        }
        accept(type, value) {
          const start = this.pos;
          while (this.peek() && ["space", "newline", "comment"].includes(this.peek().type) && !(this.peek().type === type && (value === void 0 || this.peek().code === value))) this.pos += 1;
          const token = this.peek();
          if (token && (this.maxPos === null || this.pos < this.maxPos) && token.type === type && (value === void 0 || token.code === value)) {
            this.pos += 1;
            return token;
          }
          this.pos = start;
          return null;
        }
        symbol(value) {
          return this.accept("symbol", value);
        }
        keyword(value) {
          return this.accept("keyword", value);
        }
        expect(type, value) {
          const token = this.accept(type, value);
          if (token) return token;
          throw new ParserError(value === void 0 ? `Expected ${type}` : `Expected b'${value}'`, this.peek());
        }
        require(value, message) {
          if (value !== null && value !== void 0 && value !== false) return value;
          throw new ParserError(message, this.peek());
        }
        chunk() {
          while (true) {
            while (this.symbol(";")) {
            }
            if (!this.stat()) break;
          }
          while (this.symbol(";")) {
          }
          if (this.keyword("break")) {
          } else if (this.keyword("return")) this.explist();
          while (this.symbol(";")) {
          }
          return true;
        }
        stat() {
          const start = this.pos;
          if (this.varlist()) {
            const op = this.accept("symbol");
            if (op && ASSIGNOPS.has(op.code)) {
              this.require(this.explist(), "Expected expression in assignment");
              return true;
            }
          }
          this.pos = start;
          if (this.functioncall()) return true;
          this.pos = start;
          if (this.keyword("do")) {
            this.chunk();
            this.expect("keyword", "end");
            return true;
          }
          if (this.keyword("while")) {
            this.require(this.exp(), "exp in while");
            this.expect("keyword", "do");
            this.chunk();
            this.expect("keyword", "end");
            return true;
          }
          if (this.keyword("repeat")) {
            this.chunk();
            this.expect("keyword", "until");
            this.require(this.exp(), "expression in repeat");
            return true;
          }
          if (this.keyword("if")) {
            this.exp();
            const afterCondition = this.pos;
            if (!this.keyword("then") && !this.keyword("do") && this.tokens[afterCondition - 1]?.code === ")") {
              let lineEnd = afterCondition;
              while (lineEnd < this.tokens.length && this.tokens[lineEnd].type !== "newline") lineEnd += 1;
              this.maxPos = lineEnd;
              try {
                this.chunk();
                if (this.keyword("else")) this.chunk();
              } finally {
                this.maxPos = null;
              }
              return true;
            }
            this.pos = afterCondition;
            if (!this.keyword("do")) this.expect("keyword", "then");
            this.chunk();
            while (this.keyword("elseif")) {
              this.exp();
              this.expect("keyword", "then");
              this.chunk();
            }
            if (this.keyword("else")) this.chunk();
            this.expect("keyword", "end");
            return true;
          }
          if (this.keyword("for")) {
            const forStart = this.pos;
            this.accept("name");
            if (this.symbol("=")) {
              this.require(this.exp(), "exp-init in for");
              this.expect("symbol", ",");
              this.require(this.exp(), "exp-end in for");
              if (this.symbol(",")) this.require(this.exp(), "exp-step in for");
            } else {
              this.pos = forStart;
              this.require(this.namelist(), "namelist in for-in");
              this.expect("keyword", "in");
              this.require(this.explist(), "explist in for-in");
            }
            this.expect("keyword", "do");
            this.chunk();
            this.expect("keyword", "end");
            return true;
          }
          if (this.keyword("function")) {
            this.require(this.funcname(), "funcname in function");
            this.require(this.funcbody(), "funcbody in function");
            return true;
          }
          if (this.keyword("local")) {
            if (this.keyword("function")) {
              this.expect("name");
              this.require(this.funcbody(), "funcbody in local function");
              return true;
            }
            this.require(this.namelist(), "namelist in local assignment");
            if (this.symbol("=")) this.require(this.explist(), "explist in local assignment");
            return true;
          }
          if (this.keyword("goto")) {
            this.expect("name");
            return true;
          }
          if (this.accept("label")) return true;
          this.pos = start;
          return null;
        }
        funcname() {
          if (!this.accept("name")) return null;
          while (this.symbol(".")) this.expect("name");
          if (this.symbol(":")) this.expect("name");
          return true;
        }
        namelist() {
          if (!this.accept("name")) return null;
          let last = this.pos;
          while (this.symbol(",")) {
            if (!this.accept("name")) {
              this.pos = last;
              break;
            }
            last = this.pos;
          }
          return true;
        }
        varlist() {
          if (!this.variable()) return null;
          while (this.symbol(",")) this.require(this.variable(), "var in varlist");
          return true;
        }
        variable() {
          const start = this.pos, prefix = this.prefixexp();
          if (prefix && prefix.variable) return true;
          this.pos = start;
          return null;
        }
        explist() {
          const start = this.pos;
          if (!this.exp()) {
            this.pos = start;
            return null;
          }
          while (this.symbol(",")) this.require(this.exp(), "exp after comma");
          return true;
        }
        exp() {
          if (!this.term()) return null;
          while (true) {
            const start = this.pos, op = this.accept("symbol") || this.accept("keyword");
            if (!op || !BINOPS.has(op.code)) {
              this.pos = start;
              break;
            }
            this.require(this.term(), "exp2 in binop");
          }
          return true;
        }
        term() {
          for (const value of ["nil", "false", "true"]) if (this.keyword(value)) return true;
          if (this.accept("number") || this.accept("string") || this.symbol("...")) return true;
          if (this.keyword("function")) {
            this.require(this.funcbody(), "funcbody in function");
            return true;
          }
          if (this.prefixexp() || this.table()) return true;
          const start = this.pos, op = this.accept("symbol") || this.accept("keyword");
          if (op && UNOPS.has(op.code)) {
            this.require(this.exp(), "exp after unary op");
            return true;
          }
          this.pos = start;
          return null;
        }
        prefixexp() {
          let variable = false;
          if (this.accept("name")) variable = true;
          else if (this.symbol("(")) {
            this.exp();
            this.expect("symbol", ")");
          } else return null;
          while (true) {
            if (this.symbol("[")) {
              this.require(this.exp(), "exp in prefixexp index");
              this.expect("symbol", "]");
              variable = true;
            } else if (this.symbol(".")) {
              this.expect("name");
              variable = true;
            } else if (this.args()) variable = false;
            else if (this.symbol(":")) {
              this.expect("name");
              this.require(this.args(), "args for method call");
              variable = false;
            } else break;
          }
          return { variable };
        }
        functioncall() {
          const start = this.pos, result = this.prefixexp();
          if (result && !result.variable) return true;
          this.pos = start;
          return null;
        }
        args() {
          if (this.symbol("(")) {
            this.explist();
            this.expect("symbol", ")");
            return true;
          }
          return this.table() || Boolean(this.accept("string"));
        }
        funcbody() {
          if (!this.symbol("(")) return null;
          const names = this.namelist();
          if (names) {
            if (this.symbol(",")) this.expect("symbol", "...");
          } else this.symbol("...");
          this.expect("symbol", ")");
          this.chunk();
          this.expect("keyword", "end");
          return true;
        }
        table() {
          if (!this.symbol("{")) return null;
          this.field();
          while (this.symbol(",") || this.symbol(";")) if (!this.field()) break;
          this.expect("symbol", "}");
          return true;
        }
        field() {
          const start = this.pos;
          if (this.symbol("[")) {
            this.require(this.exp(), "exp key in field");
            this.expect("symbol", "]");
            this.expect("symbol", "=");
            this.require(this.exp(), "exp value in field");
            return true;
          }
          if (this.accept("name") && this.symbol("=")) {
            this.require(this.exp(), "exp value in field");
            return true;
          }
          this.pos = start;
          return this.exp();
        }
      };
      function validateLua(source) {
        new Parser(tokenizeLua(source)).chunk();
      }
      module.exports = Object.freeze({ ParserError, validateLua });
    }
  });

  // ../picotool-js/src/lua-builtins.js
  var require_lua_builtins = __commonJS({
    "../picotool-js/src/lua-builtins.js"(exports, module) {
      module.exports = /* @__PURE__ */ new Set(["?", "__index", "_draw", "_init", "_update", "_update60", "_update_buttons", "abs", "add", "all", "assert", "atan2", "band", "bnot", "bor", "btn", "btnp", "bxor", "camera", "cartdata", "ceil", "chr", "circ", "circfill", "clip", "cls", "cocreate", "color", "coresume", "cos", "costatus", "count", "cstore", "cursor", "del", "deli", "dget", "dir", "dset", "extcmd", "fget", "fillp", "flip", "flr", "folder", "foreach", "fset", "getmetatable", "info", "line", "load", "ls", "lshr", "map", "mapdraw", "max", "memcpy", "memset", "menuitem", "mget", "mid", "min", "mset", "music", "ord", "oval", "ovalfill", "pairs", "pal", "palt", "peek", "peek2", "peek4", "pget", "poke", "poke2", "poke4", "print", "printh", "pset", "rawequal", "rawget", "rawlen", "rawset", "reboot", "rect", "rectfill", "reload", "resume", "rnd", "rotl", "rotr", "run", "save", "self", "serial", "setmetatable", "sfx", "sget", "sgn", "shl", "shr", "sin", "split", "spr", "sqrt", "srand", "sset", "sspr", "stat", "stop", "sub", "t", "time", "tline", "tonum", "tostr", "type", "yield", "\x83", "\x8B", "\x8E", "\x91", "\x94", "\x97"]);
    }
  });

  // ../picotool-js/src/lua-minify.js
  var require_lua_minify = __commonJS({
    "../picotool-js/src/lua-minify.js"(exports, module) {
      "use strict";
      var { latin1Bytes } = require_bytes();
      var base = require_picotool();
      var { tokenizeLua } = require_lua_lexer();
      var { validateLua } = require_lua_parser();
      var BUILTINS = require_lua_builtins();
      var KEYWORDS = new Set("and break do else elseif end false for function goto if in local nil not or repeat return then true until while".split(" "));
      var PRESERVED = /* @__PURE__ */ new Set([...KEYWORDS, ...BUILTINS]);
      function minifyLua(source, options = {}) {
        if (options.keepPropertyNames) {
          const error = new Error("");
          error.name = "NotImplementedError";
          throw error;
        }
        const bytes = typeof source === "string" ? base.encodeP8scii(source) : source;
        validateLua(bytes);
        const tokens = tokenizeLua(bytes), names = /* @__PURE__ */ new Map();
        let nextNameId = 0, lastWasNameKeywordNumber = false, lastWasNewline = true;
        let seenHeaderComments = 0, seenNonComment = false, output = "";
        const kept = new Set(options.keepNames || []);
        function nameForId(id) {
          return (id >= 26 ? nameForId(Math.floor(id / 26)) : "") + String.fromCharCode(97 + id % 26);
        }
        function shortName(name) {
          if (options.keepAllNames || PRESERVED.has(name) || kept.has(name)) return name;
          if (!names.has(name)) {
            let candidate;
            do {
              candidate = nameForId(nextNameId);
              nextNameId += 1;
            } while (PRESERVED.has(candidate));
            names.set(name, candidate);
          }
          return names.get(name);
        }
        for (const token of tokens) {
          if (!seenNonComment && !["comment", "space", "newline"].includes(token.type)) seenNonComment = true;
          if (!seenNonComment && seenHeaderComments < 2 && token.type === "comment") {
            seenHeaderComments += 1;
            output += `${token.code}
`;
            continue;
          }
          if (token.type === "comment" || token.type === "space") continue;
          if (token.type === "newline") {
            lastWasNameKeywordNumber = false;
            if (!lastWasNewline) output += "\n";
            lastWasNewline = true;
          } else if (token.type === "name" || token.type === "keyword" || token.type === "number") {
            if (lastWasNameKeywordNumber) output += " ";
            lastWasNameKeywordNumber = true;
            lastWasNewline = false;
            output += token.type === "name" ? shortName(token.code) : token.code;
          } else if (token.type === "label") {
            lastWasNameKeywordNumber = false;
            lastWasNewline = false;
            output += `::${shortName(token.code.slice(2, -2))}::`;
          } else {
            lastWasNameKeywordNumber = [")", "]", "}"].includes(token.code);
            lastWasNewline = false;
            output += token.code;
          }
        }
        return latin1Bytes(output);
      }
      module.exports = Object.freeze({ minifyLua });
    }
  });

  // ../picotool-js/src/lua-format-token.js
  var require_lua_format_token = __commonJS({
    "../picotool-js/src/lua-format-token.js"(exports, module) {
      "use strict";
      var { encodeP8scii } = require_picotool();
      var { bytesFrom, latin1Bytes } = require_bytes();
      var { tokenizeLua } = require_lua_lexer();
      var { validateLua } = require_lua_parser();
      function formatLuaTokens(source, { indentwidth = 2 } = {}) {
        const bytes = typeof source === "string" ? encodeP8scii(source) : bytesFrom(source);
        validateLua(bytes);
        const tokens = tokenizeLua(bytes);
        let indentLevel = 0;
        let spaceBuffer = "";
        let inFunction = false;
        let previous = null;
        let output = "";
        const symbol = (token, ...codes) => token?.type === "symbol" && codes.includes(token.code);
        const keyword = (token, ...codes) => token?.type === "keyword" && codes.includes(token.code);
        for (const token of tokens) {
          if (token.type === "newline" || token.type === "space") {
            spaceBuffer += token.code;
            continue;
          }
          if (symbol(token, ")", "}", "]") || keyword(token, "end", "until", "elseif", "else")) indentLevel -= 1;
          const newlineCount = (spaceBuffer.match(/\n/g) || []).length;
          spaceBuffer = "";
          if (newlineCount) {
            if (newlineCount > 1) output += "\n";
            output += `
${" ".repeat(Math.max(0, indentLevel * indentwidth))}`;
          } else if (token.type === "comment") output += "  ";
          else if (!(symbol(token, ",", ";", ")", "]", "}", "..") || symbol(previous, "(", "[", "{", "..") || keyword(previous, "function") && symbol(token, "(") || previous === null)) output += " ";
          previous = token;
          output += token.code;
          if (inFunction && symbol(token, ")")) {
            inFunction = false;
            indentLevel += 1;
          }
          if (keyword(token, "function")) inFunction = true;
          if (symbol(token, "(", "{", "[") || keyword(token, "do", "repeat", "then", "else")) indentLevel += 1;
        }
        return latin1Bytes(`${output}
`);
      }
      module.exports = Object.freeze({ formatLuaTokens });
    }
  });

  // ../picotool-js/src/lua-ast-writers.js
  var require_lua_ast_writers = __commonJS({
    "../picotool-js/src/lua-ast-writers.js"(exports, module) {
      "use strict";
      var { encodeP8scii } = require_picotool();
      var { bytesFrom, latin1Bytes } = require_bytes();
      var { tokenizeLua, echoLua } = require_lua_lexer();
      var { validateLua } = require_lua_parser();
      var BUILTINS = require_lua_builtins();
      var KEYWORDS = new Set("and break do else elseif end false for function goto if in local nil not or repeat return then true until while".split(" "));
      var PRESERVED = /* @__PURE__ */ new Set([...KEYWORDS, ...BUILTINS]);
      var asBytes = (source) => typeof source === "string" ? encodeP8scii(source) : bytesFrom(source);
      function checkAstInput(bytes) {
        if (bytes.length && bytes.at(-1) !== 10) {
          const error = new Error("list index out of range");
          error.name = "IndexError";
          throw error;
        }
      }
      function echoLuaAst(source) {
        const bytes = asBytes(source);
        validateLua(bytes);
        checkAstInput(bytes);
        return echoLua(bytes);
      }
      function minifyLuaAst(source) {
        const bytes = asBytes(source);
        validateLua(bytes);
        checkAstInput(bytes);
        const tokens = tokenizeLua(bytes), names = /* @__PURE__ */ new Map();
        let nextId = 0, output = "", spacing = "", tableDepth = 0;
        function nameForId(id) {
          return (id >= 26 ? nameForId(Math.floor(id / 26)) : "") + String.fromCharCode(97 + id % 26);
        }
        function shortName(name) {
          if (PRESERVED.has(name)) return name;
          if (!names.has(name)) {
            let candidate;
            do {
              candidate = nameForId(nextId++);
            } while (PRESERVED.has(candidate));
            names.set(name, candidate);
          }
          return names.get(name);
        }
        function flushSpace() {
          if (!output) {
            spacing = "";
            return;
          }
          let value = spacing.replace(/\t/g, " ").replace(/\n +/g, "\n").replace(/ +\n/g, "\n").replace(/ {2,}/g, " ").replace(/\n{2,}/g, "\n");
          output += value;
          spacing = "";
        }
        for (const token of tokens) {
          if (token.type === "comment") continue;
          if (token.type === "space" || token.type === "newline") {
            spacing += token.code;
            continue;
          }
          flushSpace();
          if (token.code === "{") tableDepth += 1;
          if (token.code === "}") tableDepth -= 1;
          if (token.code === ";" && tableDepth === 0) {
            output += " ";
            continue;
          }
          output += token.type === "name" ? shortName(token.code) : token.type === "label" ? `::${shortName(token.code.slice(2, -2))}::` : token.code;
        }
        return latin1Bytes(output.trimEnd());
      }
      function formatLuaAst(source, { indentwidth = 2 } = {}) {
        const bytes = asBytes(source);
        validateLua(bytes);
        checkAstInput(bytes);
        const tokens = tokenizeLua(bytes);
        let output = "", spacing = "", level = 0, functionParams = false;
        const sym = (token, value) => token.type === "symbol" && token.code === value;
        const key = (token, value) => token.type === "keyword" && token.code === value;
        for (const token of tokens) {
          if (token.type === "space" || token.type === "newline") {
            spacing += token.code;
            continue;
          }
          if (token.type === "comment" && output && !spacing.includes("\n")) spacing = "  ";
          if (key(token, "end") || key(token, "until") || key(token, "else") || key(token, "elseif") || sym(token, ")") || sym(token, "}")) level -= 1;
          if (spacing) {
            let value = spacing.replace(/\t/g, " ").replace(/\r\n|\n\r|\r/g, "\n").replace(/ +\n/g, "\n");
            if (output) value = value.replace(/^ *--/, "  --");
            value = value.replace(/\n *--/g, `
${" ".repeat(Math.max(0, level * indentwidth))}--`);
            if (!output) value = value.replace(/^ *--/, "--");
            value = value.replace(/\n *$/, `
${" ".repeat(Math.max(0, level * indentwidth))}`);
            if (!output) value = value.replace(/^ *$/, "");
            output += value.replace(/\n{3,}/g, "\n\n");
            spacing = "";
          }
          output += token.code;
          if (functionParams && sym(token, ")")) {
            functionParams = false;
            level += 1;
          }
          if (key(token, "function")) functionParams = true;
          if (key(token, "then") || key(token, "do") || key(token, "repeat") || key(token, "else") || sym(token, "(") || sym(token, "{")) level += 1;
        }
        output += spacing.replace(/\t/g, " ").replace(/\r\n|\n\r|\r/g, "\n").replace(/ +\n/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/[ \n]+$/, "\n");
        if (!output.endsWith("\n")) output += "\n";
        return latin1Bytes(output);
      }
      module.exports = Object.freeze({ echoLuaAst, minifyLuaAst, formatLuaAst });
    }
  });

  // ../picotool-js/src/p8writer.js
  var require_p8writer = __commonJS({
    "../picotool-js/src/p8writer.js"(exports, module) {
      "use strict";
      var base = { ...require_picotool(), ...require_sections() };
      var { analyzeLua, echoLua } = require_lua_lexer();
      var { validateLua } = require_lua_parser();
      var { minifyLua } = require_lua_minify();
      var { formatLuaTokens } = require_lua_format_token();
      var { echoLuaAst, minifyLuaAst, formatLuaAst } = require_lua_ast_writers();
      function writeP8WithDiagnostics(source, options = {}) {
        const parsed = source?.format === "p8" ? source : base.parseP8(source);
        const sections = parsed.sections;
        const version = parsed.version;
        const gfx = sections.gfx ? base.Gfx.fromLines(sections.gfx, version) : base.Gfx.empty(version);
        const gff = sections.gff ? base.Gff.fromLines(sections.gff, version) : base.Gff.empty(version);
        const map = sections.map ? base.MapSection.fromLines(sections.map, version, gfx) : base.MapSection.empty(version, gfx);
        const sfx = sections.sfx ? base.Sfx.fromLines(sections.sfx, version) : base.Sfx.empty(version);
        const music = sections.music ? base.Music.fromLines(sections.music, version) : base.Music.empty(version);
        const label = sections.label ? base.Gfx.fromLines(sections.label, version) : null;
        const sourceLua = base.encodeP8scii((sections.lua || []).join(""));
        const luaBytes = options.luaWriter === "minify" ? minifyLua(sourceLua, options.minifyOptions) : options.luaWriter === "format-token" ? formatLuaTokens(sourceLua, options.formatOptions) : options.luaWriter === "ast-minify" ? minifyLuaAst(sourceLua) : options.luaWriter === "ast-format" ? formatLuaAst(sourceLua, options.formatOptions) : options.luaWriter === "ast-echo" ? echoLuaAst(sourceLua) : sourceLua;
        const diagnostics = analyzeLua(luaBytes, options.filename);
        validateLua(luaBytes);
        const lua = base.decodeP8scii(echoLua(luaBytes));
        let output = `${base.HEADER}
version ${version}
__lua__
${lua}`;
        if (!lua.endsWith("\n")) output += "\n";
        output += `__gfx__
${gfx.toLines().join("")}`;
        if (label && label._data.length) output += `__label__
${label.toLines().join("")}`;
        output += `
__gff__
${gff.toLines().join("")}`;
        output += `__map__
${map.toLines().join("")}`;
        output += `__sfx__
${sfx.toLines().join("")}`;
        output += `__music__
${music.toLines().join("")}
`;
        return { bytes: base.encodeUtf8(output), ...diagnostics };
      }
      function writeP8(source, options) {
        return writeP8WithDiagnostics(source, options).bytes;
      }
      module.exports = Object.freeze({ writeP8, writeP8WithDiagnostics });
    }
  });

  // ../picotool-js/src/png-transport.js
  var require_png_transport = __commonJS({
    "../picotool-js/src/png-transport.js"(exports, module) {
      "use strict";
      var base = { ...require_picotool(), ...require_sections(), ...require_p8png() };
      var codecPromise;
      function codec() {
        return codecPromise ??= Promise.resolve().then(() => (init_lib(), lib_exports));
      }
      async function decodePng2(input) {
        const { decode: decode2, convertIndexedToRgb: convertIndexedToRgb2 } = await codec();
        let image = decode2(input instanceof Uint8Array ? input : new Uint8Array(input), { checkCrc: true });
        if (image.palette) image = convertIndexedToRgb2(image);
        if (image.depth !== 8) throw new Error(`Unsupported PNG bit depth ${image.depth}; expected 8`);
        if (image.channels !== 4) throw new Error(`Unsupported PNG channel count ${image.channels}; expected RGBA`);
        return { width: image.width, height: image.height, rgba: Uint8Array.from(image.data) };
      }
      async function encodePng2({ width, height, rgba }) {
        const { encode: encode2 } = await codec();
        return encode2({ width, height, data: rgba, depth: 8, channels: 4 });
      }
      async function readP8Png(input) {
        const image = await decodePng2(input);
        const picodata = base.getPicodataFromRgba(image.width, image.height, image.rgba);
        return { ...image, picodata, cartridge: base.parseP8PngPicodata(picodata) };
      }
      async function writeP8Png(cartridge, labelPng, luaBytes) {
        const label = await decodePng2(labelPng);
        const picodata = base.serializeP8PngPicodata(cartridge, luaBytes);
        if (label.width * label.height < picodata.length) throw new RangeError("PNG label is too small for PICO-8 cartridge data");
        const rgba = base.getRgbaFromPicodata(picodata, label.rgba);
        return encodePng2({ width: label.width, height: label.height, rgba });
      }
      async function writeP8PngFromP8(source, labelPng, options = {}) {
        const { writeP8 } = require_p8writer();
        const parsed = base.parseP8(writeP8(source, options));
        const version = parsed.version, sections = parsed.sections;
        const gfx = sections.gfx ? base.Gfx.fromLines(sections.gfx, version) : base.Gfx.empty(version);
        const cartridge = {
          version,
          gfx,
          map: sections.map ? base.MapSection.fromLines(sections.map, version, gfx) : base.MapSection.empty(version, gfx),
          gff: sections.gff ? base.Gff.fromLines(sections.gff, version) : base.Gff.empty(version),
          music: sections.music ? base.Music.fromLines(sections.music, version) : base.Music.empty(version),
          sfx: sections.sfx ? base.Sfx.fromLines(sections.sfx, version) : base.Sfx.empty(version)
        };
        return writeP8Png(cartridge, labelPng, base.encodeP8scii((sections.lua || []).join("")));
      }
      module.exports = Object.freeze({ decodePng: decodePng2, encodePng: encodePng2, readP8Png, writeP8Png, writeP8PngFromP8 });
    }
  });

  // ../picotool-js/src/cartridge-io.js
  var require_cartridge_io = __commonJS({
    "../picotool-js/src/cartridge-io.js"(exports, module) {
      "use strict";
      var base = { ...require_picotool(), ...require_sections(), ...require_p8png() };
      var { writeP8 } = require_p8writer();
      var { readP8Png, writeP8Png, writeP8PngFromP8, encodePng: encodePng2 } = require_png_transport();
      var UnrecognizedFileType = class extends base.P8Error {
        constructor(filename) {
          super("UNRECOGNIZED_FILE_TYPE", `Filename ${filename} is not of a supported type`, filename);
          this.name = "UnrecognizedFileType";
          this.filename = filename;
        }
      };
      function formatForFilename(filename) {
        if (filename.endsWith(".p8.png")) return "p8.png";
        if (filename.endsWith(".p8")) return "p8";
        if (filename.endsWith(".rom")) return "rom";
        throw new UnrecognizedFileType(filename);
      }
      function unsupportedRom() {
        const error = new Error("");
        error.name = "NotImplementedError";
        throw error;
      }
      async function fromBytes(input, filename) {
        const format = formatForFilename(filename);
        if (format === "rom") unsupportedRom();
        if (format === "p8") return base.parseP8(input);
        return (await readP8Png(input)).cartridge;
      }
      function p8FromCartridge(cartridge) {
        const storedCode = cartridge.code?.code ?? new Uint8Array();
        const luaBytes = cartridge.code?.codeLength == null ? storedCode : storedCode.slice(0, cartridge.code.codeLength);
        const lua = base.decodeP8scii(luaBytes);
        const sections = Object.freeze({
          lua: Object.freeze(lua.match(/[^\n]*\n|[^\n]+$/g) || []),
          gfx: Object.freeze(cartridge.gfx.toLines()),
          gff: Object.freeze(cartridge.gff.toLines()),
          map: Object.freeze(cartridge.map.toLines()),
          sfx: Object.freeze(cartridge.sfx.toLines()),
          music: Object.freeze(cartridge.music.toLines())
        });
        return Object.freeze({
          format: "p8",
          version: cartridge.version,
          sectionOrder: Object.freeze(["lua", "gfx", "gff", "map", "sfx", "music"]),
          sections
        });
      }
      async function emptyLabelPng() {
        return encodePng2({ width: 160, height: 205, rgba: new Uint8Array(160 * 205 * 4).fill(255) });
      }
      async function toBytes(cartridge, filename, options = {}) {
        const format = formatForFilename(filename);
        if (format === "rom") unsupportedRom();
        if (typeof cartridge?.toCartridge === "function") cartridge = cartridge.toCartridge(format);
        if (format === "p8") return writeP8(cartridge?.format === "p8" ? cartridge : p8FromCartridge(cartridge), options);
        const labelPng = options.labelPng ?? await emptyLabelPng();
        if (cartridge?.format === "p8") return writeP8PngFromP8(cartridge, labelPng, options);
        const storedCode = cartridge.code?.code;
        const luaBytes = options.luaBytes ?? (cartridge.code?.codeLength == null ? storedCode : storedCode.slice(0, cartridge.code.codeLength));
        return writeP8Png(cartridge, labelPng, luaBytes);
      }
      module.exports = Object.freeze({
        UnrecognizedFileType,
        formatForFilename,
        fromBytes,
        p8FromCartridge,
        emptyLabelPng,
        toBytes
      });
    }
  });

  // ../picotool-js/src/cartridge.js
  var require_cartridge = __commonJS({
    "../picotool-js/src/cartridge.js"(exports, module) {
      "use strict";
      var base = { ...require_picotool(), ...require_sections(), ...require_p8png() };
      function makeEmptyCartridge({ filename, version = 33 } = {}) {
        const gfx = base.Gfx.empty(version);
        return {
          format: "cartridge",
          filename,
          version,
          compressedSize: null,
          code: { code: new Uint8Array(), codeLength: 0, compressedSize: null },
          gfx,
          gff: base.Gff.empty(version),
          map: base.MapSection.empty(version, gfx),
          sfx: base.Sfx.empty(version),
          music: base.Music.empty(version),
          label: base.Gfx.empty(version)
        };
      }
      function writeCartData(cartridge, input, startAddress = 0) {
        const data = input instanceof Uint8Array ? input : Uint8Array.from(input);
        if (!Number.isInteger(startAddress) || startAddress < 0 || startAddress + data.length > 17152) {
          throw new RangeError(`Data too large: ${data.length} bytes starting at ${startAddress} exceeds 0x4300`);
        }
        const regions = [
          [0, 8192, cartridge.gfx],
          [8192, 12288, cartridge.map],
          [12288, 12544, cartridge.gff],
          [12544, 12800, cartridge.music],
          [12800, 17152, cartridge.sfx]
        ];
        for (const [start, end, section] of regions) {
          const overlapStart = Math.max(startAddress, start), overlapEnd = Math.min(startAddress + data.length, end);
          if (overlapStart >= overlapEnd) continue;
          if (startAddress + data.length === end) {
            section._data = section._data.slice(0, overlapStart - start);
            continue;
          }
          section._data.set(data.subarray(overlapStart - startAddress, overlapEnd - startAddress), overlapStart - start);
        }
        return cartridge;
      }
      function cartridgeCompressedSize(cartridge) {
        return cartridge.compressedSize ?? base.compressCode(cartridge.code?.code ?? new Uint8Array()).length;
      }
      module.exports = Object.freeze({ makeEmptyCartridge, writeCartData, cartridgeCompressedSize });
    }
  });

  // ../picotool-js/src/lua-ast-model.js
  var require_lua_ast_model = __commonJS({
    "../picotool-js/src/lua-ast-model.js"(exports, module) {
      "use strict";
      var { latin1Text } = require_bytes();
      var { tokenizeLua, TokName, TokSymbol, TokKeyword } = require_lua_lexer();
      var LuaAstError = class extends SyntaxError {
      };
      var NODE_CLASS_BY_TYPE = /* @__PURE__ */ Object.create(null);
      var Node = class _Node {
        constructor(type, fields = {}, first = null, last = null, source = "") {
          const named = NODE_CLASS_BY_TYPE[type];
          if (named && Object.getPrototypeOf(this) !== named.prototype) Object.setPrototypeOf(this, named.prototype);
          this.type = type;
          this._name = type;
          this._fields = Object.keys(fields);
          Object.assign(this, fields);
          this._start_token_pos = first?.tokenPos ?? null;
          this._end_token_pos = last ? last.tokenPos + 1 : null;
          this._token_groups = [];
          this.range = makeRange(first, last, source);
          this.start = this.range.start;
          this.end = this.range.end;
        }
        get start_pos() {
          return this._start_token_pos;
        }
        get end_pos() {
          return this._end_token_pos;
        }
        storeTokenGroups(tokenlist) {
          let position = this.start_pos ?? 0;
          this._token_groups = [];
          const add = (field, value) => {
            if (value instanceof _Node) {
              this._token_groups.push([field, tokenlist.slice(position, value.start_pos)]);
              value.storeTokenGroups(tokenlist);
              position = value.end_pos;
            } else if (field === "exp_block_pairs" && Array.isArray(value)) {
              value.forEach((pair, index) => {
                if (pair[0] != null) add([field, index, 0], pair[0]);
                add([field, index, 1], pair[1]);
              });
            } else if (Array.isArray(value)) {
              value.forEach((item, index) => add(Array.isArray(field) ? [...field, index] : [field, index], item));
            } else if (typeof value === "string") {
              for (let index = 0; index < value.length; index += 1) {
                this._token_groups.push(tokenlist.slice(position, position + 1));
                position += 1;
              }
            } else {
              this._token_groups.push(tokenlist.slice(position, position + 1));
              position += 1;
            }
          };
          for (const field of this._fields) add(field, this[field]);
          this._token_groups.push(tokenlist.slice(position, this.end_pos));
          return this;
        }
        store_token_groups(tokenlist) {
          return this.storeTokenGroups(tokenlist);
        }
        *iterTokens() {
          for (const group of this._token_groups) {
            const isFieldGroup = group.length === 2 && Array.isArray(group[1]) && (typeof group[0] === "string" || Array.isArray(group[0]));
            if (!isFieldGroup) yield* group;
            else {
              yield* group[1];
              const path = Array.isArray(group[0]) ? group[0] : [group[0]];
              const child = path.reduce((value, key) => value[key], this);
              yield* child.iterTokens();
            }
          }
        }
        get tokens() {
          return this.iterTokens();
        }
        children() {
          const out = [];
          for (const value of Object.values(this)) {
            if (value instanceof _Node) out.push(value);
            else if (Array.isArray(value)) {
              const collect = (item) => {
                if (item instanceof _Node) out.push(item);
                else if (Array.isArray(item)) for (const nested of item) collect(nested);
              };
              for (const item of value) collect(item);
            }
          }
          return out;
        }
        walk(visitor) {
          const fn = typeof visitor === "function" ? visitor : visitor?.visit;
          if (fn) fn(this);
          for (const child of this.children()) child.walk(visitor);
          return this;
        }
        toJSON() {
          const result = { type: this.type, range: this.range };
          for (const [key, value] of Object.entries(this)) if (!["type", "range", "start", "end"].includes(key)) result[key] = value;
          return result;
        }
      };
      var PYTHON_FIELDS = {
        Chunk: { body: "stats" },
        AssignmentStatement: { targets: "varlist", operator: "assignop", values: "explist" },
        CallStatement: { expression: "functioncall" },
        DoStatement: { body: "block" },
        WhileStatement: { condition: "exp", body: "block" },
        RepeatStatement: { body: "block", condition: "exp" },
        ReturnStatement: { values: "explist" },
        LocalAssignmentStatement: { names: "namelist", values: "explist" },
        ExpUnOp: { operator: "unop", argument: "exp" },
        ForNumericStatement: { name: "name", start: "exp_init", finish: "exp_end", step: "exp_step", body: "block" },
        ForInStatement: { names: "namelist", values: "explist", body: "block" },
        FunctionStatement: { name: "funcname", body: "funcbody" },
        LocalFunctionStatement: { name: "funcname", body: "funcbody" },
        BinaryExpression: { left: "exp1", operator: "binop", right: "exp2" },
        UnaryExpression: { operator: "unop", argument: "exp" },
        NameExpression: { name: "name" },
        NumberLiteral: { value: "value" },
        StringLiteral: { value: "value" },
        TableExpression: { fields: "fields" },
        Function: { body: "funcbody" },
        FunctionExpression: { body: "funcbody" },
        CallExpression: { callee: "exp_prefix" },
        IndexExpression: { object: "exp_prefix", index: "exp_index" },
        MemberExpression: { object: "exp_prefix", name: "attr_name" },
        LabelStatement: { name: "label" }
      };
      var PYTHON_NAMES = { AssignmentStatement: "StatAssignment", CallStatement: "StatFunctionCall", DoStatement: "StatDo", WhileStatement: "StatWhile", RepeatStatement: "StatRepeat", IfStatement: "StatIf", BreakStatement: "StatBreak", ReturnStatement: "StatReturn", GotoStatement: "StatGoto", LabelStatement: "StatLabel", ForNumericStatement: "StatForStep", ForInStatement: "StatForIn", FunctionStatement: "StatFunction", LocalFunctionStatement: "StatLocalFunction", LocalAssignmentStatement: "StatLocalAssignment", BinaryExpression: "ExpBinOp", UnaryExpression: "ExpUnOp", NameExpression: "VarName", NumberLiteral: "ExpValue", StringLiteral: "ExpValue", TableExpression: "TableConstructor", CallExpression: "FunctionCall", FunctionExpression: "Function", IndexExpression: "VarIndex", MemberExpression: "VarAttribute", Chunk: "Chunk" };
      var node = (type, fields, first, last, source) => {
        const mapped = {};
        const renames = PYTHON_FIELDS[type] || {};
        for (const [key, value] of Object.entries(fields)) mapped[renames[key] || key] = value;
        if (type === "AssignmentStatement") {
          const vf = fields.targets[0], vl = fields.targets.at(-1), ef = fields.values[0], el = fields.values.at(-1);
          mapped.varlist = wrapNode("VarList", { vars: fields.targets }, tokenFromNode(vf, source), tokenFromNode(vl, source, true), source);
          mapped.explist = wrapNode("ExpList", { exps: fields.values }, tokenFromNode(ef, source), tokenFromNode(el, source, true), source);
        }
        if (type === "LocalAssignmentStatement") {
          const vals = fields.values.map((v) => ["CallExpression", "FunctionCall"].includes(v?.type) ? node("ExpValue", { value: v }, tokenFromNode(v, source), tokenFromNode(v, source, true), source) : v);
          mapped.namelist = wrapNode("NameList", { names: fields.names }, first, first, source);
          mapped.explist = vals.length ? wrapNode("ExpList", { exps: vals }, first, last, source) : null;
        }
        if (type === "ReturnStatement") {
          const ef = fields.values[0], el = fields.values.at(-1);
          mapped.explist = fields.values.length ? wrapNode("ExpList", { exps: fields.values }, tokenFromNode(ef, source), tokenFromNode(el, source, true), source) : null;
          if (mapped.explist) mapped.explist._start_token_pos = (first.actualTokenPos ?? first.tokenPos) + 1;
          if (mapped.explist && ef?.type === "VarargDots") ef._start_token_pos -= 1;
        }
        if (type === "CallExpression" && fields.method !== void 0) {
          mapped.methodname = mapped.method;
          delete mapped.method;
        }
        if (type === "CallExpression" && mapped.args?.type === "ExpList") {
          const inner = mapped.args;
          const wrapperFirst = tokenFromNode(inner, source);
          inner._start_token_pos += 1;
          const closePos = inner._end_token_pos;
          inner._end_token_pos -= 1;
          mapped.args = wrapNode("FunctionArgs", { explist: inner }, wrapperFirst, tokenFromNode(inner, source, true), source);
          mapped.args._end_token_pos = closePos;
          inner.exps.forEach((v, i2) => {
            mapped.args[i2] = v?.decoded !== void 0 ? { value: v.decoded } : v;
          });
          Object.defineProperty(mapped.args, "length", { value: inner.exps.length, enumerable: false });
        }
        if (type === "CallExpression" && mapped.args === null) mapped.args = wrapNode("FunctionArgs", { explist: null }, first ? { ...first, tokenPos: first.tokenPos + 1 } : first, last, source);
        if (type === "ForInStatement") {
          mapped.namelist = wrapNode("NameList", { names: fields.names }, first, last, source);
          mapped.explist = wrapNode("ExpList", { exps: fields.values }, first, last, source);
        }
        const pythonType = type === "CallExpression" && fields.method !== void 0 ? "FunctionCallMethod" : PYTHON_NAMES[type] || type;
        const n = new Node(pythonType, mapped, first, last, source);
        n.type = pythonType;
        if ((type === "IndexExpression" || type === "MemberExpression") && fields.object?.end_pos !== void 0) n._start_token_pos = fields.object.end_pos;
        if (type === "AssignmentStatement" && n.varlist) n.varlist._start_token_pos = first.tokenPos;
        if (pythonType === "FunctionCallMethod") {
          n._fields = ["exp_prefix", "methodname", "args"];
          n._start_token_pos = first.tokenPos + 1;
        }
        const fieldOrder = { AssignmentStatement: ["varlist", "assignop", "explist"], LocalAssignmentStatement: ["namelist", "explist"], ReturnStatement: ["explist"], ForInStatement: ["namelist", "explist", "block"] };
        if (fieldOrder[type]) n._fields = fieldOrder[type];
        for (const [key, value] of Object.entries(fields)) if (!(key in n)) n[key] = value;
        if (type === "NumberLiteral" || type === "StringLiteral" || type === "ExpValue") {
          if (Object.prototype.hasOwnProperty.call(n, "raw")) {
            const raw = n.raw;
            delete n.raw;
            Object.defineProperty(n, "raw", { value: raw, enumerable: false });
          }
          n._fields = n._fields.filter((f) => f !== "raw");
          if (Object.prototype.hasOwnProperty.call(n, "decoded")) {
            const decoded = n.decoded;
            delete n.decoded;
            Object.defineProperty(n, "decoded", { value: decoded, enumerable: false });
            n._fields = n._fields.filter((f) => f !== "decoded");
          }
          if (Object.prototype.hasOwnProperty.call(n, "numberValue")) {
            const numberValue = n.numberValue;
            delete n.numberValue;
            Object.defineProperty(n, "numberValue", { value: numberValue, enumerable: false });
            n._fields = n._fields.filter((f) => f !== "numberValue");
          }
        }
        if (type === "FunctionStatement" || type === "LocalFunctionStatement") {
          const funcname = n.funcname;
          Object.defineProperty(n, "name", { value: typeof funcname === "string" ? funcname : funcname?.name, enumerable: false });
          Object.defineProperty(n, "body", { value: n.funcbody, enumerable: false });
        }
        if (type === "LocalAssignmentStatement" && Array.isArray(fields.values)) Object.defineProperty(n, "values", { value: fields.values.map((v) => v?.numberValue !== void 0 ? { ...v, value: v.numberValue } : v), enumerable: false });
        if ((type === "NameExpression" || type === "VarName") && typeof n.name === "string") n.name = new TokName(n.name, n.start.line, n.start.column);
        if (type === "AssignmentStatement" && typeof n.assignop === "string") {
          const p = findCodePosition(source, n.assignop, n.start.offset);
          n.assignop = new TokSymbol(n.assignop, p.line, p.column);
        }
        if (type === "ExpBinOp" && typeof n.binop === "string") {
          const p = findCodePosition(source, n.binop, n.start.offset);
          n.binop = ["and", "or"].includes(n.binop) ? new TokKeyword(n.binop, p.line, p.column) : new TokSymbol(n.binop, p.line, p.column);
        }
        if ((type === "ExpBinOp" || type === "BinaryExpression") && n.binop?.code) {
          n.operator = n.binop.code;
        }
        if (type === "ExpUnOp" && typeof n.unop === "string") {
          const p = findCodePosition(source, n.unop, n.start.offset);
          n.unop = n.unop === "not" ? new TokKeyword("not", p.line, p.column) : new TokSymbol(n.unop, p.line, p.column);
        }
        if (type === "ExpUnOp" && n.unop?.code) {
          n.operator = n.unop.code;
        }
        if (type === "NameList" && Array.isArray(n.names) && typeof n.names[0] === "string") n.names = tokenizedNames(n.names, source, n.start.offset);
        if (type === "FunctionName") {
          if (typeof n.namepath?.[0] === "string") n.namepath = tokenizedNames(n.namepath, source, n.start.offset);
          if (typeof n.methodname === "string") n.methodname = tokenizedNames([n.methodname], source, n.start.offset).at(-1);
        }
        if (type === "ForNumericStatement" && typeof n.name === "string") n.name = tokenAtText(n.name, source, n.start.offset, TokName);
        if (type === "FunctionCallMethod" && typeof n.methodname === "string") n.methodname = tokenAtText(n.methodname, source, n.start.offset, TokName);
        if (type === "FieldNamedKey" && typeof n.key_name === "string") n.key_name = tokenAtText(n.key_name, source, n.start.offset, TokName);
        if (type === "MemberExpression" && typeof n.attr_name === "string") n.attr_name = tokenAtText(n.attr_name, source, n.start.offset, TokName);
        if ((type === "StatGoto" || type === "StatLabel") && typeof n.label === "string") n.label = tokenAtText(n.label, source, n.start.offset, type === "StatLabel" ? require_lua_token().TokLabel : TokName);
        return n;
      };
      function wrapNode(type, fields, first, last, source) {
        const n = new Node(type, fields, first, last, source);
        n.type = type;
        n._name = type;
        if (type === "NameList" && Array.isArray(n.names) && typeof n.names[0] === "string") n.names = tokenizedNames(n.names, source, n.start.offset);
        if (type === "FunctionName" && Array.isArray(n.namepath) && typeof n.namepath[0] === "string") n.namepath = tokenizedNames(n.namepath, source, n.start.offset);
        return n;
      }
      function makeExpList(values, first, last, source) {
        const n = wrapNode("ExpList", { exps: values }, first, last, source);
        values.forEach((v, i2) => {
          n[i2] = v;
        });
        Object.defineProperty(n, "length", { value: values.length, enumerable: false });
        return n;
      }
      function tokenFromNode(n, source, end = false) {
        if (!n) return null;
        const p = end ? n.range.end : n.range.start;
        return { tokenPos: end ? n.end_pos - 1 : n.start_pos, line: p.line, column: p.column, code: end ? "" : source.slice(n.range.start.offset, n.range.end.offset) };
      }
      function findCodePosition(source, code, offset = 0) {
        const at = String(source).indexOf(code, Math.max(0, offset));
        const before = String(source).slice(0, at < 0 ? offset : at);
        const lines = before.split(/\n/);
        return { line: lines.length - 1, column: lines.at(-1).length };
      }
      function tokenAtText(text, source, offset, Klass) {
        const p = findCodePosition(source, text, offset);
        return new Klass(text, p.line, p.column);
      }
      function tokenizedNames(names, source, offset) {
        let at = offset;
        return names.map((name) => {
          const token = tokenAtText(name, source, at, TokName);
          at = source.indexOf(name, at) + String(name).length;
          return token;
        });
      }
      function makeRange(first, last, source) {
        if (!first || !last) return { start: { line: 0, column: 0, offset: 0 }, end: { line: 0, column: 0, offset: 0 } };
        const start = point(first, source), end = point(last, source, true);
        return { start, end };
      }
      function point(token, source, end = false) {
        const line = token.line ?? 0, column = token.column ?? 0;
        const lines = String(source).split(/\n/);
        let offset = 0;
        for (let i2 = 0; i2 < line; i2++) offset += lines[i2].length + 1;
        offset += column;
        if (end) offset += token.code.length;
        return { line, column: end ? column + token.code.length : column, offset };
      }
      var AstParser = class {
        constructor(source) {
          this.source = typeof source === "string" ? source : latin1Text(source);
          const allTokens = tokenizeLua(this.source);
          this.allTokens = allTokens;
          this.tokens = allTokens.filter((t, pos) => {
            if (["space", "newline", "comment"].includes(t.type)) return false;
            t.tokenPos = pos;
            return true;
          });
          this.i = 0;
        }
        peek(n = 0) {
          return this.tokens[this.i + n];
        }
        at(type, code) {
          const t = this.peek();
          return !!t && t.type === type && (code === void 0 || t.code === code);
        }
        take(type, code) {
          if (!this.at(type, code)) return null;
          return this.tokens[this.i++];
        }
        expect(type, code) {
          const t = this.take(type, code);
          if (!t) throw new LuaAstError(`Expected ${code || type}`);
          return t;
        }
        keyword(code) {
          return this.take("keyword", code);
        }
        symbol(code) {
          return this.take("symbol", code);
        }
        parse() {
          const first = this.peek();
          const body = [];
          while (this.peek()) {
            if (this.symbol(";")) continue;
            const start = this.i;
            try {
              body.push(this.statement());
            } catch (error) {
              const initial = this.tokens[start];
              if (!(error instanceof LuaAstError) || error.message !== "Expected statement" && (initial?.type === "name" || initial?.type === "keyword" && !["nil", "true", "false"].includes(initial.code))) throw error;
              this.i = start;
              break;
            }
          }
          const result = node("Chunk", { body }, first, this.tokens[this.i - 1], this.source);
          result._start_token_pos = 0;
          result._end_token_pos = this.i ? this.tokens[this.i - 1].tokenPos + 1 : 0;
          if (!Object.prototype.hasOwnProperty.call(result, "body")) Object.defineProperty(result, "body", { value: body, enumerable: false });
          result.storeTokenGroups(this.allTokens);
          return result;
        }
        statement() {
          let first = this.peek();
          const prior = this.tokens[this.i - 1];
          if (first && !prior && first.tokenPos > 0) first = { ...first, actualTokenPos: first.tokenPos, tokenPos: 0 };
          else if (first && prior && first.tokenPos - prior.tokenPos > 1) first = { ...first, actualTokenPos: first.tokenPos, tokenPos: prior.tokenPos + 1 };
          if (this.keyword("return")) return node("ReturnStatement", { values: this.peek() && !this.at("symbol", ";") && !this.at("keyword", "end") && !this.at("keyword", "else") && !this.at("keyword", "elseif") ? this.explist() : [] }, first, this.tokens[this.i - 1], this.source);
          if (this.keyword("break")) return node("BreakStatement", {}, first, this.tokens[this.i - 1], this.source);
          if (this.keyword("goto")) {
            const label = this.expect("name");
            return node("GotoStatement", { label: label.code }, first, label, this.source);
          }
          if (this.at("label")) {
            const t = this.take("label");
            return node("LabelStatement", { name: t.code.slice(2, -2) }, first, t, this.source);
          }
          if (this.keyword("do")) {
            const body = this.block("end");
            const end = this.expect("keyword", "end");
            return node("DoStatement", { body }, first, end, this.source);
          }
          if (this.keyword("while")) {
            const condition = this.expression();
            this.expect("keyword", "do");
            const body = this.block("end");
            const end = this.expect("keyword", "end");
            return node("WhileStatement", { condition, body }, first, end, this.source);
          }
          if (this.keyword("repeat")) {
            const body = this.block("until");
            this.expect("keyword", "until");
            const condition = this.expression();
            return node("RepeatStatement", { body, condition }, first, this.tokens[this.i - 1], this.source);
          }
          if (this.keyword("if")) return this.ifStatement(first);
          if (this.keyword("for")) return this.forStatement(first);
          if (this.keyword("local")) return this.localStatement(first);
          if (this.keyword("function")) {
            const name = this.funcName();
            const body = this.functionBody();
            return node("FunctionStatement", { name, body }, first, this.tokens[this.i - 1], this.source);
          }
          let expr = this.expression();
          const targets = [expr.value && expr.type === "ExpValue" ? expr.value : expr];
          const mark = this.i;
          while (this.symbol(",")) {
            const target = this.expression();
            targets.push(target?.type === "ExpValue" ? target.value : target);
          }
          if (this.at("symbol") && ["=", "+=", "-=", "*=", "/=", "%=", "..="].includes(this.peek().code)) {
            const opToken = this.take("symbol");
            const op = opToken.code;
            const values = this.explist();
            const result = node("AssignmentStatement", { targets, values, operator: op }, first, this.tokens[this.i - 1], this.source);
            result.explist._start_token_pos = opToken.tokenPos + 1;
            return result;
          }
          this.i = mark;
          const call = expr.type === "ExpValue" && expr.value instanceof Node ? expr.value : expr;
          if (!["CallExpression", "FunctionCall", "FunctionCallMethod"].includes(call.type)) throw new LuaAstError("Expected statement");
          const statement = node("CallStatement", { expression: call }, first, this.tokens[this.i - 1], this.source);
          return statement;
        }
        block(until) {
          let first = this.peek();
          const before = this.tokens[this.i - 1];
          if (first && before && first.tokenPos - before.tokenPos > 1) first = { ...first, tokenPos: before.tokenPos + 1 };
          const body = [];
          while (this.peek() && !this.at("keyword", until) && !this.at("keyword", "elseif") && !this.at("keyword", "else")) {
            if (this.symbol(";")) continue;
            body.push(this.statement());
          }
          const last = this.tokens[this.i - 1] || first;
          const result = node("Chunk", { body }, first, last, this.source);
          if (!Object.prototype.hasOwnProperty.call(result, "body")) Object.defineProperty(result, "body", { value: body, enumerable: false });
          return result;
        }
        ifStatement(first) {
          const pairs = [];
          let condition = this.expression();
          const gotThen = this.keyword("then");
          const gotDo = !gotThen && this.keyword("do");
          if (!gotThen && !gotDo) {
            const shortBody = this.statement();
            const body2 = node("Chunk", { body: [shortBody] }, { ...this.tokens[this.i - 1], tokenPos: Math.max(0, this.tokens[this.i - 1].tokenPos - 1) }, this.tokens[this.i - 1], this.source);
            Object.defineProperty(body2, "body", { value: body2.stats, enumerable: false });
            pairs.push([condition, body2]);
            const elseToken = this.keyword("else");
            if (elseToken) {
              const sameLine = this.peek() && this.peek().line === elseToken.line;
              const elseStat = sameLine ? this.statement() : null;
              if (elseStat) {
                const elseBody2 = node("Chunk", { body: [elseStat] }, { ...this.tokens[this.i - 1], tokenPos: Math.max(0, this.tokens[this.i - 1].tokenPos - 1) }, this.tokens[this.i - 1], this.source);
                Object.defineProperty(elseBody2, "body", { value: elseBody2.stats, enumerable: false });
                pairs.push([null, elseBody2]);
              }
            }
            const result2 = node("IfStatement", { exp_block_pairs: pairs }, first, this.tokens[this.i - 1], this.source);
            Object.defineProperty(result2, "clauses", { value: pairs.filter((p) => p[0]).map((p) => wrapNode("IfClause", { condition: p[0], body: p[1] }, first, this.tokens[this.i - 1], this.source)), enumerable: false });
            Object.defineProperty(result2, "elseBody", { value: pairs.at(-1)?.[0] === null ? pairs.at(-1)[1] : null, enumerable: false });
            return result2;
          }
          if (gotDo) {
            const inner = condition;
            const outer = node("ExpValue", { value: inner }, first, this.tokens[this.i - 1], this.source);
            outer._start_token_pos = first.tokenPos + 1;
            outer._end_token_pos = inner.end_pos + 1;
            condition = outer;
          }
          let body = this.block("end");
          pairs.push([condition, body]);
          while (this.keyword("elseif")) {
            condition = this.expression();
            this.expect("keyword", "then");
            body = this.block("end");
            pairs.push([condition, body]);
          }
          let elseBody = null;
          if (this.keyword("else")) {
            elseBody = this.block("end");
            pairs.push([null, elseBody]);
          }
          const end = this.expect("keyword", "end");
          const result = node("IfStatement", { exp_block_pairs: pairs }, first, end, this.source);
          Object.defineProperty(result, "clauses", { value: pairs.filter((p) => p[0]).map((p) => wrapNode("IfClause", { condition: p[0], body: p[1] }, tokenAtOffset(this.tokens, p[0].range.start.offset, this.source), tokenAtOffset(this.tokens, p[1].range.end.offset, this.source), this.source)), enumerable: false });
          Object.defineProperty(result, "elseBody", { value: elseBody, enumerable: false });
          return result;
        }
        forStatement(first) {
          const name = this.expect("name");
          if (this.symbol("=")) {
            const start = this.expression();
            this.expect("symbol", ",");
            const finish = this.expression();
            const step = this.symbol(",") ? this.expression() : null;
            this.expect("keyword", "do");
            const body2 = this.block("end");
            const end2 = this.expect("keyword", "end");
            return node("ForNumericStatement", { name, start, finish, step, body: body2 }, first, end2, this.source);
          }
          const names = [name];
          while (this.symbol(",")) names.push(this.expect("name"));
          this.expect("keyword", "in");
          const values = this.explist();
          this.expect("keyword", "do");
          const body = this.block("end");
          const end = this.expect("keyword", "end");
          const result = node("ForInStatement", { names, values, body }, first, end, this.source);
          result.namelist = wrapNode("NameList", { names }, names[0], names.at(-1), this.source);
          result.namelist._start_token_pos = names[0].tokenPos - 1;
          if (result.explist) {
            result.explist._start_token_pos = values[0]?.start_pos ?? result.explist.start_pos;
            result.explist._end_token_pos = values.at(-1)?.end_pos ?? result.explist.end_pos;
          }
          return result;
        }
        localStatement(first) {
          if (this.keyword("function")) {
            const name = this.expect("name");
            const body = this.functionBody();
            return node("LocalFunctionStatement", { name, body }, first, this.tokens[this.i - 1], this.source);
          }
          const names = [this.expect("name")];
          while (this.symbol(",")) names.push(this.expect("name"));
          const eq = this.symbol("=") ? this.tokens[this.i - 1] : null;
          const values = eq ? this.explist() : [];
          const result = node("LocalAssignmentStatement", { names, values }, first, this.tokens[this.i - 1], this.source);
          result.namelist = wrapNode("NameList", { names }, names[0], names.at(-1), this.source);
          result.namelist._start_token_pos = names[0].tokenPos - 1;
          if (eq && result.explist) result.explist._start_token_pos = eq.tokenPos + 1;
          return result;
        }
        funcName() {
          const first = this.expect("name");
          const path = [first];
          while (this.symbol(".")) path.push(this.expect("name"));
          let methodname = null;
          if (this.symbol(":")) methodname = this.expect("name");
          const fn = node("FunctionName", { namepath: path, methodname }, first, this.tokens[this.i - 1], this.source);
          if (first.tokenPos > 0) fn._start_token_pos = first.tokenPos - 1;
          Object.defineProperty(fn, "name", { value: path.map((token) => token.code).join(".") + (methodname ? `:${methodname.code}` : ""), enumerable: false });
          return fn;
        }
        functionBody() {
          const first = this.expect("symbol", "(");
          const params = [];
          const paramTokens = [];
          let dots = null;
          if (!this.at("symbol", ")")) {
            if (this.symbol("...")) dots = node("VarargDots", {}, this.tokens[this.i - 1], this.tokens[this.i - 1], this.source);
            else {
              let pt = this.expect("name");
              params.push(pt.code);
              paramTokens.push(pt);
              while (this.symbol(",")) {
                if (this.symbol("...")) {
                  dots = node("VarargDots", {}, this.tokens[this.i - 1], this.tokens[this.i - 1], this.source);
                  break;
                }
                pt = this.expect("name");
                params.push(pt.code);
                paramTokens.push(pt);
              }
            }
          }
          this.expect("symbol", ")");
          const body = this.block("end");
          const end = this.expect("keyword", "end");
          const parlist = params.length ? wrapNode("NameList", { names: paramTokens }, paramTokens[0], paramTokens.at(-1), this.source) : null;
          const result = node("FunctionBody", { parlist, dots, block: body }, first, end, this.source);
          Object.defineProperty(result, "params", { value: params, enumerable: false });
          Object.defineProperty(result, "vararg", { value: !!dots, enumerable: false });
          Object.defineProperty(result, "body", { value: body, enumerable: false });
          return result;
        }
        explist() {
          const values = [this.expression()];
          while (this.symbol(",")) values.push(this.expression());
          return values;
        }
        expression(min = 0) {
          let left = this.prefix();
          const binops = /* @__PURE__ */ new Set(["or", "and", "==", "~=", "!=", "<", ">", "<=", ">=", "|", "^^", "&", "<<", ">>", "..", "+", "-", "*", "/", "%", "^"]);
          while (this.peek() && (this.at("symbol") || this.at("keyword")) && binops.has(this.peek().code)) {
            const opToken = this.take(this.peek().type);
            const right = this.prefix();
            const binary = node("BinaryExpression", { left, operator: opToken, right }, tokenAtOffset(this.tokens, left.range.start.offset, this.source), tokenAtOffset(this.tokens, right.range.end.offset - 1, this.source), this.source);
            binary._start_token_pos = left.end_pos;
            left = binary;
          }
          return left;
        }
        prefix() {
          const first = this.peek();
          const preceding = this.tokens[this.i - 1];
          let value;
          let parenthesizedAtomic = false;
          if (this.keyword("nil")) value = node("ExpValue", { value: null }, first, first, this.source);
          else if (this.keyword("true") || this.keyword("false")) value = node("ExpValue", { value: this.tokens[this.i - 1].code === "true" }, first, this.tokens[this.i - 1], this.source);
          else if (this.at("number")) {
            const t = this.take("number");
            value = node("ExpValue", { value: t, numberValue: Number(t.value) }, t, t, this.source);
          } else if (this.at("string")) {
            const t = this.take("string");
            value = node("ExpValue", { value: t, decoded: t.value }, t, t, this.source);
          } else if (this.symbol("...")) value = node("VarargDots", {}, first, first, this.source);
          else if (this.at("symbol") && ["-", "#", "~", "@", "%", "$"].includes(this.peek().code)) {
            const op = this.take("symbol");
            value = node("ExpUnOp", { operator: op.code, argument: this.expression(0) }, op, this.tokens[this.i - 1], this.source);
          } else if (this.keyword("not")) {
            const op = this.tokens[this.i - 1];
            value = node("ExpUnOp", { operator: "not", argument: this.expression(10) }, op, this.tokens[this.i - 1], this.source);
          } else if (this.keyword("function")) value = node("ExpValue", { value: node("Function", { body: this.functionBody() }, first, this.tokens[this.i - 1], this.source) }, first, this.tokens[this.i - 1], this.source);
          else if (this.symbol("{")) value = node("ExpValue", { value: this.table(first) }, first, this.tokens[this.i - 1], this.source);
          else {
            if (this.symbol("(")) {
              const inner = this.expression();
              const close = this.expect("symbol", ")");
              parenthesizedAtomic = inner.type === "ExpValue";
              value = parenthesizedAtomic ? inner : node("ExpValue", { value: inner }, first, close, this.source);
            } else {
              const t = this.expect("name");
              value = node("ExpValue", { value: node("NameExpression", { name: t }, t, t, this.source) }, t, t, this.source);
            }
          }
          if (value?.type === "ExpValue" && !preceding && first.tokenPos > 0) value._start_token_pos = 0;
          else if (value?.type === "ExpValue" && !parenthesizedAtomic && preceding && first.tokenPos - preceding.tokenPos > 1) value._start_token_pos = preceding.tokenPos + 1;
          else if (value?.type === "ExpValue" && first?.tokenPos != null && this.tokens[this.i - 2]?.tokenPos != null && first.tokenPos - this.tokens[this.i - 2].tokenPos > 1) value._start_token_pos = this.tokens[this.i - 2].tokenPos + 1;
          if (value?.type === "ExpUnOp" && first?.tokenPos > 0) value._start_token_pos = first.tokenPos - 1;
          if (value?.type === "ExpValue" && value.value instanceof Node && value.value.type === "VarName") value.value._start_token_pos = value._start_token_pos;
          const wrapped = value;
          let hadSuffix = false;
          if (value.type === "ExpValue" && value.value instanceof Node) value = value.value;
          while (true) {
            if (this.symbol("[")) {
              hadSuffix = true;
              const index = this.expression();
              const end = this.expect("symbol", "]");
              value = node("IndexExpression", { object: value, index }, first, end, this.source);
            } else if (this.symbol(".")) {
              hadSuffix = true;
              const name = this.expect("name");
              value = node("MemberExpression", { object: value, name }, first, name, this.source);
            } else if (this.symbol(":")) {
              hadSuffix = true;
              const method = this.expect("name");
              const args = this.arguments();
              value = node("CallExpression", { callee: value, method, args }, first, this.tokens[this.i - 1], this.source);
            } else if (this.at("symbol", "(") || this.at("string") || this.at("symbol", "{")) {
              hadSuffix = true;
              const args = this.arguments();
              value = node("CallExpression", { callee: value, args }, first, this.tokens[this.i - 1], this.source);
            } else break;
          }
          if (!hadSuffix) value = wrapped;
          else if (["CallExpression", "FunctionCall"].includes(value.type)) {
            value._start_token_pos += 1;
            const startPos = preceding && first.tokenPos - preceding.tokenPos > 1 ? preceding.tokenPos + 1 : first.tokenPos;
            value = node("ExpValue", { value }, { ...first, tokenPos: startPos }, this.tokens[this.i - 1], this.source);
          } else {
            const startPos = preceding && first.tokenPos - preceding.tokenPos > 1 ? preceding.tokenPos + 1 : first.tokenPos;
            value = node("ExpValue", { value }, { ...first, tokenPos: startPos }, this.tokens[this.i - 1], this.source);
          }
          return value;
        }
        arguments() {
          if (this.symbol("(")) {
            const open = this.tokens[this.i - 1];
            const empty2 = this.at("symbol", ")");
            const values = empty2 ? [] : this.explist();
            const close = this.expect("symbol", ")");
            return empty2 ? null : makeExpList(values, open, close, this.source);
          }
          if (this.at("symbol", "{")) {
            const first = this.take("symbol", "{");
            return node("TableConstructor", { fields: this.table(first).fields }, first, this.tokens[this.i - 1], this.source);
          }
          const t = this.take("string");
          return node("StringLiteral", { value: t.code, decoded: t.value }, t, t, this.source);
        }
        table(first) {
          const prior = this.tokens[this.i - 2];
          const fields = [];
          while (!this.at("symbol", "}")) {
            let key = null, value, explicit = false, fieldStart = this.peek();
            if (this.symbol("[")) {
              explicit = true;
              fieldStart = { ...this.tokens[this.i - 1], tokenPos: this.tokens[this.i - 1].tokenPos - 1 };
              key = this.expression();
              this.expect("symbol", "]");
              this.expect("symbol", "=");
              value = this.expression();
            } else {
              const f = this.expression();
              fieldStart = tokenFromNode(f, this.source);
              value = f;
              if (this.symbol("=")) {
                key = f;
                value = this.expression();
              }
            }
            const fieldType = key == null ? "FieldExp" : explicit ? "FieldExpKey" : "FieldNamedKey";
            const fieldFields = key == null ? { exp: value } : explicit ? { key_exp: key, exp: value } : { key_name: key?.value?.name ?? key?.name, exp: value };
            fields.push(node(fieldType, fieldFields, fieldStart, this.tokens[this.i - 1], this.source));
            if (!this.symbol(",") && !this.symbol(";")) break;
          }
          const end = this.expect("symbol", "}");
          const result = node("TableExpression", { fields }, first, end, this.source);
          if (prior && first.tokenPos - prior.tokenPos > 1) result._start_token_pos = prior.tokenPos + 1;
          return result;
        }
      };
      function parseLua(source) {
        return new AstParser(source).parse();
      }
      function tokenAtOffset(tokens, offset, source) {
        let candidate = tokens[0];
        const lines = String(source).split(/\n/);
        for (const token of tokens) {
          let point2 = token.column;
          for (let i2 = 0; i2 < token.line; i2++) point2 += lines[i2].length + 1;
          if (point2 <= offset) candidate = token;
        }
        return candidate;
      }
      var PYTHON_NODE_TYPES = ["Chunk", "StatAssignment", "StatFunctionCall", "StatDo", "StatWhile", "StatRepeat", "StatIf", "StatForStep", "StatForIn", "StatFunction", "StatLocalFunction", "StatLocalAssignment", "StatGoto", "StatLabel", "StatBreak", "StatReturn", "FunctionName", "FunctionArgs", "VarList", "VarName", "VarIndex", "VarAttribute", "NameList", "ExpList", "ExpValue", "VarargDots", "ExpBinOp", "ExpUnOp", "FunctionCall", "FunctionCallMethod", "Function", "FunctionBody", "TableConstructor", "FieldExp", "FieldExpKey", "FieldNamedKey"];
      var NAMED_FIELDS = { Chunk: ["stats"], StatAssignment: ["varlist", "assignop", "explist"], StatFunctionCall: ["functioncall"], StatDo: ["block"], StatWhile: ["exp", "block"], StatRepeat: ["block", "exp"], StatIf: ["exp_block_pairs"], StatForStep: ["name", "exp_init", "exp_end", "exp_step", "block"], StatForIn: ["namelist", "explist", "block"], StatFunction: ["funcname", "funcbody"], StatLocalFunction: ["funcname", "funcbody"], StatLocalAssignment: ["namelist", "explist"], StatGoto: ["label"], StatLabel: ["label"], StatReturn: ["explist"], FunctionName: ["namepath", "methodname"], FunctionArgs: ["explist"], VarList: ["vars"], VarName: ["name"], VarIndex: ["exp_prefix", "exp_index"], VarAttribute: ["exp_prefix", "attr_name"], NameList: ["names"], ExpList: ["exps"], ExpValue: ["value"], VarargDots: [], ExpBinOp: ["exp1", "binop", "exp2"], ExpUnOp: ["unop", "exp"], FunctionCall: ["exp_prefix", "args"], FunctionCallMethod: ["exp_prefix", "methodname", "args"], Function: ["funcbody"], FunctionBody: ["parlist", "dots", "block"], TableConstructor: ["fields"], FieldExp: ["exp"], FieldExpKey: ["key_exp", "exp"], FieldNamedKey: ["key_name", "exp"] };
      var exportsMap = { Node, LuaNode: Node, LuaAstError, parseLua, parseLuaAst: parseLua, AstParser };
      for (const name of PYTHON_NODE_TYPES) {
        const Named = class extends Node {
          constructor(...args) {
            const names = NAMED_FIELDS[name] || [];
            const options = args.length === names.length + 1 && args.at(-1) && typeof args.at(-1) === "object" && !Array.isArray(args.at(-1)) ? args.pop() : {};
            if (args.length !== names.length) throw new TypeError(`Initializer for ${name} requires ${names.length} fields, saw ${args.length}`);
            const fields = {};
            names.forEach((field, i2) => {
              fields[field] = args[i2];
            });
            super(name, fields, null, null, "");
            this._start_token_pos = options.start ?? null;
            this._end_token_pos = options.end ?? null;
            for (const [key, value] of Object.entries(options)) if (key !== "start" && key !== "end") this[key] = value;
          }
        };
        Object.defineProperty(Named, "name", { value: name });
        const classFields = Object.freeze([...NAMED_FIELDS[name] || []]);
        for (const target of [Named, Named.prototype]) {
          Object.defineProperties(target, {
            _name: { value: name, enumerable: true, writable: true },
            _fields: { value: classFields, enumerable: true, writable: true },
            _children: { value: null, enumerable: true, writable: true }
          });
        }
        NODE_CLASS_BY_TYPE[name] = Named;
        exportsMap[name] = Named;
      }
      module.exports = Object.freeze(exportsMap);
    }
  });

  // ../picotool-js/src/lua-ast-walker.js
  var require_lua_ast_walker = __commonJS({
    "../picotool-js/src/lua-ast-walker.js"(exports, module) {
      "use strict";
      var { Token } = require_lua_token();
      var ast = require_lua_ast_model();
      var BaseASTWalker = class {
        constructor(tokens, root, args = {}) {
          this._tokens = tokens;
          this._root = root;
          this._args = args || {};
        }
        *_walk_token() {
        }
        *_walk_value() {
        }
        *_walk(node) {
          if (node && Array.isArray(node._fields) && typeof node.type === "string") {
            const handler = this[`_walk_${node.type}`] || this._walk_node;
            const result = handler.call(this, node);
            if (result != null) yield* result;
          } else if (node instanceof Token) {
            yield* this._walk_token(node);
          } else if (Array.isArray(node)) {
            for (const item of node) yield* this._walk(item);
          } else {
            yield* this._walk_value(node);
          }
        }
        *_walk_node(node) {
          for (const field of node._fields) {
            if (field === "label" && (node.type === "StatGoto" || node.type === "StatLabel") && typeof node[field] === "string") {
              for (let index = 0; index < node[field].length; index += 1) yield* this._walk(node[field].charCodeAt(index) & 255);
            } else yield* this._walk(node[field]);
          }
        }
        *walk() {
          yield* this._walk(this._root);
        }
      };
      BaseASTWalker.prototype._walk_Node = BaseASTWalker.prototype._walk_node;
      for (const [name, constructor] of Object.entries(ast)) {
        if (typeof constructor === "function" && constructor.prototype instanceof ast.Node) {
          BaseASTWalker.prototype[`_walk_${name}`] = BaseASTWalker.prototype._walk_node;
        }
      }
      module.exports = Object.freeze({ BaseASTWalker });
    }
  });

  // ../picotool-js/src/ast-print.js
  var require_ast_print = __commonJS({
    "../picotool-js/src/ast-print.js"(exports, module) {
      "use strict";
      var { parseLua, Node } = require_lua_ast_model();
      var { Token } = require_lua_token();
      function scalar(value) {
        if (value instanceof Token) return value.toPythonRepr();
        if (value === null || value === void 0) return "None";
        if (value === true) return "True";
        if (value === false) return "False";
        if (typeof value === "string") return `b'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n")}'`;
        return String(value);
      }
      function printNode(value, indent = 0, prefix = "", output = []) {
        const pad = " ".repeat(indent);
        if (value instanceof Node || value && Array.isArray(value._fields)) {
          output.push(`${pad}${prefix}${value.type || value._name}
`);
          for (const field of value._fields) printNode(value[field], indent + 2, `* ${field}: `, output);
        } else if (Array.isArray(value)) {
          output.push(`${pad}${prefix}[list:]
`);
          for (const item of value) printNode(item, indent + 2, "- ", output);
        } else {
          output.push(`${pad}${prefix}${scalar(value)}
`);
        }
        return output;
      }
      function printAst(source) {
        return printNode(parseLua(source)).join("");
      }
      module.exports = Object.freeze({ printAst, printNode });
    }
  });

  // ../picotool-js/src/portable-path.js
  var require_portable_path = __commonJS({
    "../picotool-js/src/portable-path.js"(exports, module) {
      "use strict";
      function normalize(value) {
        const input = String(value).replace(/\\/g, "/");
        const absolute = input.startsWith("/");
        const parts = [];
        for (const part of input.split("/")) {
          if (!part || part === ".") continue;
          if (part === "..") {
            if (parts.length && parts.at(-1) !== "..") parts.pop();
            else if (!absolute) parts.push(part);
          } else parts.push(part);
        }
        const output = `${absolute ? "/" : ""}${parts.join("/")}`;
        return output || (absolute ? "/" : ".");
      }
      function dirname(value) {
        const normalized = normalize(value);
        if (normalized === "/" || normalized === ".") return normalized;
        const separator = normalized.lastIndexOf("/");
        if (separator < 0) return ".";
        return separator === 0 ? "/" : normalized.slice(0, separator);
      }
      function join(...values) {
        return normalize(values.filter((value) => value !== "").join("/"));
      }
      function isAbsolute(value) {
        return String(value).replace(/\\/g, "/").startsWith("/");
      }
      module.exports = Object.freeze({ dirname, isAbsolute, join, normalize });
    }
  });

  // ../picotool-js/src/require-build.js
  var require_require_build = __commonJS({
    "../picotool-js/src/require-build.js"(exports, module) {
      "use strict";
      var path = require_portable_path();
      var { encodeP8scii } = require_picotool();
      var { bytesFrom, latin1Bytes, latin1Text } = require_bytes();
      var { tokenizeLua, echoLua } = require_lua_lexer();
      var { validateLua } = require_lua_parser();
      var PREAMBLE = "package={loaded={},_c={}}\n";
      var REQUIRE_FUNCTION = "function require(p)\nlocal l=package.loaded\nif (l[p]==nil) l[p]=package._c[p]()\nif (l[p]==nil) l[p]=true\nreturn l[p]\nend\n";
      var GAME_LOOP_NAMES = /* @__PURE__ */ new Set(["_init", "_update", "_update60", "_draw"]);
      var LuaBuildError = class extends Error {
        constructor(message, token) {
          super(`${message} at line ${token.line + 1} char ${token.column}`);
          this.name = "LuaBuildError";
        }
      };
      function significant(source) {
        return tokenizeLua(source).filter((token) => !["space", "newline", "comment"].includes(token.type));
      }
      function stringValue(code) {
        if (!code || !['"', "'"].includes(code[0])) return null;
        const body = code.slice(1, -1);
        return body.replace(/\\(\d{1,3}|.)/gs, (_, escape) => {
          if (/^\d/.test(escape)) return String.fromCharCode(Number(escape));
          const values = { a: 7, b: 8, f: 12, n: 10, r: 13, t: 9, v: 11 };
          return String.fromCharCode(values[escape] ?? escape.charCodeAt(0));
        });
      }
      function calls(source) {
        const tokens = significant(source), found = [];
        function pythonAttributeError(message) {
          const error = new Error(message);
          error.name = "AttributeError";
          throw error;
        }
        function insideAnotherCall(index) {
          const stack = [];
          for (let j = 0; j < index; j += 1) {
            const value = tokens[j].code;
            if (value === "(") stack.push(tokens[j - 1]?.type === "name" || [")", "]"].includes(tokens[j - 1]?.code));
            else if (value === ")") stack.pop();
          }
          return stack.includes(true);
        }
        for (let i2 = 0; i2 + 1 < tokens.length; i2 += 1) {
          if (tokens[i2].type !== "name" || tokens[i2].code !== "require") continue;
          if (i2 > 0 && [".", ":"].includes(tokens[i2 - 1].code)) continue;
          if (insideAnotherCall(i2)) continue;
          if (tokens[i2 + 1]?.type === "string") pythonAttributeError("'TokString' object has no attribute 'explist'");
          if (tokens[i2 + 1]?.code === "{") pythonAttributeError("'TableConstructor' object has no attribute 'explist'");
          if (tokens[i2 + 1]?.code !== "(") continue;
          const open = tokens[i2 + 1], args = [];
          let start = i2 + 2, depth = 0, end = -1;
          for (let j = start; j < tokens.length; j += 1) {
            const value = tokens[j].code;
            if (value === ")" && depth === 0) {
              if (j > start) args.push(tokens.slice(start, j));
              end = j;
              break;
            }
            if (value === "," && depth === 0) {
              args.push(tokens.slice(start, j));
              start = j + 1;
              continue;
            }
            if (["(", "{", "["].includes(value)) depth += 1;
            if ([")", "}", "]"].includes(value)) depth -= 1;
          }
          if (end < 0) continue;
          if (args.length < 1 || args.length > 2) throw new LuaBuildError(`require() has ${args.length} args, should have 1 or 2`, open);
          if (args[0].length !== 1 || args[0][0].type !== "string") {
            throw new LuaBuildError("require() first argument must be a string literal", open);
          }
          const requirePath = stringValue(args[0][0].code);
          let useGameLoop = false;
          if (args.length === 2) {
            const option = args[1];
            if (option[0]?.code !== "{" || option.at(-1)?.code !== "}") {
              throw new LuaBuildError("require() second argument must be a table literal", open);
            }
            if (option.length !== 5 || option[1].code !== "use_game_loop" || option[2].code !== "=" || !["true", "false"].includes(option[3].code)) {
              throw new LuaBuildError("Invalid require() options; did you mean {use_game_loop=true} ?", open);
            }
            useGameLoop = option[3].code === "true";
          }
          found.push({ path: requirePath, useGameLoop, token: open });
          i2 = end;
        }
        return found;
      }
      function removeGameLoops(source) {
        const tokens = significant(latin1Bytes(source));
        const lines = source.split("\n");
        const offsets = [0];
        for (let i2 = 0; i2 < lines.length - 1; i2 += 1) offsets.push(offsets.at(-1) + lines[i2].length + 1);
        const offset = (token) => offsets[token.line] + token.column;
        const ranges = [];
        for (let i2 = 0; i2 + 1 < tokens.length; i2 += 1) {
          if (tokens[i2].code !== "function" || !GAME_LOOP_NAMES.has(tokens[i2 + 1].code)) continue;
          const start = offset(tokens[i2]);
          if (start > 0 && source[start - 1] !== "\n") continue;
          let depth = 1, pendingDo = 0, last = -1;
          for (let j = i2 + 2; j < tokens.length; j += 1) {
            const value = tokens[j].code;
            if (["function", "if", "for", "while", "repeat"].includes(value)) {
              depth += 1;
              if (value === "for" || value === "while") pendingDo += 1;
            } else if (value === "do") {
              if (pendingDo) pendingDo -= 1;
              else depth += 1;
            } else if (value === "end" || value === "until") {
              depth -= 1;
              if (depth === 0) {
                last = j;
                break;
              }
            }
          }
          if (last < 0) continue;
          let end = offset(tokens[last]) + tokens[last].code.length;
          while (source[end] === " " || source[end] === "	") end += 1;
          if (source[end] === "\n") end += 1;
          ranges.push([start, end]);
          i2 = last;
        }
        if (!ranges.length) return source;
        const finalEnd = ranges.at(-1)[1];
        if (source.slice(finalEnd).trim()) {
          const error = new Error("");
          error.name = "AssertionError";
          throw error;
        }
        let result = "", cursor = 0;
        for (const [start, end] of ranges) {
          result += source.slice(cursor, start);
          cursor = end;
        }
        return result + source.slice(cursor);
      }
      function bundleRequiredLua(source, { filename = "main.lua", files = {}, luaPath } = {}) {
        const main = typeof source === "string" ? encodeP8scii(source) : bytesFrom(source);
        validateLua(main);
        const modules = /* @__PURE__ */ new Map();
        function visit(bytes, currentFile) {
          for (const call of calls(bytes)) {
            if (call.path.includes("./") || call.path.startsWith("/")) {
              throw new LuaBuildError('require() filename cannot contain "./" or "../" or start with "/"', call.token);
            }
            if (modules.has(call.path)) continue;
            let selected = null;
            for (const pattern of (luaPath ?? "?;?.lua").split(";")) {
              const candidate = pattern.replace("?", call.path);
              const resolved = path.isAbsolute(candidate) ? path.normalize(candidate) : path.normalize(path.join(path.dirname(currentFile), candidate));
              const key = resolved.replace(/^\//, "");
              if (Object.prototype.hasOwnProperty.call(files, key)) {
                selected = key;
                break;
              }
            }
            if (selected === null) {
              throw new LuaBuildError(`require() file ${call.path} not found; used load path ${luaPath ?? "None"}`, call.token);
            }
            const value = files[selected];
            const moduleBytes = typeof value === "string" ? encodeP8scii(value) : bytesFrom(value);
            validateLua(moduleBytes);
            let moduleCode = latin1Text(echoLua(moduleBytes));
            if (!call.useGameLoop && [...GAME_LOOP_NAMES].some((name) => moduleCode.includes(`function ${name}`))) {
              moduleCode = removeGameLoops(moduleCode);
            }
            modules.set(call.path, moduleCode);
            visit(moduleBytes, selected);
          }
        }
        visit(main, filename);
        if (!modules.size) return echoLua(main);
        let output = PREAMBLE;
        for (const [modulePath, moduleCode] of modules) {
          output += `package._c["${modulePath.replace(/"/g, '\\"')}"]=function()
${moduleCode}end
`;
        }
        output += REQUIRE_FUNCTION + latin1Text(echoLua(main));
        validateLua(latin1Bytes(output));
        return latin1Bytes(output);
      }
      module.exports = Object.freeze({ bundleRequiredLua, LuaBuildError });
    }
  });

  // ../picotool-js/src/build.js
  var require_build = __commonJS({
    "../picotool-js/src/build.js"(exports, module) {
      "use strict";
      var base = { ...require_picotool(), ...require_sections() };
      var { writeP8 } = require_p8writer();
      var { validateLua } = require_lua_parser();
      var { bundleRequiredLua } = require_require_build();
      var DEFAULT_VERSION = 33;
      var DOMAINS = ["lua", "gfx", "gff", "map", "sfx", "music"];
      var EMPTY = {
        gfx: () => base.Gfx.empty(DEFAULT_VERSION).toLines(),
        gff: () => base.Gff.empty(DEFAULT_VERSION).toLines(),
        map: () => base.MapSection.empty(DEFAULT_VERSION).toLines(),
        sfx: () => base.Sfx.empty(DEFAULT_VERSION).toLines(),
        music: () => base.Music.empty(DEFAULT_VERSION).toLines()
      };
      function emptySections() {
        const sections = { lua: [], label: base.Gfx.empty(DEFAULT_VERSION).toLines() };
        for (const [name, factory] of Object.entries(EMPTY)) sections[name] = factory();
        return sections;
      }
      function buildP8({
        existing,
        sources = {},
        empty: empty2 = [],
        luaMinify = false,
        luaFormat = false,
        keepAllNames = false,
        keepNames = [],
        indentwidth = 2,
        optimizeTokens = false
      } = {}) {
        const previous = existing ? base.parseP8(existing) : null;
        const version = previous?.version ?? DEFAULT_VERSION;
        const sections = previous ? { ...previous.sections } : emptySections();
        for (const domain of DOMAINS) {
          const source = sources[domain];
          if (source !== void 0 && empty2.includes(domain)) throw new Error(`Cannot specify --${domain} and --empty-${domain} args together.`);
          if (source !== void 0) {
            if (domain === "lua" && source.format === "lua") {
              if (optimizeTokens) {
                const error = new Error("--optimize_tokens not yet implemented, sorry");
                error.name = "NotImplementedError";
                throw error;
              }
              const text = typeof source.data === "string" ? source.data : new TextDecoder().decode(source.data);
              validateLua(base.encodeP8scii(text));
              const bundled = bundleRequiredLua(text, {
                filename: source.filename || "main.lua",
                files: source.files || {},
                luaPath: source.luaPath
              });
              sections.lua = base.decodeP8scii(bundled).match(/[^\n]*\n|[^\n]+$/g) || [];
            } else {
              const parsed = base.parseP8(source.data ?? source);
              sections[domain] = parsed.sections[domain] || [];
            }
          } else if (empty2.includes(domain)) {
            sections[domain] = domain === "lua" ? [] : EMPTY[domain]();
          }
        }
        const writer = luaFormat ? { luaWriter: "ast-format", formatOptions: { indentwidth } } : luaMinify ? { luaWriter: "minify", minifyOptions: { keepAllNames, keepNames } } : void 0;
        return writeP8({ format: "p8", version, sections }, writer);
      }
      module.exports = Object.freeze({ buildP8, DEFAULT_VERSION });
    }
  });

  // ../picotool-js/src/lua-pure.js
  var require_lua_pure = __commonJS({
    "../picotool-js/src/lua-pure.js"(exports, module) {
      "use strict";
      var { encodeP8scii } = require_picotool();
      var { bytesFrom, latin1Bytes } = require_bytes();
      var { tokenizeLua } = require_lua_lexer();
      var { validateLua } = require_lua_parser();
      function pureLua(source) {
        const bytes = typeof source === "string" ? encodeP8scii(source) : bytesFrom(source);
        validateLua(bytes);
        const output = [];
        let line = [];
        function emit(tokens) {
          if (!tokens.length) return "";
          const ended = tokens.at(-1).type === "newline";
          if (ended) tokens = tokens.slice(0, -1);
          if (!tokens.length) return "\n";
          tokens = tokens.map((token) => ({ type: token.type, code: token.code }));
          const find = (type, value, start = 0) => tokens.findIndex((token, index) => index >= start && token.type === type && token.code === value);
          const nextNonspace = (start = 0) => {
            let index = start;
            while (tokens[index]?.type === "space") index += 1;
            return index < tokens.length ? index : -1;
          };
          if (tokens.at(-1).type === "comment" && tokens.at(-1).code.startsWith("//")) {
            tokens.at(-1).code = `--${tokens.at(-1).code.slice(2)}`;
          }
          const printAt = find("name", "?");
          if (printAt >= 0) {
            tokens[printAt].code = "print";
            tokens.splice(printAt + 1, 0, { type: "symbol", code: "(" });
            tokens.push({ type: "symbol", code: ")" });
          }
          const ifAt = find("keyword", "if");
          if (ifAt >= 0) {
            const left = find("symbol", "(", ifAt + 1);
            const right = left < 0 ? -1 : find("symbol", ")", left + 1);
            const thenAt = right < 0 ? -1 : nextNonspace(right + 1);
            if (thenAt >= 0 && !["then", "and", "or"].includes(tokens[thenAt].code)) {
              tokens.splice(
                right + 1,
                0,
                { type: "space", code: " " },
                { type: "keyword", code: "then" },
                { type: "space", code: " " }
              );
              tokens.push({ type: "space", code: " " }, { type: "keyword", code: "end" });
            }
          }
          const first = nextNonspace();
          if (first >= 0 && tokens[first].type === "name") {
            const assign = nextNonspace(first + 1);
            const symbol = tokens[assign]?.code;
            if (["+=", "-=", "*=", "/=", "%="].includes(symbol)) {
              tokens.splice(
                assign,
                1,
                { type: "symbol", code: "=" },
                { type: "space", code: " " },
                { type: "name", code: tokens[first].code },
                { type: "space", code: " " },
                { type: "symbol", code: symbol[0] },
                { type: "space", code: " " }
              );
            }
          }
          const notEqual = find("symbol", "!=");
          if (notEqual >= 0) tokens[notEqual].code = "~=";
          return `${tokens.map((token) => token.code).join("")}
`;
        }
        for (const token of tokenizeLua(bytes)) {
          line.push(token);
          if (token.type === "newline") {
            output.push(emit(line));
            line = [];
          }
        }
        if (line.length) output.push(emit(line));
        return latin1Bytes(output.join(""));
      }
      module.exports = Object.freeze({ pureLua });
    }
  });

  // ../picotool-js/src/stats.js
  var require_stats = __commonJS({
    "../picotool-js/src/stats.js"(exports, module) {
      "use strict";
      var base = { ...require_picotool(), ...require_sections(), ...require_p8png() };
      var { latin1Bytes } = require_bytes();
      var { analyzeLua, tokenizeLua, echoLua } = require_lua_lexer();
      var { validateLua } = require_lua_parser();
      function cartridgeStats(source) {
        const parsed = source?.format === "p8" ? source : base.parseP8(source);
        const lua = base.encodeP8scii((parsed.sections.lua || []).join(""));
        const diagnostics = analyzeLua(lua);
        validateLua(lua);
        const tokens = tokenizeLua(lua);
        const comment = (index) => tokens[index]?.type === "comment" ? latin1Bytes(tokens[index].code.slice(2).replace(/^[\x09-\x0d\x20]+|[\x09-\x0d\x20]+$/g, "")) : null;
        return {
          title: comment(0),
          byline: comment(2),
          version: parsed.version,
          characterCount: diagnostics.characterCount,
          tokenCount: diagnostics.tokenCount,
          lineCount: tokens.filter((token) => token.type === "newline").length,
          compressedSize: base.compressCode(echoLua(lua)).length
        };
      }
      module.exports = Object.freeze({ cartridgeStats });
    }
  });

  // ../picotool-js/src/listing.js
  var require_listing = __commonJS({
    "../picotool-js/src/listing.js"(exports, module) {
      "use strict";
      var base = require_picotool();
      var { latin1Bytes, latin1Text } = require_bytes();
      var { echoLua, tokenizeLua } = require_lua_lexer();
      var { pureLua } = require_lua_pure();
      function friendly(bytes) {
        return latin1Text(bytes).replace(/[\x80-\xff]/g, "_");
      }
      function lines(bytes) {
        return latin1Text(bytes).match(/[^\n]*\n|[^\n]+$/g) || [];
      }
      function listLua(source, { pure = false, showLineNumbers = false } = {}) {
        const parsed = source?.format === "p8" ? source : base.parseP8(source);
        const lua = base.encodeP8scii((parsed.sections.lua || []).join(""));
        const output = pure ? pureLua(lua) : echoLua(lua);
        return lines(output).map((line, index) => `${showLineNumbers ? `${index}: ` : ""}${friendly(latin1Bytes(line))}`).join("") + "\n";
      }
      function pythonFloat(value) {
        const number = Number(value);
        return Number.isInteger(number) ? `${number}.0` : String(number);
      }
      function pythonBytesRepr(value) {
        const bytes = latin1Bytes(value);
        const hasSingle = bytes.includes(39), hasDouble = bytes.includes(34);
        const quote = hasSingle && !hasDouble ? '"' : "'";
        let output = "b" + quote;
        for (const byte of bytes) {
          if (byte === 92) output += "\\\\";
          else if (byte === quote.charCodeAt(0)) output += `\\${quote}`;
          else if (byte === 9) output += "\\t";
          else if (byte === 10) output += "\\n";
          else if (byte === 13) output += "\\r";
          else if (byte >= 32 && byte <= 126) output += String.fromCharCode(byte);
          else output += `\\x${byte.toString(16).padStart(2, "0")}`;
        }
        return output + quote;
      }
      function listTokens(source) {
        const parsed = source?.format === "p8" ? source : base.parseP8(source);
        const lua = base.encodeP8scii((parsed.sections.lua || []).join(""));
        let position = 0, output = "";
        for (const token of tokenizeLua(lua)) {
          if (token.type === "newline") output += "\n";
          else if (token.type === "space" || token.type === "comment") output += `<${pythonBytesRepr(token.code)}>`;
          else {
            const value = token.type === "number" ? pythonFloat(token.value) : token.type === "string" ? token.value : token.code;
            output += `<${position}:${token.type === "number" ? value : pythonBytesRepr(value)}>`;
            position += 1;
          }
        }
        return `${output}
`;
      }
      module.exports = Object.freeze({ listLua, listTokens });
    }
  });

  // ../picotool-js/src/lua-find.js
  var require_lua_find = __commonJS({
    "../picotool-js/src/lua-find.js"(exports, module) {
      "use strict";
      var base = require_picotool();
      var { latin1Text } = require_bytes();
      var { echoLua } = require_lua_lexer();
      var { validateLua } = require_lua_parser();
      function friendly(value) {
        return latin1Text(typeof value === "string" ? Uint8Array.from(value, (character) => character.charCodeAt(0)) : value).replace(/[\x80-\xff]/g, "_");
      }
      function findLua(source, pattern, { filename = "<cartridge>", listFiles = false } = {}) {
        const parsed = source?.format === "p8" ? source : base.parseP8(source);
        const lua = base.encodeP8scii((parsed.sections.lua || []).join(""));
        validateLua(lua);
        const code = latin1Text(echoLua(lua));
        const lines = code.match(/[^\n]*\n|[^\n]+$/g) || [];
        const expression = pattern instanceof RegExp ? new RegExp(pattern.source, pattern.flags.replace(/[gy]/g, "")) : new RegExp(pattern);
        const matches = [];
        for (let index = 0; index < lines.length; index += 1) {
          if (!expression.test(lines[index])) continue;
          if (listFiles) return `${filename}
`;
          matches.push(`${filename}:${index + 1}:${friendly(lines[index])}`);
        }
        return matches.join("");
      }
      module.exports = Object.freeze({ findLua });
    }
  });

  // ../picotool-js/src/browser-commands.js
  var require_browser_commands = __commonJS({
    "../picotool-js/src/browser-commands.js"(exports, module) {
      "use strict";
      var base = require_picotool();
      var { fromBytes, p8FromCartridge, toBytes } = require_cartridge_io();
      var { cartridgeStats } = require_stats();
      var { listLua, listTokens } = require_listing();
      var { findLua } = require_lua_find();
      var { printAst } = require_ast_print();
      var { writeP8 } = require_p8writer();
      var { buildP8 } = require_build();
      var { latin1Bytes, latin1Text } = require_bytes();
      var CART_EXTENSIONS = [".p8", ".p8.png"];
      var BUILD_DOMAINS = ["lua", "gfx", "gff", "map", "sfx", "music"];
      function fileName(file) {
        const name = typeof file === "object" && file ? file.name || file.filename : null;
        if (!name) throw new TypeError("Each input file must provide a name.");
        return name;
      }
      async function fileBytes(file) {
        if (file instanceof Uint8Array) return file;
        if (file?.bytes !== void 0) return file.bytes instanceof Uint8Array ? file.bytes : new Uint8Array(file.bytes);
        if (file?.data !== void 0) {
          if (typeof file.data === "string") return new TextEncoder().encode(file.data);
          return file.data instanceof Uint8Array ? file.data : new Uint8Array(file.data);
        }
        if (typeof file?.arrayBuffer === "function") return new Uint8Array(await file.arrayBuffer());
        throw new TypeError(`${fileName(file)} does not provide bytes.`);
      }
      function requireCartridgeName(name) {
        if (!CART_EXTENSIONS.some((extension) => name.endsWith(extension))) {
          throw new Error("filename must end in .p8 or .p8.png");
        }
      }
      async function loadCartridge(file) {
        const name = fileName(file);
        requireCartridgeName(name);
        const bytes = await fileBytes(file);
        const cartridge = await fromBytes(bytes, name);
        return { name, bytes, cartridge, p8: cartridge.format === "p8" ? cartridge : p8FromCartridge(cartridge) };
      }
      function friendly(value) {
        if (value === null || value === void 0) return "";
        if (value instanceof Uint8Array || value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
          return latin1Text(value).replace(/[\x80-\xff]/g, "_");
        }
        return String(value).replace(/[\x80-\xff]/g, "_");
      }
      function csvField(value) {
        const text = friendly(value);
        return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
      }
      function basename(name) {
        return String(name).split(/[\\/]/).pop();
      }
      function statsCsv(rows) {
        const values = [[
          "Filename",
          "Title",
          "Byline",
          "Code Version",
          "Char Count",
          "Token Count",
          "Line Count",
          "Compressed Code Size"
        ]];
        for (const row of rows) values.push([
          basename(row.name),
          row.title,
          row.byline,
          row.version,
          row.characterCount,
          row.tokenCount,
          row.lineCount,
          row.compressedSize
        ]);
        return `${values.map((row) => row.map(csvField).join(",")).join("\r\n")}\r
`;
      }
      async function mapCartridges(command, request, action) {
        const results = [], errors = [];
        const cartridges = request.cartridges || [];
        if (cartridges.length === 0) {
          return { ok: false, implemented: true, command, results, errors: [{
            name: "<input>",
            code: "USAGE",
            message: `${command}: the following arguments are required: filename`
          }] };
        }
        for (const file of cartridges) {
          let name = "<input>";
          try {
            name = fileName(file);
            results.push(await action(await loadCartridge(file), file));
          } catch (error) {
            errors.push({ name, code: error.code || error.name || "ERROR", message: error.message });
          }
        }
        return { ok: errors.length === 0, implemented: true, command, results, errors };
      }
      function luaSource(p8) {
        return (p8.sections.lua || []).join("");
      }
      function formatRawLua(source, showLineNumbers) {
        return String(source).split("\n").map((line, index) => `${showLineNumbers ? `${index}: ` : ""}${friendly(latin1Bytes(line))}
`).join("") + "\n";
      }
      function outputName(name, suffix = "_fmt") {
        return name.endsWith(".p8.png") ? `${name.slice(0, -7)}${suffix}.p8.png` : `${name.slice(0, -3)}${suffix}.p8`;
      }
      function normalizeKeepNames(request) {
        if (Array.isArray(request.keepNames)) return request.keepNames;
        if (request.keepNamesBytes !== void 0) {
          return latin1Text(request.keepNamesBytes instanceof Uint8Array ? request.keepNamesBytes : new Uint8Array(request.keepNamesBytes)).split("\n").map((line) => line.replace(/^[\t\n\v\f\r ]+|[\t\n\v\f\r ]+$/g, "")).filter((line) => line && !line.startsWith("#"));
        }
        const contents = request.keepNamesText;
        if (contents === void 0) return [];
        return String(contents).split("\n").map((line) => line.replace(/^[\t\n\v\f\r ]+|[\t\n\v\f\r ]+$/g, "")).filter((line) => line && !line.startsWith("#"));
      }
      function createBrowserCommands() {
        async function stats(request = {}) {
          const response = await mapCartridges("stats", request, async ({ name, p8 }) => {
            const values = cartridgeStats(p8);
            return {
              name,
              title: friendly(values.title),
              byline: friendly(values.byline),
              version: values.version,
              characterCount: values.characterCount,
              tokenCount: values.tokenCount,
              lineCount: values.lineCount,
              compressedSize: values.compressedSize
            };
          });
          if (request.csv) response.csv = statsCsv(response.results);
          return response;
        }
        function listing(command, request, render) {
          return mapCartridges(command, request, async ({ name, p8 }) => ({ name, text: render(p8, name) }));
        }
        function listlua(request = {}) {
          return listing("listlua", request, (p8) => listLua(p8, {
            pure: Boolean(request.pureLua),
            showLineNumbers: Boolean(request.showLineNumbers)
          }));
        }
        function listrawlua(request = {}) {
          return listing("listrawlua", request, (p8) => formatRawLua(luaSource(p8), request.showLineNumbers));
        }
        function listtokens(request = {}) {
          return listing("listtokens", request, (p8) => listTokens(p8));
        }
        function printast(request = {}) {
          return listing("printast", request, (p8) => printAst(luaSource(p8)));
        }
        async function luafind(request = {}) {
          if (!request.pattern) return {
            ok: false,
            implemented: true,
            command: "luafind",
            results: [],
            errors: [{
              name: "<pattern>",
              code: "USAGE",
              message: "Usage: p8tool luafind <pattern> <filename> [<filename>...]"
            }]
          };
          let expression;
          try {
            expression = request.pattern instanceof RegExp ? request.pattern : new RegExp(request.pattern || "");
          } catch (error) {
            return {
              ok: false,
              implemented: true,
              command: "luafind",
              results: [],
              errors: [{ name: "<pattern>", code: error.name, message: error.message }]
            };
          }
          return mapCartridges("luafind", request, async ({ name, p8 }) => ({
            name,
            text: findLua(p8, expression, { filename: name, listFiles: Boolean(request.listFiles) })
          }));
        }
        function transform(command, request = {}) {
          if (command === "luafmt" && request.indentwidth !== void 0 && !Number.isInteger(request.indentwidth)) {
            return Promise.resolve({ ok: false, implemented: true, command, results: [], errors: [{
              name: "<options>",
              code: "USAGE",
              message: "--indentwidth must be an integer"
            }] });
          }
          return mapCartridges(command, request, async ({ name, bytes, p8, cartridge }) => {
            const luaWriter = command === "luamin" ? "minify" : command === "luafmt" ? "ast-format" : void 0;
            const rewritten = base.parseP8(writeP8(p8, {
              luaWriter,
              minifyOptions: { keepAllNames: Boolean(request.keepAllNames), keepNames: normalizeKeepNames(request) },
              formatOptions: { indentwidth: request.indentwidth ?? 2 }
            }));
            const overwrite = command === "luafmt" && Boolean(request.overwrite) && name.endsWith(".p8");
            const nameOut = request.outputName || (overwrite ? name : outputName(name, request.suffix || "_fmt"));
            const output = nameOut.endsWith(".p8.png") ? await toBytes(cartridge.format === "p8" ? rewritten : cartridge, nameOut, {
              labelPng: name.endsWith(".p8.png") ? bytes : void 0,
              luaBytes: base.encodeP8scii(luaSource(rewritten))
            }) : await toBytes(rewritten, nameOut);
            return {
              name,
              output: { name: nameOut, bytes: output },
              lua: luaSource(rewritten),
              stats: cartridgeStats(rewritten)
            };
          });
        }
        async function sourceFor(domain, file, modules, luaPath) {
          const name = fileName(file), bytes = await fileBytes(file);
          if (domain === "lua" && name.endsWith(".lua")) {
            const files = {};
            for (const module2 of modules || []) files[fileName(module2)] = await fileBytes(module2);
            return { format: "lua", data: new TextDecoder().decode(bytes), filename: name, files, luaPath };
          }
          const loaded = await loadCartridge(file);
          return { format: "p8", data: writeP8(loaded.p8) };
        }
        async function build(request = {}) {
          try {
            if (!request.outputName) throw Object.assign(
              new Error("build: the following arguments are required: filename"),
              { code: "USAGE" }
            );
            const outputNameValue = request.outputName;
            requireCartridgeName(outputNameValue);
            const baseFile = request.base || request.existing;
            const loadedBase = baseFile ? await loadCartridge(baseFile) : null;
            const sources = {};
            for (const domain of BUILD_DOMAINS) {
              if (request.sources?.[domain]) {
                sources[domain] = await sourceFor(domain, request.sources[domain], request.modules, request.luaPath);
              }
            }
            const builtBytes = buildP8({
              existing: loadedBase ? writeP8(loadedBase.p8) : void 0,
              sources,
              empty: request.empty || [],
              luaMinify: request.luaMode === "minify" || Boolean(request.luaMinify),
              luaFormat: request.luaMode === "format" || Boolean(request.luaFormat),
              optimizeTokens: Boolean(request.optimizeTokens),
              keepAllNames: Boolean(request.keepAllNames),
              keepNames: normalizeKeepNames(request),
              indentwidth: 2
            });
            const built = base.parseP8(builtBytes);
            const bytes = outputNameValue.endsWith(".p8.png") ? await toBytes(built, outputNameValue, {
              labelPng: loadedBase?.name.endsWith(".p8.png") ? loadedBase.bytes : void 0
            }) : builtBytes;
            return { ok: true, implemented: true, command: "build", results: [{
              output: { name: outputNameValue, bytes },
              lua: luaSource(built),
              stats: cartridgeStats(built)
            }], errors: [] };
          } catch (error) {
            return {
              ok: false,
              implemented: true,
              command: "build",
              results: [],
              errors: [{ name: request.outputName || "game.p8", code: error.code || error.name, message: error.message }]
            };
          }
        }
        return Object.freeze({
          stats,
          listlua,
          listrawlua,
          listtokens,
          printast,
          luafind,
          writep8: (request) => transform("writep8", request),
          luamin: (request) => transform("luamin", request),
          luafmt: (request) => transform("luafmt", request),
          build
        });
      }
      module.exports = Object.freeze({ createBrowserCommands, statsCsv });
    }
  });

  // ../picotool-js/src/browser.js
  var require_browser = __commonJS({
    "../picotool-js/src/browser.js"(exports, module) {
      module.exports = Object.freeze({
        ...require_picotool(),
        ...require_sections(),
        ...require_p8png(),
        ...require_png_transport(),
        ...require_cartridge_io(),
        ...require_cartridge(),
        ...require_lua_lexer(),
        ...require_lua_ast_model(),
        ...require_lua_ast_walker(),
        ...require_ast_print(),
        ...require_p8writer(),
        ...require_build(),
        ...require_lua_minify(),
        ...require_lua_format_token(),
        ...require_lua_ast_writers(),
        ...require_lua_pure(),
        ...require_stats(),
        ...require_listing(),
        ...require_lua_find(),
        ...require_browser_commands()
      });
    }
  });
  return require_browser();
})();
//# sourceMappingURL=picotool.js.map
