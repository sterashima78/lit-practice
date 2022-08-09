import { ReactNode, useEffect, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-tab-panel.js";

export type MyTabPanelProps = {
  children: ReactNode;
  name: string;
};

export const MyTabPanel = (props: MyTabPanelProps): JSX.Element => {
  const ref = useRef<HTMLElement>();

  const {
    children,
    name,
  } = props;

  // for name attribute
  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.name = name;
    }
  }, [name]);

  // @ts-ignore
  return <my-tab-panel ref={ref}>{children}</my-tab-panel>;
};
