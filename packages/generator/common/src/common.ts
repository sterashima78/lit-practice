import type { CustomElement } from "custom-elements-manifest/schema";
export type { Attribute, CustomElement, Event, Slot } from "custom-elements-manifest/schema";
type Program = string;
type Filename = string;
export type ToProgram = (def: CustomElement) => [Filename, Program];
export type ToEntry = (defs: CustomElement[]) => Program;

export const toInitialCap = (str: string) => str[0] ? `${str[0].toUpperCase()}${str.slice(1)}` : str;

export const kabobToPascalCase = (str: string) =>
  toInitialCap(str).replace(/-[a-z]/g, (m) => m[1] ? m[1].toUpperCase() : m);

export const kabobToOnEvent = (str: string) => `on${kabobToPascalCase(str)}`;

export const isVoidEvent = (type: string): boolean => {
  const match = type.match(/CustomEvent<(.+)>/);
  return !(!!match && !!match[1] && !match[1].match("void"));
};

export const toEventType = (type: string): string => {
  if (isVoidEvent(type)) return "";
  const match = type.match(/CustomEvent<(.+)>/);
  if (!match || !match[1]) return "";
  return `${match[1]}`;
};
