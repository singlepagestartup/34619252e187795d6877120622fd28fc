import { NextResponse } from "next/server";
import { gzip } from "pako";
import QueryString from "qs";
import {
  currencyPopulate,
  layoutPopulate,
  loaderPopulate,
  modalPopulate,
  pageBlockPopulate,
  reviewPopulate,
  slideOverPropulate,
} from "~utils/api/queries";
import { BACKEND_URL } from "~utils/envs";

const models = [
  {
    url: "flyouts",
    populate: pageBlockPopulate,
  },
  { url: "footers", populate: pageBlockPopulate },
  { url: "i18n/locales", populate: pageBlockPopulate },
  { url: "layouts", populate: layoutPopulate },
  { url: "modals", populate: modalPopulate },
  { url: "navbars", populate: pageBlockPopulate },
  { url: "sidebars", populate: pageBlockPopulate },
  { url: "slide-overs", populate: slideOverPropulate },
  { url: "topbars", populate: pageBlockPopulate },
  { url: "reviews", populate: reviewPopulate },
  { url: "loaders", populate: loaderPopulate },
  { url: "currencies", populate: currencyPopulate },
];

export async function generateStaticParams() {
  const paths = [];

  for (const model of models) {
    const backendPath = `${BACKEND_URL}/api/${model.url}`;
    const items = await fetch(backendPath).then((res) => res.json());

    const path = model.url.split("/");
    path[path.length - 1] = `${path[path.length - 1]}.json`;

    paths.push({
      url: path,
    });

    if (items?.data?.length) {
      for (const item of items.data) {
        paths.push({
          url: [...model.url.split("/"), `${item.id}.json`],
        });
      }
    }
  }

  return paths;
}

export async function GET(request: Request, { params }: any) {
  const paramsModel = params.url[0].replace(".json", "");
  const sanitizedParamsUrl = params.url.map((param: string) => {
    return param.replace(".json", "");
  });

  const model = models.find((item) => item.url.includes(paramsModel));

  const query = QueryString.stringify({
    locale: "all",
    populate: model?.populate ? model.populate : pageBlockPopulate,
  });

  const headers: any = {
    "Query-Encoding": "application/gzip",
  };

  const compressedQuery = gzip(query);
  const base64CompressedQuery = Buffer.from(compressedQuery).toString("base64");

  const path = `${BACKEND_URL}/api/${sanitizedParamsUrl.join(
    "/",
  )}?${base64CompressedQuery}`;

  const res = await fetch(path, {
    headers,
  });
  const data = await res.json();

  return NextResponse.json(data);
}
