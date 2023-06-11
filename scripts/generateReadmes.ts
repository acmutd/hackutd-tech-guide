import { fetchLatestCommit, fetchReadme } from "./api";
import {
    githubURLRegex,
    guideConfigSchema,
    type GuideConfiguration,
    type GuideFrontmatter,
} from "../_schema";
import fs from "node:fs/promises";
import yaml from "js-yaml";
import { z } from "zod";
import {
    formatGuidePath,
    DEFAULT_TEXTGUIDE_PATH,
    resolveGithubToLocalPaths,
} from "./pathResolver";

const guideConfigSchemas = z.object({
    guides: z.array(guideConfigSchema),
});

/**
 * Read configuration at path and validate against configuration schema.
 */
async function readAndValidateConfig(
    path: string
): Promise<GuideConfiguration[]> {
    const content = await fs
        .readFile(path, { encoding: "utf-8" })
        .catch(err => {
            throw new Error(
                `Failed to read file at ${DEFAULT_TEXTGUIDE_PATH}; reason: ${err.message}`
            );
        });
    const yamlDoc = yaml.load(content);
    return guideConfigSchemas
        .parseAsync(yamlDoc)
        .then(data => data.guides)
        .catch(err => {
            throw new Error(
                `${DEFAULT_TEXTGUIDE_PATH} did not follow the schema. See: _schema.ts\n${err.message}`
            );
        });
}

/**
 * Returns readme with astro frontmatter inserted at the top.
 */
function formatAstroReadme(schema: GuideFrontmatter, githubReadme: string) {
    let buffer = "";
    buffer += "---\n";
    for (const [key, value] of Object.entries(schema)) {
        if (typeof value === "undefined") continue;
        if (value instanceof Date) {
            buffer += `${key}: ${value.toISOString()}\n`;
            continue;
        }
        buffer += `${key}: ${value.toString()}\n`;
    }
    buffer += "---\n\n";
    buffer += githubReadme;
    return buffer;
}

async function main() {
    const guideConfigs = await readAndValidateConfig(DEFAULT_TEXTGUIDE_PATH);

    for (const config of guideConfigs) {
        // Fetch from Github
        const match = config.url.match(githubURLRegex);
        const [_, owner, repo] = match!; // Match has to to be valid. Zod performed regex validation already.
        let [githubReadme, lastCommitDate] = await Promise.all([
            fetchReadme(owner, repo),
            fetchLatestCommit(owner, repo),
        ]);

        // Download assets and resolve file paths
        githubReadme = await resolveGithubToLocalPaths(
            owner,
            repo,
            githubReadme
        );

        // Create astro readme
        const guideFrontMatter: GuideFrontmatter = {
            author: config.author,
            description: config.description,
            pubDatetime: lastCommitDate,
            title: config.title,
            postSlug: repo,
        };
        const astroReadme = formatAstroReadme(guideFrontMatter, githubReadme);
        const guideFilePath = formatGuidePath(owner, repo);
        await fs.writeFile(guideFilePath, astroReadme, { flag: "w" });
    }
}

main();
