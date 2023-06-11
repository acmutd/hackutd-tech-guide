import { fetchSingleFile } from "./api";
import path from "node:path";
import fs from "node:fs/promises";

export const DEFAULT_TEXTGUIDE_PATH = "TECHGUIDES.config.yml";
export const GUIDES_DIRECTORY = "src/content/guide";
export const ASSETS_DIRECTORY_FROM_ROOT = "public/assets";
export const ASSETS_DIRECTORY_FROM_ASTRO = "/assets";

export function techguideID(owner: string, repo: string): string {
    return `${owner}__${repo}`;
}

export function formatGuidePath(owner: string, repo: string): string {
    return `${GUIDES_DIRECTORY}/${techguideID(owner, repo)}.md`;
}

export function formatAssetPath(
    owner: string,
    repo: string,
    githubPath: string
): string {
    return path.normalize(
        `${ASSETS_DIRECTORY_FROM_ROOT}/${techguideID(
            owner,
            repo
        )}/${githubPath}`
    );
}

export function rootAssetToAstro(path: string): string {
    return path.replace("public", "");
}

/**
 * Finds paths in readme that reference files in Github repo, downloads files locally, and replaces all paths.
 *
 * Returns readme with resolved paths.
 */
export async function resolveGithubToLocalPaths(
    owner: string,
    repo: string,
    readme: string
): Promise<string> {
    // Extract, fetch, and download locally referenced files in the readme
    const paths = extractGithubPaths(readme);
    for (const path of paths) {
        const file = await fetchSingleFile(owner, repo, path);
        const rootAssetPath = await downloadAssets({
            owner,
            repo,
            githubPath: path,
            content: file.content,
            encoding: file.encoding,
        });
        readme = readme.replace(path, rootAssetToAstro(rootAssetPath));
    }
    return readme;
}

const localFilePathsRegex = /([\(](?!(https?:\/\/)).+[\.]\w+[\)])/g; // Matches to Github  (x.png) but excludes http links
/**
 * Extracts paths that reference local files in a Github repo.
 */
function extractGithubPaths(githubReadme: string): string[] {
    const match = githubReadme.match(localFilePathsRegex);
    const filePaths = match?.map(value => value.substring(1, value.length - 1)); // Trim parentheses off
    return filePaths || [];
}

/**
 * Resolves Github path to asset path for specific tech guide.
 * Creates asset files/directories locally.
 *
 * Returns asset path used to create files, this path starts from project root.
 */
async function downloadAssets({
    owner,
    repo,
    githubPath,
    content,
    encoding,
}: {
    owner: string;
    repo: string;
    githubPath: string;
    content: string;
    encoding: string;
}): Promise<string> {
    const path = formatAssetPath(owner, repo, githubPath);
    await ensureDirectoryExists(path);
    return fs
        .writeFile(path, content, {
            encoding: encoding as BufferEncoding,
            flag: "w",
        })
        .then(() => path)
        .catch(err => {
            throw new Error(
                `Failed to download asset to path ${path}\n${err.message}`
            );
        });
}

/**
 * Creates all directories along path if they don't exist.
 */
async function ensureDirectoryExists(filePath: string) {
    const dir = path.dirname(filePath);
    const exists = await fs
        .access(dir)
        .then(() => true)
        .catch(() => false);
    if (!exists) {
        await fs.mkdir(dir, { recursive: true });
    }
}
