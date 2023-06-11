# HackUTD Tech Guide

A collection of projects meant to help hackers bootstrap their next project :). Based on [AstroPaper](https://github.com/satnaing/astro-paper).

## Tech Guide Specific Docs

### Adding Tech Guides

This can be done manually or automatically. It is NOT recommended that you add tech guides manually. It is both more difficult to add and to keep in sync.

To automatically add your tech guide and download referenced assets, add an entry to `TECHGUIDES.config.yml`.

Example:

```yaml
guides:
    - author: HackUTD
      title: React Native Login
      description: A simple login example using React Native
      url: "https://github.com/akevinge/react-native-hackpack"
```

Run the following command to run add your techguide and assets.

```bash
npm run dev:generate
```

or

```bash
npm run generate
npm run dev
```

To manually add your tech guides, copy the README to `/src/content/guide/githubowner__repositoryname.md`. Copy over asset files and replace links in your README.

Add frontmatter to the md file as seen below:

```md
---
author: HackUTD
description: A simple login example using React Native
pubDatetime: 2023-04-11T14:49:37.000Z # Date should be in ISO format
title: React Native Login
postSlug: react-native-hackpack # Slug should be your tech guide's repository name
---

# The Rest of Your README
```

Also, add an entry to `TECHGUIDES.config.yaml` and _comment it out_.

### What If I Change My Tech Guide's README?

For style changes, it can be annoying to change your tech guide's README, push it to Github, and regenerate it in this repository. It is recommended that you make stylistic changes to the `.md` file in this project, copy the changes to the README in your tech guide's repository, and regenerate when you're done.

Otherwise, most of your README writing can probably be done in your tech guide and you can generate it here when you're done :).

> **Warning**
>
> Running `npm run generate` or `npm run dev:generate` will overwrite any changes you make to existing generated files.

# Implementation Details

## Generated

`scripts/generateReadmes.ts` is the entry point.

`scripts/api.ts` handles all github API calls.

`scripts/pathResolver.ts` finds links referencing local files (in the github repo), downloads them, and replaces the links with the newly downloaded file path.

## Project Structure

Inside of AstroPaper, you'll see the following folders and files:

```bash
/
├── scripts/
│   └── generateReadmes.ts
│   └── pathResolver.ts
│   └── api.ts
├── public/
│   ├── assets/
│   │   └── logo.svg
│   │   └── logo.png
│   └── favicon.svg
│   └── nonexistant-image-og.jpg
│   └── robots.txt
│   └── toggle-theme.js
├── src/
│   ├── assets/
│   │   └── socialIcons.ts
│   ├── components/
│   ├── content/
│   │   |  guide/
│   │   |    └── owner__some-tech-guide.md
│   │   └── config.ts
│   ├── layouts/
│   └── pages/
│   └── styles/
│   └── utils/
│   └── config.ts
│   └── types.ts
└── _schema.ts
└── TECHGUIDES.config.yml
└── package.json
```

## Quick Astro Rundown

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, can be placed in the `public/` directory.

All tech guides are stored in `src/content/guides` directory.

## Tech Stack

**Main Framework** - [Astro](https://astro.build/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Component Framework** - [ReactJS](https://reactjs.org/)  
**Styling** - [TailwindCSS](https://tailwindcss.com/)  
**Fuzzy Search** - [FuseJS](https://fusejs.io/)  
**Icons** - [Boxicons](https://boxicons.com/) | [Tablers](https://tabler-icons.io/)  
**Code Formatting** - [Prettier](https://prettier.io/)  
**Linting** - [ESLint](https://eslint.org)

## Running Locally

```bash
# Run without generating
npm run dev

# Run with generation (will overwrite any readme or asset changes)
npm run dev:generate

# Generate without running
npm run generate
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                                                                                                           |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `npm install`          | Installs dependencies                                                                                                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`                                                                                      |
| `npm run dev:generate` | Generates astro README's for tech guides and starts local dev server at `localhost:3000`                                         |
| `npm run build`        | Build your production site to `./dist/`                                                                                          |
| `npm run preview`      | Preview your build locally, before deploying                                                                                     |
| `npm run format:check` | Check code format with Prettier                                                                                                  |
| `npm run format`       | Format codes with Prettier                                                                                                       |
| `npm run sync`         | Generates TypeScript types for all Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync). |
| `npm run lint`         | Lint with ESLint                                                                                                                 |

---

Licensed under the MIT License, Copyright © 2023
