import { Octokit } from "@octokit/rest";
import path from "path";

const octokit = new Octokit();

export async function fetchReadme(
  owner: string,
  repo: string
): Promise<string> {
  const { data } = await octokit.repos.getReadme({ owner, repo }).catch(err => {
    throw new Error(
      `Failed to fetch README at ${owner}/${repo}\n${err.message}`
    );
  });
  return Buffer.from(data.content, "base64").toString();
}

export async function fetchLatestCommit(
  owner: string,
  repo: string
): Promise<Date> {
  const { data: commits } = await octokit.repos.listCommits({
    owner,
    repo,
    page: 1,
    per_page: 1,
  });
  const date = commits[0]?.commit?.committer?.date;
  if (!date) {
    throw new Error(`Failed to fetch commit date at ${owner}/${repo}`);
  }
  return new Date(date);
}

/**
 * Will only expect to fetch a single file
 * If multiple files are recieved, an error will be thrown
 * If content or encoding is missing, an error will also be thrown
 */
export async function fetchSingleFile(
  owner: string,
  repo: string,
  filePath: string
): Promise<{ content: string; encoding: string; path: string }> {
  const response = await octokit.repos.getContent({
    owner,
    repo,
    path: path.normalize(filePath), // Github API not happy with non-normalized paths
  });

  if (response.status != 200) {
    throw new Error(`Fetch file request failed with ${response.status}`);
  }
  if (response.data instanceof Array) {
    throw new Error();
  }
  if (!("encoding" in response.data && "content" in response.data)) {
    throw new Error();
  }

  return {
    content: response.data.content,
    encoding: response.data.encoding,
    path: response.data.path,
  };
}
