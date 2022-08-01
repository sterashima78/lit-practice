import { toEntry as toReactEntry, toProgram as toReactProgram } from "@sterashima78/lit-practice-generator-react";
import {
  toEntryVue26,
  toEntryVue27,
  toEntryVue3,
  toProgramVue26,
  toProgramVue27,
  toProgramVue3,
} from "@sterashima78/lit-practice-generator-vue";
import { program } from "commander";
import type { CustomElement, Module, Package } from "custom-elements-manifest/schema";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
program.option("-f, --file <string>", "input file");
program.option("-t, --type <string>", "react | vue | vue27 | vue26");
program.option("-o, --out-dir <string>", "output dir");
program.parse();
const options = program.opts();
type Option = typeof options;

const readManifest = (path: string): Promise<Package> =>
  readFile(join(cwd(), path)).then(b => b.toString()).then(JSON.parse) as Promise<Package>;
const toCustomElement = (m: Module): CustomElement[] =>
  // @ts-expect-error 元の型付けに誤りがある
  m.declarations ? m.declarations.filter((a): a is CustomElement => "customElement" in a && a.customElement) : [];

const createProgram = (type: string) => {
  switch (type) {
    case "vue":
      return toProgramVue3;
    case "vue26":
      return toProgramVue26;
    case "vue27":
      return toProgramVue27;
    default:
      return toReactProgram;
  }
};

const createEntry = (type: string) => {
  switch (type) {
    case "vue":
      return toEntryVue3;
    case "vue26":
      return toEntryVue26;
    case "vue27":
      return toEntryVue27;
    default:
      return toReactEntry;
  }
};

const main = async (opt: Option) => {
  const manifest = await readManifest(opt["file"]);
  const customElements = manifest.modules.flatMap(toCustomElement);
  const outDir = join(cwd(), opt["outDir"] || "./generated");
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir);
  for (const [file, program] of customElements.map(createProgram(opt["type"]))) {
    const filepath = join(outDir, file);
    console.log(filepath);
    await writeFile(filepath, program);
  }
  await writeFile(join(outDir, "index.ts"), (createEntry(opt["type"]))(customElements));
};

main(options);
