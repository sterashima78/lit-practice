import type { Attribute, Event, Slot, ToEntry, ToProgram } from "@sterashima78/lit-practice-generator-common";
import { isVoidEvent, kabobToOnEvent, toEventType } from "@sterashima78/lit-practice-generator-common";

const toAttr = (attr: Attribute) =>
  `${attr.fieldName}${attr.default === undefined ? "?" : ""}: ${attr.type?.text || "string"}`;
const toEvent = (event: Event) =>
  `${kabobToOnEvent(event.name)}?: (${
    isVoidEvent(event.type.text) ? "" : `e: ${toEventType(event.type.text)}`
  }) => void`;
const toPropTypes = (name: string, events: Event[], attrs: Attribute[], slots: Slot[]) => {
  if (slots.length === 0 && events.length === 0 && attrs.length === 0) return "";
  return /*javascript*/ `
    export type ${name}Props = {
        ${slots.length >= 1 ? "children: ReactNode," : ""}
        ${attrs.map(toAttr).concat(events.map(toEvent)).join(",\n")}
    }
`;
};

const addEventListener = (e: Event) => {
  if (isVoidEvent(e.type.text)) {
    return `if(!!${kabobToOnEvent(e.name)}) ref.current?.addEventListener("${e.name}", ${kabobToOnEvent(e.name)})`;
  }
  return /*javascript*/ `
  let ${kabobToOnEvent(e.name)}Handler: (e: ${e.type.text}) => void 
  if(!!${kabobToOnEvent(e.name)}) {
    ${kabobToOnEvent(e.name)}Handler = (e: ${e.type.text}) => ${kabobToOnEvent(e.name)}(e.detail)
    // @ts-expect-error カスタムイベント定義が存在しない
    ref.current?.addEventListener("${e.name}", ${kabobToOnEvent(e.name)}Handler)
  }
  `;
};

const removeEventListener = (e: Event) => {
  if (isVoidEvent(e.type.text)) {
    return `if(!!${kabobToOnEvent(e.name)}) ref.current?.removeEventListener("${e.name}", ${kabobToOnEvent(e.name)})`;
  }
  return `
  // @ts-expect-error カスタムイベント定義が存在しない
  if(!!${kabobToOnEvent(e.name)}Handler) ref.current?.removeEventListener("${e.name}", ${
    kabobToOnEvent(e.name)
  }Handler)`;
};

const toEventEffect = (event: Event) => /*javascript*/ `
  // for ${event.name} event
  useEffect(()=> {
    ${addEventListener(event)}
    return ()=> {
      ${removeEventListener(event)}
    }
  }, [${kabobToOnEvent(event.name)}])
`;

const toPropEffect = (attr: Attribute) => /*javascript*/ `
  // for ${attr.name} attribute
  useEffect(()=> {
    if(ref.current)
      ref.current.${attr.fieldName} = ${attr.fieldName}
  }, [${attr.fieldName}])
`;

const toProps = (events: Event[], attrs: Attribute[], slots: Slot[]) => {
  if (slots.length === 0 && events.length === 0 && attrs.length === 0) return "";
  return /*javascript*/ `
    const {
        ${
    ([] as string[]).concat(
      // Children
      slots.length >= 1 ? ["children"] : [],
      // Event Handler
      events.map(event => kabobToOnEvent(event.name)),
      // Attributes
      attrs.map(a => `${a.fieldName}`),
    ).join(",\n")
  }
    } = props
`;
};

export const toProgram: ToProgram = (p) => {
  const code = /*javascript*/ `
    import { ReactNode,${
    (p.events && p.events.length > 0) || (p.attributes && p.attributes?.length > 0)
      ? "useEffect,"
      : ""
  } useRef } from "react"
    import "@sterashima78/lit-practice-wc/${p.tagName}.js"
    import type * as Types from "@sterashima78/lit-practice-wc"
    ${toPropTypes(p.name, p.events || [], p.attributes || [], p.slots || [])}
    export const ${p.name} = (props: ${p.name}Props): JSX.Element => {
        const ref = useRef<Types.${p.name}>()
        ${toProps(p.events || [], p.attributes || [], p.slots || [])}
        ${(p.attributes || []).map(toPropEffect).join("\n")}
        ${(p.events || []).map(toEventEffect).join("\n")}
        ${"// @ts-expect-error カスタムエレメントに JSX の定義がない"}
        return <${p.tagName} ref={ref}>${p.slots && p.slots.length > 0 ? "{ children }" : ""}</${p.tagName}>
    }`;
  return [
    `${p.name}.tsx`,
    code,
  ];
};

export const toEntry: ToEntry = (defs) => defs.map(ele => `export { ${ele.name} } from "./${ele.name}.js"`).join("\n");
