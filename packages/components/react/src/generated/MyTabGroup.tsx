import { ReactNode, useEffect, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-tab-group.js";

export type MyTabGroupProps = {
  children: ReactNode;
};

export const MyTabGroup = (props: MyTabGroupProps): JSX.Element => {
  const ref = useRef<HTMLElement>();

  const {
    children,
  } = props;

  // @ts-ignore
  return <my-tab-group ref={ref}>{children}</my-tab-group>;
};
