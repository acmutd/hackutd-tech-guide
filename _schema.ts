import { z } from "zod";

export const guideSchema = z
  .object({
    author: z.string().optional().default("HackUTD"),
    pubDatetime: z.date(),
    title: z.string(),
    postSlug: z.string().optional(),
    draft: z.boolean().optional(),
    ogImage: z.string().optional(),
    description: z.string(),
  })
  .strict();

export type GuideFrontmatter = z.infer<typeof guideSchema>;

export const githubURLRegex =
  /https:\/\/github.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\/?$/;

// Date will be fetched and inserted later. Optional for config file
export const guideConfigSchema = guideSchema
  .partial({ pubDatetime: true })
  .extend({
    url: z.string().url().regex(githubURLRegex),
  });

export type GuideConfiguration = z.infer<typeof guideConfigSchema>;
