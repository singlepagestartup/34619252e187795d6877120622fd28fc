"use client";

import { variants as spsLiteVariants } from "./sps-lite";
import { variants as startupVariants } from "./startup";
import { IEntity as IBackendForm } from "~redux/services/backend/api/form/interfaces";

export interface IForm extends IBackendForm {
  showSkeletons?: boolean;
  successCallback?: any;
}

const variants = {
  ...spsLiteVariants,
  ...startupVariants,
};

export default function Forms(props: IForm) {
  const Comp = variants[props.variant as keyof typeof variants];

  if (!Comp) {
    return <></>;
  }

  return <Comp {...props} />;
}
