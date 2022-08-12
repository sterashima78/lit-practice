import { ReactNode, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-card.js";
import type * as Types from "@sterashima78/lit-practice-wc";

export type MyCardProps = {
  children: ReactNode;
};

export const MyCard = (props: MyCardProps): JSX.Element => {
  const ref = useRef<Types.MyCard>();

  const {
    children,
  } = props;

  // @ts-expect-error カスタムエレメントに JSX の定義がない
  return <my-card ref={ref}>{children}</my-card>;
};
