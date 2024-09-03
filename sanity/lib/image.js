import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source) {
  if (!source || !source.asset) {
    console.error("Invalid image source:", source);
    return "";
  }
  return builder.image(source);
}
