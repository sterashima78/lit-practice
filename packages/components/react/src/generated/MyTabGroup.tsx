import { ReactNode, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-tab-group.js";
import type * as Types from "@sterashima78/lit-practice-wc";

export type MyTabGroupProps = {
  children: ReactNode;
};

export const MyTabGroup = (props: MyTabGroupProps): JSX.Element => {
  const ref = useRef<Types.MyTabGroup>();

  const {
    children,
  } = props;

  // @ts-expect-error カスタムエレメントに JSX の定義がない
  return <my-tab-group ref={ref}>{children}</my-tab-group>;
};
