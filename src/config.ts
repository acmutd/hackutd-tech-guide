import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
    website: "https://hackutd.co",
    author: "HackUTD",
    desc: "HackUTD tech guides to help you bootstrap your next hackathon project.",
    title: "HackUTD",
    ogImage: "",
    lightAndDarkMode: true,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
    enable: false,
    svg: true,
    width: 216,
    height: 46,
};

export const SOCIALS: SocialObjects = [
    {
        name: "Github",
        href: "https://github.com/acmutd/hackutd-tech-guide",
        linkTitle: ` ${SITE.title} on Github`,
        active: true,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/hackutd",
        linkTitle: `${SITE.title} on Instagram`,
        active: true,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/hackutd",
        linkTitle: `${SITE.title} on LinkedIn`,
        active: true,
    },
    {
        name: "Mail",
        href: "mailto:hello@hackutd.co",
        linkTitle: `Send an email to ${SITE.title}`,
        active: false,
    },
    {
        name: "Discord",
        href: "DISCORD INVITE GOES HERE",
        linkTitle: `${SITE.title} on Discord`,
        active: false, // Toggle this on during hackathon
    },
];
