import { defineCollection, z } from "astro:content";

const experiences = defineCollection({
  type: "data",
  // Type-check frontmatter using a schema
  schema: z.object({
    companyName: z.string(),
    from: z.string(),
    to: z.string(),
    position: z.string(),
  }),
});

export const collections = { experiences };
