import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog posts live as markdown in src/content/blog/.
// Jamie (or Claude) adds a .md file → it's live. No CMS runtime.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string().default("News"),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
