import { ReactNode, useEffect, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-tab.js";

export type MyTabProps = {
  children: ReactNode;
  name: string;
};

export const MyTab = (props: MyTabProps): JSX.Element => {
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
  return <my-tab ref={ref}>{children}</my-tab>;
};
