import nextUtils from "@rogwild/next-utils";
const { getImageUrl } = nextUtils.api;
import { BACKEND_URL } from "~utils/envs";
import Image from "next/image";
import SimpleButtons from "~components/buttons/simple-buttons";
import { ISpsLiteHeroSectionBlock } from ".";

export default function SimpleCentered<T extends ISpsLiteHeroSectionBlock>(
  props: T
) {
  console.log(`🚀 ~ props:`, props.logotype);

  return (
    <div className="relative flex flex-col items-center justify-between overflow-hidden bg-white mx-auto max-w-7xl">
      {props.background ? (
        <Image
          src={getImageUrl(props.background, { BACKEND_URL })}
          alt=""
          fill={true}
          className="object-cover object-center"
        />
      ) : null}

      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mx-auto mt-16 max-w-2xl lg:max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight xl:inline text-gray-900 sm:text-5xl md:text-6xl">
              {props?.title}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              {props?.description}
            </p>
            <div className="mx-auto mt-5 max-w-md flex flex-col sm:flex-row justify-center md:mt-8 gap-4">
              {props?.buttons?.map((button, index) => {
                return <SimpleButtons key={index} {...button} />;
              })}
            </div>
          </div>
        </main>
      </div>
      {props.media?.length ? (
        <div className="w-full relative aspect-w-4 aspect-h-2">
          <Image
            src={getImageUrl(props.media[0], { BACKEND_URL })}
            alt=""
            fill={true}
            className="object-contain object-bottom"
          />
        </div>
      ) : null}
    </div>
  );
}
