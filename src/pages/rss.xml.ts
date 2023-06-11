import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedGuides from "@utils/getSortedGuides";
import slugify from "@utils/slugify";
import { SITE } from "@config";

export async function get() {
    const posts = await getCollection("guide");
    const sortedPosts = getSortedGuides(posts);
    return rss({
        title: SITE.title,
        description: SITE.desc,
        site: SITE.website,
        items: sortedPosts.map(({ data }) => ({
            link: `guides/${slugify(data)}`,
            title: data.title,
            description: data.description,
            pubDate: new Date(data.pubDatetime),
        })),
    });
}
