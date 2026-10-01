(function startPicoToolUi() {
  "use strict";

  const api = window.PicoToolWeb;
  const state = {
    cartridges: [], active: -1, supportFiles: [], modules: [], buildSources: {}, outputs: [],
  };

  const byId = (id) => document.getElementById(id);
  const current = () => state.cartridges[state.active] || null;
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

  function download(name, data, type = "application/octet-stream") {
    const blob = data instanceof Blob ? data : new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function storedFile(file, name) {
    return { name: name || file.name, bytes: new Uint8Array(await file.arrayBuffer()) };
  }

  function renderFiles() {
    const list = byId("file-list");
    list.replaceChildren();
    if (!state.cartridges.length) list.innerHTML = '<p class="drop-note">Choose cartridges to begin.</p>';
    state.cartridges.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `file-item${index === state.active ? " active" : ""}`;
      button.innerHTML = '<span class="cart-icon">P8</span><span><strong></strong><small></small></span>';
      button.querySelector("strong").textContent = item.working.name;
      button.querySelector("small").textContent = sizeText(item.working.bytes.length);
      button.addEventListener("click", () => { state.active = index; renderAll(); });
      list.append(button);
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
        option.value = String(index);
        option.textContent = file.name;
        select.append(option);
      });
      select.value = value;
    }
    byId("module-tree").textContent = state.modules.length
      ? state.modules.map((file) => file.name).join("\n") : "No module folder selected.";
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
      entry.value = value;
    }
  }

  async function refreshInspection() {
    const active = current();
    if (!active) return;
    const file = active.working;
    const viewCommand = selectedValue("lua-view") === "raw" ? "listrawlua" : "listlua";
    const structureCommand = selectedValue("structure") === "ast" ? "printast" : "listtokens";
    const [stats, view, structure] = await Promise.all([
      api.cli.stats({ cartridges: [file] }),
      api.cli[viewCommand]({ cartridges: [file], showLineNumbers: byId("lua-line-numbers").checked,
        pureLua: byId("lua-pure").checked }),
      api.cli[structureCommand]({ cartridges: [file] }),
    ]);
    if (!stats.ok || !view.ok || !structure.ok) {
      announce(errorText(!stats.ok ? stats : !view.ok ? view : structure), true);
      return;
    }
    const row = stats.results[0];
    byId("stats-summary").textContent = `${row.title || file.name}${row.byline ? ` · ${row.byline}` : ""} · code v${row.version}`;
    const values = [row.lineCount, row.characterCount, row.tokenCount, row.compressedSize, state.cartridges.length, `v${row.version}`];
    byId("stat-grid").querySelectorAll("strong").forEach((element, index) => { element.textContent = values[index].toLocaleString?.() || values[index]; });
    byId("lua-preview").textContent = view.results[0].text;
    byId("structure-preview").textContent = structure.results[0].text;
    announce(`${state.cartridges.length} cartridge${state.cartridges.length === 1 ? "" : "s"} · processing stays on this device`);
  }

  function renderAll() {
    renderFiles();
    renderExports();
    renderSupportFiles();
    refreshInspection().catch((error) => announce(error.message, true));
  }

  async function addCartridges(files) {
    for (const file of files) {
      if (!file.name.endsWith(".p8") && !file.name.endsWith(".p8.png")) continue;
      const stored = await storedFile(file);
      const existing = state.cartridges.findIndex((item) => item.working.name === stored.name);
      const item = { working: stored };
      if (existing >= 0) state.cartridges[existing] = item;
      else state.cartridges.push(item);
    }
    if (state.active < 0 && state.cartridges.length) state.active = 0;
    renderAll();
  }

  async function statsFor(files = workingFiles()) {
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
    const keepNamesFile = supportIndex === "" ? undefined : state.supportFiles[Number(supportIndex)];
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
    const keepNamesFile = supportIndex === "" ? undefined : state.supportFiles[Number(supportIndex)];
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

  byId("select-cartridges").addEventListener("click", () => byId("cartridge-input").click());
  byId("cartridge-input").addEventListener("change", (event) => addCartridges(event.target.files));
  document.querySelector(".workspace").addEventListener("dragover", (event) => event.preventDefault());
  document.querySelector(".workspace").addEventListener("drop", (event) => { event.preventDefault(); addCartridges(event.dataTransfer.files); });
  byId("add-support-file").addEventListener("click", () => byId("support-file-input").click());
  byId("support-file-input").addEventListener("change", async (event) => {
    for (const file of event.target.files) state.supportFiles.push({ name: file.name, text: await file.text(), bytes: new Uint8Array(await file.arrayBuffer()) });
    renderSupportFiles();
  });
  for (const id of ["select-module-folder", "build-select-modules"]) byId(id).addEventListener("click", () => byId("module-folder-input").click());
  byId("module-folder-input").addEventListener("change", async (event) => {
    const files = [...event.target.files];
    // webkitdirectory paths include the selected folder name. Remove that
    // common root so paths match the CLI's project-relative lua-path patterns.
    const relativePaths = files.map((file) => file.webkitRelativePath || "");
    const root = relativePaths.map((relativePath) => relativePath.split("/")[0]);
    const hasDirectoryRoot = relativePaths.length > 0 && relativePaths.every((relativePath) => relativePath.includes("/"));
    const commonRoot = hasDirectoryRoot && root.every((part) => part === root[0]) ? `${root[0]}/` : "";
    state.modules = await Promise.all(files.map((file) => storedFile(file,
      (file.webkitRelativePath || file.name).slice(commonRoot.length))));
    renderSupportFiles();
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
  byId("run-search").addEventListener("click", runSearch);
  byId("run-transform").addEventListener("click", runTransform);
  byId("download-csv").addEventListener("click", async () => { const response = await statsFor(); if (response.results.length) download("picotool-stats.csv", response.csv, "text/csv"); if (response.errors.length) announce(errorText(response), true); });
  for (const id of ["download-lua", "export-lua"]) byId(id).addEventListener("click", async () => {
    const active = current(); if (!active) return;
    const command = selectedValue("lua-view") === "raw" ? "listrawlua" : "listlua";
    const response = await api.cli[command]({ cartridges: [active.working], showLineNumbers: byId("lua-line-numbers").checked,
      pureLua: command === "listlua" && byId("lua-pure").checked });
    if (response.ok) download(active.working.name.replace(/\.p8(?:\.png)?$/i, ".lua.txt"), response.results[0].text, "text/plain");
  });
  byId("export-stats").addEventListener("click", () => byId("download-csv").click());
  byId("download-all").addEventListener("click", () => {
    for (const file of state.outputs) download(file.name, file.bytes);
  });
  byId("preview-build").addEventListener("click", previewBuild);
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
