import { ReactNode, useEffect, useRef } from "react";
import "@sterashima78/lit-practice-wc/my-accordion.js";

export type MyAccordionProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onToggle?: (e: { isOpen: boolean }) => void;
};

export const MyAccordion = (props: MyAccordionProps): JSX.Element => {
  const ref = useRef<HTMLElement>();

  const {
    children,
    onClose,
    onOpen,
    onToggle,
    isOpen,
  } = props;

  // for is-open attribute
  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.isOpen = isOpen;
    }
  }, [isOpen]);

  // for close event
  useEffect(() => {
    if (!!onClose) ref.current?.addEventListener("close", onClose);
    return () => {
      if (!!onClose) ref.current?.removeEventListener("close", onClose);
    };
  }, [onClose]);

  // for open event
  useEffect(() => {
    if (!!onOpen) ref.current?.addEventListener("open", onOpen);
    return () => {
      if (!!onOpen) ref.current?.removeEventListener("open", onOpen);
    };
  }, [onOpen]);

  // for toggle event
  useEffect(() => {
    let onToggleHandler: (e: CustomEvent<{ isOpen: boolean }>) => void;
    if (!!onToggle) {
      onToggleHandler = (e: CustomEvent<{ isOpen: boolean }>) => onToggle(e.detail);
      // @ts-expect-error
      ref.current?.addEventListener("toggle", onToggleHandler);
    }

    return () => {
      // @ts-expect-error
      if (!!onToggleHandler) ref.current?.removeEventListener("toggle", onToggleHandler);
    };
  }, [onToggle]);

  // @ts-ignore
  return <my-accordion ref={ref}>{children}</my-accordion>;
};
