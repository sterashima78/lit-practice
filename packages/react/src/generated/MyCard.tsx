import { ReactNode, useEffect, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-card.js";

export type MyCardProps = {
  children: ReactNode;
};

export const MyCard = (props: MyCardProps): JSX.Element => {
  const ref = useRef<HTMLElement>();

  const {
    children,
  } = props;

  // @ts-ignore
  return <my-card ref={ref}>{children}</my-card>;
};
