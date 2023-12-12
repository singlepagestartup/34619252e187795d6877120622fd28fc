"use client";

import { variants as spsLiteVariants } from "./sps-lite";
import { IComponent as IBackendComponent } from "~redux/services/backend/components/elements/buttons-array/interfaces";

export interface IElement
  extends Omit<
    IBackendComponent,
    "id" | "description" | "className" | "__component"
  > {
  description?: string | null;
  className?: string | null;
  onClick?: any;
  __component?: IBackendComponent["__component"];
}

const variants = { ...spsLiteVariants };

export default function ButtonsArrays(props: IElement) {
  const Comp = variants[props.variant as keyof typeof variants];

  if (!Comp) {
    return <></>;
  }

  return <Comp {...props} />;
}
