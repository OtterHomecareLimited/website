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

// Otter Alongside — the family support programme. One markdown file per stage,
// in src/content/family/. The same source drives the web pages and the printed
// pack, so content is maintained once. Defaults to draft: true — a stage only
// goes live when it's explicitly set to false.
const family = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/family" }),
  schema: z.object({
    title: z.string(),
    stage: z.number(),
    summary: z.string(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog, family };
