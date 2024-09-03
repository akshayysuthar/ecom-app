import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token:
    "sk0YuAEzx8YbdeZPZ8Jjrf5CtRFsdUfRuwBmATmQxr6mhhQe7pm3gjsPcpDRMiy97C2kq21BX2yTq5bU0PAY5fawDowAELmUfNnw2KnSczK1I2o4oAHB06UEDz0hdaQbcaD5ifLf7n1Ltk7y9wS93tbMbf8ZcpQeVuYsYkPWBXrCsjLcAsjQ",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
