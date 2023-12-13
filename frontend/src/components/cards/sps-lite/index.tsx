import { ICardsProps } from "..";
import Simple from "./Simple";

export const variants = {
  simple: Simple,
};

export default function Cards(props: ICardsProps) {
  const Comp = variants[props.variant as keyof typeof variants];

  if (!Comp) {
    return <></>;
  }

  return <Comp {...props} />;
}
