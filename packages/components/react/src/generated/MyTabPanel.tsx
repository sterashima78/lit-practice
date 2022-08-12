import { ReactNode, useEffect, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-tab-panel.js";
import type * as Types from "@sterashima78/lit-practice-wc";

export type MyTabPanelProps = {
  children: ReactNode;
  name: string;
};

export const MyTabPanel = (props: MyTabPanelProps): JSX.Element => {
  const ref = useRef<Types.MyTabPanel>();

  const {
    children,
    name,
  } = props;

  // for name attribute
  useEffect(() => {
    if (ref.current) {
      ref.current.name = name;
    }
  }, [name]);

  // @ts-expect-error カスタムエレメントに JSX の定義がない
  return <my-tab-panel ref={ref}>{children}</my-tab-panel>;
};
