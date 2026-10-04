import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = new URL("../dist/", import.meta.url);
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(new URL("vendor/", outputDirectory), { recursive: true });

for (const filename of ["index.html", "app.js", "ui.js", "README.md", "ENGINE-RECOMMENDATIONS.md", "LICENSE"]) {
  await cp(new URL(`../${filename}`, import.meta.url), new URL(filename, outputDirectory));
}
for (const filename of ["picotool.js", "picotool.js.map"]) {
  await cp(new URL(`../vendor/${filename}`, import.meta.url), new URL(`vendor/${filename}`, outputDirectory));
}

await cp(new URL("../assets/", import.meta.url), new URL("assets/", outputDirectory), { recursive: true });

console.log("Prepared dist/ for GitHub Pages");
