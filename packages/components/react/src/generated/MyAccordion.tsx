import { ReactNode, useEffect, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-accordion.js";
import type * as Types from "@sterashima78/lit-practice-wc";

export type MyAccordionProps = {
  children: ReactNode;
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (e: { isOpen: boolean }) => void;
};

export const MyAccordion = (props: MyAccordionProps): JSX.Element => {
  const ref = useRef<Types.MyAccordion>();

  const {
    children,
    onOpen,
    onClose,
    onToggle,
    isOpen,
  } = props;

  // for is-open attribute
  useEffect(() => {
    if (ref.current) {
      ref.current.isOpen = isOpen;
    }
  }, [isOpen]);

  // for open event
  useEffect(() => {
    if (!!onOpen) ref.current?.addEventListener("open", onOpen);
    return () => {
      if (!!onOpen) ref.current?.removeEventListener("open", onOpen);
    };
  }, [onOpen]);

  // for close event
  useEffect(() => {
    if (!!onClose) ref.current?.addEventListener("close", onClose);
    return () => {
      if (!!onClose) ref.current?.removeEventListener("close", onClose);
    };
  }, [onClose]);

  // for toggle event
  useEffect(() => {
    let onToggleHandler: (e: CustomEvent<{ isOpen: boolean }>) => void;
    if (!!onToggle) {
      onToggleHandler = (e: CustomEvent<{ isOpen: boolean }>) => onToggle(e.detail);
      // @ts-expect-error カスタムイベント定義が存在しない
      ref.current?.addEventListener("toggle", onToggleHandler);
    }

    return () => {
      // @ts-expect-error カスタムイベント定義が存在しない
      if (!!onToggleHandler) ref.current?.removeEventListener("toggle", onToggleHandler);
    };
  }, [onToggle]);

  // @ts-expect-error カスタムエレメントに JSX の定義がない
  return <my-accordion ref={ref}>{children}</my-accordion>;
};
