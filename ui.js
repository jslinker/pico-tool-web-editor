(function startPicoToolUi() {
  "use strict";

  const api = window.PicoToolWeb;
  const state = {
    selected: new Set(), selectionAnchor: null, cartridges: [], active: -1, supportFiles: [], modules: [], buildSources: {}, outputs: [],
  };

  const byId = (id) => document.getElementById(id);
  let viewedFile = null;
  const inspectionFile = () => byId("lua-dialog").open && viewedFile ? viewedFile : current()?.working;
  const current = () => state.cartridges[state.active] || null;
  const selectedCartridges = () => workingFiles().filter((file) => state.selected.has(file.name));
  const workingFiles = () => state.cartridges.map((item) => item.working);
  const selectedValue = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value;
  const sizeText = (size) => size < 1024 ? `${size} B` : `${(size / 1024).toFixed(1)} KB`;

  function errorText(response) {
    return (response?.errors || []).map((error) => `${error.name}: ${error.message}`).join("\n") || "The operation failed.";
  }

  function announce(message, isError) {
    const target = byId("workspace-status");
    target.textContent = message;
    target.style.color = isError ? "var(--pink)" : "";
  }

  function listingFilename(file) {
    const basename = String(file?.name || "").split(/[\\/]/).pop()
      .replace(/[<>:"|?*\x00-\x1f]/g, "-").trim();
    const stem = basename.replace(/(?:\.p8(?:\.png)?|\.lua|\.txt)$/i, "")
      .replace(/^[. ]+|[. ]+$/g, "") || "cartridge";
    if (/\.(?:lua|txt)$/i.test(basename)) return `${stem}${/\.lua$/i.test(basename) ? ".lua" : ".txt"}`;
    return `${stem}.lua`;
  }

  function download(name, data, type = "application/octet-stream") {
    const blob = data instanceof Blob ? data : new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = String(name || "").trim() || "picotool-export.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function storedFile(file, name) {
    return { name: name || file.name, bytes: new Uint8Array(await file.arrayBuffer()) };
  }

  function renderFiles() {
    const list = byId("file-list");
    list.replaceChildren();
    const entries = [
      ...state.cartridges.map((item) => ({ file: item.working, kind: "P8" })),
      ...state.modules.map((file) => ({ file, kind: "LUA" })),
      ...state.supportFiles.map((file) => ({ file, kind: "TXT" })),
    ];
    entries.forEach(({ file, kind }, entryIndex) => {
      const row = document.createElement("div");
      row.className = "file-row";
      const index = state.cartridges.findIndex((item) => item.working === file);
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-pressed", String(state.selected.has(file.name)));
      button.className = `file-item${state.selected.has(file.name) ? " active" : ""}`;
      button.innerHTML = '<span class="cart-icon"></span><span style="min-width:0"><strong></strong><small></small></span>';
      button.querySelector(".cart-icon").textContent = kind;
      button.querySelector("strong").textContent = file.name;
      button.title = file.name;
      button.querySelector("small").textContent = `${sizeText(file.bytes.length)} · ${kind === "P8" ? "Cartridge" : kind === "LUA" ? "Lua source" : "Name list"}`;
      button.addEventListener("click", (event = {}) => {
        const additive = event.metaKey || event.ctrlKey;
        const anchor = entries.findIndex((entry) => entry.file.name === state.selectionAnchor);
        if (event.shiftKey && anchor >= 0) {
          if (!additive) state.selected.clear();
          for (const entry of entries.slice(Math.min(anchor, entryIndex), Math.max(anchor, entryIndex) + 1)) {
            state.selected.add(entry.file.name);
          }
        } else {
          if (!additive) state.selected.clear();
          if (additive && state.selected.has(file.name)) state.selected.delete(file.name);
          else state.selected.add(file.name);
          state.selectionAnchor = file.name;
        }
        state.active = kind === "P8" && state.selected.has(file.name) ? index
          : state.cartridges.findIndex((item) => state.selected.has(item.working.name));
        renderAll();
        list.children[entryIndex]?.querySelector(".file-item").focus();
      });
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "file-icon file-remove";
      remove.title = `Remove ${file.name}`;
      remove.textContent = "×";
      remove.setAttribute("aria-label", `Remove ${file.name}`);
      remove.addEventListener("click", () => {
        const active = current();
        state.selected.delete(file.name);
        if (state.selectionAnchor === file.name) state.selectionAnchor = null;
        state.cartridges = state.cartridges.filter((item) => item.working !== file);
        state.modules = state.modules.filter((item) => item !== file);
        state.supportFiles = state.supportFiles.filter((item) => item !== file);
        state.active = active?.working === file ? state.cartridges.findIndex((item) => state.selected.has(item.working.name)) : state.cartridges.indexOf(active);
        renderAll();
        const next = list.querySelectorAll(".file-remove")[Math.min(entryIndex, list.children.length - 1)];
        (next || byId("add-files")).focus();
      });
      const view = document.createElement("button");
      view.type = "button";
      view.className = "file-icon file-view";
      view.title = `View ${file.name}`;
      view.setAttribute("aria-label", `View ${file.name}`);
      view.setAttribute("aria-haspopup", "dialog");
      view.setAttribute("aria-controls", "lua-dialog");
      view.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
      view.addEventListener("click", () => {
        viewedFile = file;
        byId("lua-filename").textContent = file.name;
        byId("lua-dialog").showModal();
        refreshInspection().catch((error) => announce(error.message, true));
      });
      row.append(button, remove, view);
      list.append(row);
    });
    const active = current();
    byId("active-file-name").textContent = active?.working.name || "No cartridge selected";
    byId("copy-state").textContent = "Local workspace";
  }

  function renderExports() {
    const target = byId("export-list");
    target.replaceChildren();
    const entries = state.outputs;
    if (!entries.length) target.innerHTML = '<p class="card-copy">Nothing to export yet.</p>';
    for (const file of entries) {
      const row = document.createElement("div");
      row.className = "batch-item";
      row.innerHTML = '<i class="status-ok"></i><span></span><small></small><button type="button">Download</button>';
      row.querySelector("span").textContent = file.name;
      row.querySelector("small").textContent = sizeText(file.bytes.length);
      row.querySelector("button").addEventListener("click", () => download(file.name, file.bytes));
      target.append(row);
    }
  }

  function renderSupportFiles() {
    for (const id of ["transform-name-list", "build-name-list"]) {
      const select = byId(id);
      const value = select.value;
      select.innerHTML = '<option value="">No name list</option>';
      state.supportFiles.forEach((file, index) => {
        const option = document.createElement("option");
        option.value = file.name;
        option.textContent = file.name;
        select.append(option);
      });
      select.value = state.supportFiles.some((file) => file.name === value) ? value : "";
    }
    byId("module-tree").textContent = state.modules.length
      ? state.modules.map((file) => file.name).join("\n") : "No Lua modules added.";
    const entry = byId("build-entry-module");
    if (entry) {
      const value = entry.value;
      entry.innerHTML = '<option value="">Use Lua section source</option>';
      state.modules.filter((file) => file.name.endsWith(".lua")).forEach((file) => {
        const option = document.createElement("option");
        option.value = file.name;
        option.textContent = file.name;
        entry.append(option);
      });
      entry.value = state.modules.some((file) => file.name === value) ? value : "";
    }
  }

  function setBusy(section, busy) {
    byId(section === "build" ? "build" : `${section}-section`).setAttribute("aria-busy", String(busy));
  }

  let inspectionRevision = 0;
  async function refreshInspection() {
    const revision = ++inspectionRevision;
    byId("copy-lua").disabled = true;
    byId("download-lua").disabled = true;
    byId("listing-share-status").textContent = "";
    byId("listing-share").open = false;
    const file = inspectionFile();
    const active = file ? { working: file } : null;
    const isText = file && !/\.p8(?:\.png)?$/.test(file.name);
    byId("lua-dialog-title").textContent = "File viewer";
    byId("lua-options").hidden = Boolean(isText);
    byId("structure-section").hidden = Boolean(isText);
    byId("lua-viewer-heading").textContent = isText ? "File contents" : "Lua viewer";
    if (isText) {
      byId("lua-preview").textContent = new TextDecoder().decode(file.bytes);
      byId("copy-lua").disabled = false;
      byId("download-lua").disabled = false;
      byId("structure-preview").textContent = "";
      setBusy("lua", false);
      setBusy("structure", false);
      return;
    }
    const viewCommand = selectedValue("lua-view") === "raw" ? "listrawlua" : "listlua";
    const structureCommand = selectedValue("structure") === "ast" ? "printast" : "listtokens";
    async function refresh(section, target, command, options = {}) {
      byId(target).textContent = "";
      setBusy(section, Boolean(active));
      if (!active) { byId(target).textContent = "Select a cartridge to view this listing."; return; }
      try {
        const response = await api.cli[command]({ cartridges: [active.working], ...options });
        if (revision !== inspectionRevision) return;
        byId(target).textContent = response.ok ? response.results[0].text : errorText(response);
        if (section === "lua") {
          byId("copy-lua").disabled = !response.ok;
          byId("download-lua").disabled = !response.ok;
        }
      } catch (error) {
        if (revision === inspectionRevision) byId(target).textContent = error.message;
      } finally {
        if (revision === inspectionRevision) setBusy(section, false);
      }
    }
    await Promise.all([
      refresh("lua", "lua-preview", viewCommand, { showLineNumbers: byId("lua-line-numbers").checked,
        pureLua: byId("lua-pure").checked }),
      refresh("structure", "structure-preview", structureCommand),
    ]);
  }

  let statsRevision = 0;
  async function refreshStats() {
    const revision = ++statsRevision;
    const files = selectedCartridges();
    const skipped = state.selected.size - files.length;
    const summary = byId("stats-summary");
    const rows = byId("stats-rows");
    rows.replaceChildren();
    setBusy("stats", Boolean(files.length));
    byId("download-csv").disabled = !files.length;
    const scope = files.length ? `Showing ${files.length} selected cartridge${files.length === 1 ? "" : "s"}: ${files.map((file) => file.name).join(", ")}.`
      : "Select cartridges in the file list to show statistics.";
    const note = skipped ? ` ${skipped} selected Lua/text file${skipped === 1 ? " is" : "s are"} excluded; Stats supports cartridges only.` : "";
    summary.textContent = scope + note;
    if (!files.length) return;
    summary.textContent = "Calculating… " + scope + note;
    try {
      // Cache each cartridge independently, so changing a multi-selection reuses
      // calculations for files that were already inspected.
      const responses = await Promise.all(files.map((file) => api.cli.stats({ cartridges: [file] })));
      const response = { results: responses.flatMap((item) => item.results),
        errors: responses.flatMap((item) => item.errors) };
      if (revision !== statsRevision) return;
      for (const result of response.results) {
        const row = document.createElement("tr");
        for (const value of [result.name, result.title || "—", result.byline || "—", result.lineCount, result.characterCount, result.tokenCount, result.compressedSize, `v${result.version}`]) {
          const cell = document.createElement("td");
          cell.textContent = typeof value === "number" ? value.toLocaleString() : value;
          row.append(cell);
        }
        rows.append(row);
      }
      summary.textContent = scope + note + (response.errors.length ? ` Unable to calculate: ${errorText(response)}` : "");
    } catch (error) {
      if (revision === statsRevision) summary.textContent = scope + note + ` ${error.message}`;
    } finally {
      if (revision === statsRevision) setBusy("stats", false);
    }
  }

  function renderAll() {
    renderFiles();
    renderExports();
    renderSupportFiles();
    refreshStats();
    refreshInspection().catch((error) => announce(error.message, true));
  }

  async function addFiles(files, nameFor = (file) => file.name) {
    const rejected = [];
    for (const file of files) {
      const name = nameFor(file);
      if (!/\.(?:p8|p8\.png|lua|txt)$/.test(name)) { rejected.push(name); continue; }
      const stored = await storedFile(file, name);
      state.selected.add(name);
      if (name.endsWith(".lua") || name.endsWith(".txt")) {
        const collection = name.endsWith(".lua") ? state.modules : state.supportFiles;
        const existing = collection.findIndex((item) => item.name === name);
        if (existing >= 0) collection[existing] = stored;
        else collection.push(stored);
      } else {
        const existing = state.cartridges.findIndex((item) => item.working.name === name);
        const item = { working: stored };
        if (existing >= 0) state.cartridges[existing] = item;
        else state.cartridges.push(item);
      }
    }
    if (state.active < 0) state.active = state.cartridges.findIndex((item) => state.selected.has(item.working.name));
    renderFiles();
    renderSupportFiles();
    await Promise.all([refreshStats(), refreshInspection()]);
    if (rejected.length) announce(`Not added: ${rejected.join(", ")}. Supported types: .p8, .p8.png, .lua, .txt (lowercase extensions).`, true);
  }

  async function statsFor(files = selectedCartridges()) {
    return api.cli.stats({ cartridges: files, csv: true });
  }

  async function runSearch() {
    const response = await api.cli.luafind({ cartridges: workingFiles(), pattern: byId("search-pattern").value,
      listFiles: byId("search-list-files").checked });
    const target = byId("search-results");
    target.replaceChildren();
    byId("search-status").textContent = `${response.results.length} cartridge(s) searched${response.errors.length ? ` · ${response.errors.length} failed: ${errorText(response)}` : ""}`;
    byId("search-status").style.color = response.errors.length ? "var(--pink)" : "";
    for (const result of response.results) {
      for (const line of result.text.trim().split("\n").filter(Boolean)) {
        const match = /^(.+?):(\d+):(.*)$/.exec(line);
        const row = document.createElement("div");
        row.className = "result";
        row.innerHTML = "<span></span><span></span><span></span>";
        row.children[0].textContent = match?.[1] || line;
        row.children[1].textContent = match?.[2] || "";
        row.children[2].textContent = match?.[3] || "";
        target.append(row);
      }
    }
    if (!response.results.length && response.errors.length) announce(errorText(response), true);
  }

  async function transformRequest() {
    const active = current();
    if (!active) return null;
    const command = selectedValue("transform");
    const supportIndex = byId("transform-name-list").value;
    const keepNamesFile = supportIndex === "" ? undefined : state.supportFiles.find((file) => file.name === supportIndex);
    const cartridges = byId("transform-all").checked ? workingFiles() : [active.working];
    const options = { cartridges };
    if (command === "luamin") {
      options.keepAllNames = byId("transform-keep-all").checked;
      options.keepNamesBytes = keepNamesFile?.bytes;
    }
    if (command === "luafmt") {
      options.indentwidth = Number(byId("transform-indent").value);
      options.overwrite = byId("transform-overwrite").checked;
    }
    return api.cli[command](options);
  }

  async function runTransform() {
    const response = await transformRequest();
    const target = byId("transform-results");
    target.replaceChildren();
    if (!response) return;
    for (const result of response.results) {
      state.outputs = state.outputs.filter((file) => file.name !== result.output.name);
      state.outputs.push(result.output);
      const row = document.createElement("div");
      row.className = "batch-item";
      row.innerHTML = '<i class="status-ok"></i><span></span><small>Ready</small>';
      row.querySelector("span").textContent = `${result.name} → ${result.output.name}`;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Download";
      button.addEventListener("click", () => download(result.output.name, result.output.bytes));
      row.append(button);
      target.append(row);
    }
    for (const error of response.errors) {
      const row = document.createElement("div");
      row.className = "batch-item";
      row.innerHTML = '<i class="status-error"></i><span></span><small style="color:var(--pink)"></small>';
      row.querySelector("span").textContent = error.name;
      row.querySelector("small").textContent = error.message;
      target.append(row);
    }
    if (response.errors.length) announce(`${response.results.length} succeeded; ${errorText(response)}`, true);
    renderAll();
  }

  async function previewBuild() {
    const sources = {};
    for (const [domain, file] of Object.entries(state.buildSources)) if (file) sources[domain] = file;
    const empty = [...byId("build-sections").querySelectorAll(".section-row[data-cleared='true']")]
      .map((row) => row.dataset.domain);
    const supportIndex = byId("build-name-list").value;
    const keepNamesFile = supportIndex === "" ? undefined : state.supportFiles.find((file) => file.name === supportIndex);
    const selectedEntry = byId("build-entry-module").value;
    if (selectedEntry) {
      const file = state.modules.find((module) => module.name === selectedEntry);
      if (file) sources.lua = file;
    }
    const stem = byId("build-output-name").value.replace(/\.(?:p8(?:\.png)?)$/i, "") || "game_build";
    const outputName = `${stem}${byId("build-output-format").value}`;
    const base = [...state.outputs].reverse().find((file) => file.name === outputName)
      || state.cartridges.map((item) => item.working).find((file) => file.name === outputName);
    const response = await api.cli.build({ base, sources, empty, modules: state.modules,
      luaPath: byId("lua-path").value, luaMode: selectedValue("build-lua"),
      optimizeTokens: byId("build-optimize-tokens").checked,
      keepAllNames: byId("build-keep-all").checked,
      keepNamesBytes: keepNamesFile?.bytes,
      outputName });
    byId("build-status").textContent = response.ok
      ? `Ready · ${response.results[0].stats.tokenCount} tokens · ${sizeText(response.results[0].output.bytes.length)}`
      : errorText(response);
    byId("build-status").style.color = response.ok ? "var(--green)" : "var(--pink)";
    if (response.ok) {
      state.outputs = state.outputs.filter((file) => file.name !== response.results[0].output.name);
      state.outputs.push(response.results[0].output);
      renderExports();
    } else {
      renderExports();
    }
  }

  byId("close-lua-dialog").addEventListener("click", () => byId("lua-dialog").close());
  byId("lua-dialog").addEventListener("close", () => { viewedFile = null; });

  byId("add-files").addEventListener("click", () => byId("file-input").click());
  byId("file-help-button").addEventListener("click", () => byId("file-help").showModal());
  byId("close-file-help").addEventListener("click", () => byId("file-help").close());
  byId("file-input").addEventListener("change", async (event) => {
    try { await addFiles([...event.target.files]); }
    catch (error) { announce(error.message, true); }
    finally { event.target.value = ""; }
  });
  document.querySelector(".workspace").addEventListener("dragover", (event) => event.preventDefault());
  document.querySelector(".workspace").addEventListener("drop", async (event) => {
    event.preventDefault();
    try { await addFiles([...event.dataTransfer.files]); }
    catch (error) { announce(error.message, true); }
  });
  byId("build-select-modules").addEventListener("click", () => byId("module-folder-input").click());
  byId("module-folder-input").addEventListener("change", async (event) => {
    const files = [...event.target.files].filter((file) => file.name.endsWith(".lua"));
    try {
      await addFiles(files, (file) => {
        const path = file.webkitRelativePath || file.name;
        return path.includes("/") ? path.slice(path.indexOf("/") + 1) : path;
      });
    } catch (error) { announce(error.message, true); }
    finally { event.target.value = ""; }
  });
  document.querySelectorAll('input[name="lua-view"], #lua-line-numbers, #lua-pure, input[name="structure"]').forEach((input) => input.addEventListener("change", () => { updateListingOptions(); refreshInspection(); }));
  function updateListingOptions() {
    byId("lua-pure").disabled = selectedValue("lua-view") === "raw";
  }
  updateListingOptions();
  document.querySelectorAll('input[name="transform"], #transform-keep-all, #transform-overwrite, #transform-indent, #transform-name-list').forEach((input) => input.addEventListener("change", updateTransformOptions));
  function updateTransformOptions() {
    const command = selectedValue("transform");
    document.querySelectorAll(".minify-option").forEach((element) => { element.hidden = command !== "luamin"; });
    document.querySelectorAll(".format-option").forEach((element) => { element.hidden = command !== "luafmt"; });
  }
  updateTransformOptions();
  const runningSections = new Set();
  function runWithLoading(section, action) {
    return async () => {
      if (runningSections.has(section)) return;
      runningSections.add(section);
      setBusy(section, true);
      try { await action(); }
      catch (error) { announce(error.message, true); }
      finally { runningSections.delete(section); setBusy(section, false); }
    };
  }
  byId("run-search").addEventListener("click", runWithLoading("search", runSearch));
  byId("run-transform").addEventListener("click", runWithLoading("transform", runTransform));
  byId("download-csv").addEventListener("click", async () => { const response = await statsFor(); if (response.results.length) download("picotool-stats.csv", response.csv, "text/csv"); if (response.errors.length) announce(errorText(response), true); });
  byId("copy-lua").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(byId("lua-preview").textContent);
      byId("listing-share-status").textContent = "Copied to clipboard.";
    } catch (error) {
      byId("listing-share-status").textContent = "Could not copy. Select the text to copy manually, or save to disk.";
    } finally { byId("listing-share").open = false; }
  });
  byId("download-lua").addEventListener("click", () => {
    const file = inspectionFile(); if (!file) return;
    download(listingFilename(file), byId("lua-preview").textContent, "text/plain");
    byId("listing-share").open = false;
    byId("listing-share-status").textContent = "Download started.";
  });
  byId("listing-share").addEventListener("keydown", (event) => {
    if (event.key === "Escape" && byId("listing-share").open) {
      event.preventDefault();
      event.stopPropagation();
      byId("listing-share").open = false;
      byId("listing-share").querySelector("summary").focus();
    }
  });
  byId("export-lua").addEventListener("click", async () => {
    const file = inspectionFile(); if (!file) return;
    const active = { working: file };
    const command = selectedValue("lua-view") === "raw" ? "listrawlua" : "listlua";
    const response = await api.cli[command]({ cartridges: [active.working], showLineNumbers: byId("lua-line-numbers").checked,
      pureLua: command === "listlua" && byId("lua-pure").checked });
    if (response.ok) download(listingFilename(active.working), response.results[0].text, "text/plain");
  });
  byId("export-stats").addEventListener("click", () => byId("download-csv").click());
  byId("download-all").addEventListener("click", () => {
    for (const file of state.outputs) download(file.name, file.bytes);
  });
  byId("preview-build").addEventListener("click", runWithLoading("build", previewBuild));
  byId("build-sections").querySelectorAll(".section-row").forEach((row) => {
    const input = row.querySelector('input[type="file"]');
    const source = row.querySelector(".source-slot");
    const clear = row.querySelector(".clear-control");
    source.addEventListener("click", () => input.click());
    input.addEventListener("change", async () => {
      if (!input.files[0]) return;
      state.buildSources[row.dataset.domain] = await storedFile(input.files[0]);
      row.dataset.cleared = "false"; source.textContent = input.files[0].name; source.classList.add("ready"); clear.textContent = "Clear";
    });
    clear.addEventListener("click", () => {
      const cleared = row.dataset.cleared !== "true";
      row.dataset.cleared = String(cleared);
      if (cleared) { delete state.buildSources[row.dataset.domain]; source.textContent = "Section will be cleared"; source.classList.remove("ready"); clear.textContent = "Undo"; }
      else { source.textContent = row.dataset.domain === "lua" ? "Choose .lua or cartridge…" : "Retain from matching output"; clear.textContent = "Clear"; }
    });
  });

  renderAll();
})();
