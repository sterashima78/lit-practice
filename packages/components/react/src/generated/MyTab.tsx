import { ReactNode, useEffect, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-tab.js";
import type * as Types from "@sterashima78/lit-practice-wc";

export type MyTabProps = {
  children: ReactNode;
  name: string;
};

export const MyTab = (props: MyTabProps): JSX.Element => {
  const ref = useRef<Types.MyTab>();

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
  return <my-tab ref={ref}>{children}</my-tab>;
};
