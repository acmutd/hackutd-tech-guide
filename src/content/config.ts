import { defineCollection } from "astro:content";
import { guideSchema } from "../../_schema";

const guide = defineCollection({
    schema: guideSchema,
});

export const collections = { guide };
