import Wide from "./Wide";
import { FC, ReactNode } from "react";
import { ISpsLiteBackendLayout } from "types/collection-types/sps-lite";
import Boxed from "./Boxed";

export interface ISpsLiteLayout extends ISpsLiteBackendLayout {
  children: ReactNode;
}

export const variants = {
  wide: Wide,
  boxed: Boxed,
};

export default function Layouts(props: ISpsLiteLayout) {
  const Comp = variants[
    props.variant as keyof typeof variants
  ] as FC<ISpsLiteLayout>;

  if (!Comp) {
    return <></>;
  }

  return <Comp {...props} />;
}
