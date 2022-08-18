import { ReactNode, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-text.js";
import type * as Types from "@sterashima78/lit-practice-wc";

export type MyTextProps = {
  children: ReactNode;
};

export const MyText = (props: MyTextProps): JSX.Element => {
  const ref = useRef<Types.MyText>();

  const {
    children,
  } = props;

  // @ts-expect-error カスタムエレメントに JSX の定義がない
  return <my-text ref={ref}>{children}</my-text>;
};
