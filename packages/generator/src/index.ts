import { program } from "commander";
import type { CustomElement, Module, Package } from "custom-elements-manifest/schema";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import {
  toReactEntry,
  toReactProgram,
  toVue26Entry,
  toVue26Program,
  toVueEntry,
  toVueProgram,
} from "./program/index.js";
program.option("-f, --file <string>", "input file");
program.option("-t, --type <string>", "react | vue | vue26");
program.option("-o, --out-dir <string>", "output dir");
program.parse();
const options = program.opts();
type Option = typeof options;

const readManifest = (path: string): Promise<Package> =>
  readFile(join(cwd(), path)).then(b => b.toString()).then(JSON.parse) as Promise<Package>;
const toCustomElement = (m: Module): CustomElement[] =>
  // @ts-expect-error 元の型付けに誤りがある
  m.declarations ? m.declarations.filter((a): a is CustomElement => "customElement" in a && a.customElement) : [];

const toProgram = (type: string) => {
  switch (type) {
    case "vue":
      return toVueProgram;
    case "vue26":
      return toVue26Program;
    default:
      return toReactProgram;
  }
};

const toEntry = (type: string) => {
  switch (type) {
    case "vue":
      return toVueEntry;
    case "vue26":
      return toVue26Entry;
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
  for (const [file, program] of customElements.map(toProgram(opt["type"]))) {
    const filepath = join(outDir, file);
    console.log(filepath);
    await writeFile(filepath, program);
  }
  await writeFile(join(outDir, "index.ts"), (toEntry(opt["type"]))(customElements));
};

main(options);
