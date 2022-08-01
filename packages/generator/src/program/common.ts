import type { CustomElement } from "custom-elements-manifest/schema";
type Program = string;
type Filename = string;
export type ToProgram = (def: CustomElement) => [Filename, Program];
export type ToEntry = (defs: CustomElement[]) => Program;

/**
 * Converts string to initial cap.
 */
export const toInitialCap = (str: string) =>
  // @ts-expect-error
  str ? `${str[0].toUpperCase()}${str.slice(1)}` : str;

/**
 * Converts kabob-case string to PascalCase.
 */
export const kabobToPascalCase = (str: string) =>
  // @ts-expect-error
  toInitialCap(str).replace(/-[a-z]/g, (m) => m[1].toUpperCase());

/**
 * Converts kabob-case event name to an "on" event: `onEventName`.
 */
export const kabobToOnEvent = (str: string) => `on${kabobToPascalCase(str)}`;
