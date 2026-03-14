![Tackl Banner](/src/images/readme-banner.png)

✨ A comprehensive starter kit designed to accelerate web development with best-in-class tooling, performance optimization, and developer experience. Built on Next.js, it provides everything needed to create fast, scalable, and maintainable web applications. ✨

![Version Number](https://img.shields.io/badge/Version-3.2.3-8000FF)
![Includes](https://img.shields.io/badge/Includes-GSAP_+_Lenis_-8000FF)

`For detailed documentation and guides on how to use this starter kit, please refer to the 'docs' directory.`

## 🎯 Key Features

- **Next.js 16** - Latest version with App Router and React Server Components
- **TypeScript** - Full type safety and enhanced developer experience _Optional_
- **Biome** - Linting and formatting
- **Storybook** - Component development and documentation
- **Performance Context** - Built-in performance optimizations and user preference detection
- **GSAP** - Smooth animations and transitions
- **Lenis** - Smooth scroll and parallax animations
- **Responsive Images** - Automatic image optimization and responsive handling
- **SEO Ready** - Built-in SEO components and best practices
- **Accessibility** - WCAG compliance and accessibility features
- **Centralized Font Management** - Fonts are defined once in `theme/fonts.js` and shared across both Next.js and Storybook
- **Documentation** - Comprehensive guides and API documentation

---

This project is built with [Next.js](https://nextjs.org/), a powerful React framework that enables features like server-side rendering, static site generation, and optimized client-side routing. The starter kit leverages Next.js 15's advanced capabilities including the App Router, React Server Components, and built-in performance optimizations.

## 🚀 Getting Started

First, run the development server:

```bash
bun run dev
```

To create a production build

```bash
bun run build
```

To serve a production build

```bash
bun run serve
# you may need to install serve globally:
bun add -g serve
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.jsx`. The page auto-updates as you edit the file.

## DatoCMS Web Previews Setup

This repository is wired for DatoCMS Web Previews + Visual Editing on the homepage only. To finish the setup, you need to complete the DatoCMS-side configuration and provide the required environment variables.

### Required environment variables

Set these in your local and deployed environments:

```bash
DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN=your-published-content-token
DATOCMS_DRAFT_CONTENT_CDA_TOKEN=your-draft-content-token
DATOCMS_BASE_EDITING_URL=https://your-project.admin.datocms.com/environments/main
DRAFT_MODE_SECRET=replace-with-a-random-secret
```

Notes:
- `DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN` should only return published content.
- `DATOCMS_DRAFT_CONTENT_CDA_TOKEN` should be a CDA token with draft access enabled.
- `DATOCMS_BASE_EDITING_URL` must be the full DatoCMS environment URL, not just the project root.
- `DRAFT_MODE_SECRET` is the shared secret used by the draft mode and preview-links endpoints.

### DatoCMS configuration

1. Open your DatoCMS project and configure the Web Previews integration/plugin.
2. Set the Preview Links webhook URL to your site URL plus the preview-links endpoint:

```text
https://your-site.com/api/preview-links?token=YOUR_DRAFT_MODE_SECRET
```

3. Save the configuration.
4. Open a record and use the Web Previews panel. The repo will return:
   - `Draft homepage`
   - `Published homepage`

### Current scope

The preview-links endpoint is intentionally homepage-only right now. It does not map individual Dato records to separate frontend routes yet, so both draft and published preview actions open `/`.

## Using Draft Mode Right Now

You can enter draft mode directly without going through DatoCMS by visiting the enable endpoint with `DRAFT_MODE_SECRET`.

### Enter draft mode

Local example:

```text
http://localhost:3000/api/draft-mode/enable?token=YOUR_DRAFT_MODE_SECRET&redirect=/
```

Production example:

```text
https://your-site.com/api/draft-mode/enable?token=YOUR_DRAFT_MODE_SECRET&redirect=/
```

What this does:
1. Validates the `token` against `DRAFT_MODE_SECRET`.
2. Enables Next.js draft mode.
3. Rewrites the draft cookie so it works inside the DatoCMS preview iframe.
4. Redirects the browser to `/`.
5. Loads the homepage using the draft CDA token.
6. Enables realtime preview updates and the Visual Editing controller for draft content.

### Exit draft mode

Use the toolbar button on the homepage or visit:

```text
http://localhost:3000/api/draft-mode/disable?redirect=/
```

What this does:
1. Clears the draft mode cookie, including the iframe-compatible version.
2. Returns the browser to the published homepage.
3. Removes the draft toolbar.
4. Turns off the persisted visual editing toggle for that browser session when using the homepage toolbar.

### Realtime preview and Visual Editing behavior

When draft mode is active on the homepage:
- the homepage queries DatoCMS using the draft CDA token
- realtime updates are subscribed to automatically
- Visual Editing metadata is included in draft responses only
- the draft toolbar lets editors:
  - enable or disable visual editing overlays
  - exit draft mode

The visual editing toggle only controls the click-to-edit overlays. Draft mode remains active until the disable endpoint is used.

## Committing code

This project uses Husky and a custom commit message script to ensure consistent and informative commit messages. When you're ready to commit your changes:

1. Stage your changes:

```bash
git add .
```

2. Commit your changes:

```bash
git commit
```

3. Husky will take care of the rest and ask you some important questions to help you create a good commit message.

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Tackl project.

    .
    ├── node_modules
    ├── storybook
    ├── app
    ├── public
    ├── src
    ├── .env
    ├── biome.json
    ├── .gitignore
    ├── .npmrc
    ├── .deployment_guide.md
    ├── .jsconfig.json
    ├── next.config.js
    ├── bun.lock
    ├── package.json
    ├── docs
    └── README.md

1.  **`/node_modules`**: The core dependency directory containing all external packages and libraries your project relies on. These are automatically installed based on your package.json specifications and should never be manually modified or committed to version control.

2.  **`/storybook`**: Houses all Storybook configuration and setup files. Storybook is our component development environment where we build and test UI components in isolation. Individual component stories are co-located with their components in `src/parts/YourComponent` for better maintainability. Note that fonts must be imported into `.storybook/preview.js` to be available in your stories (see example in that file for importing Inter font).

3.  **`./app`**: The main application directory utilizing Next.js 13+'s App Router architecture. This modern routing approach offers enhanced features like server components, layouts, and more streamlined data fetching compared to the legacy Pages Router. [Learn more about App Router](https://nextjs.org/docs/app)

4.  **`./public`**: Static asset directory for files that need to be publicly accessible. This includes images, fonts, icons, and other media files that don't require processing. Files in this directory are served as-is from the root URL path.

5.  **`/src`**: The primary source code directory containing all front-end application code. This follows the conventional source directory structure and includes components, utilities, hooks, and other application logic organized in a modular fashion.

6.  **`.env`**: Environment configuration file storing sensitive data like API keys, database credentials, and other environment-specific variables. This file should never be committed to version control - use .env.example instead for documentation.

7.  **`.gitignore`**: Version control configuration file that specifies which files and directories Git should ignore, such as node_modules, build outputs, and environment files.

8.  **`.npmrc`**: Package manager configuration file. In Tackl, it's primarily used for configuring GSAP Club access and other package-specific settings.

9.  **`deployment_guide`**: Comprehensive AWS deployment documentation providing step-by-step instructions for setting up and deploying your Tackl project to production.

10. **`jsconfig.json`**: JavaScript project configuration file that enhances development experience by enabling TypeScript-like features, custom path aliases, and better IntelliSense support in modern IDEs.

11. **`biome.json`**: Biome configuration for linting and formatting, providing consistent code style across the project.

12. **`next.config.js`**: Next.js framework configuration file where you can customize build settings, add environment variables, configure plugins, and modify webpack behavior. Essential for tailoring Next.js to your project's needs.

13. **`bun.lock`**: Dependency lock file for Bun that ensures consistent installations. Should be committed to version control but never manually edited.

14. **`package.json`**: Project manifest file defining your application's dependencies, scripts, metadata, and other important configurations. This is the central configuration file for your Node.js/JavaScript project.

15. **`docs`**: Comprehensive documentation directory containing detailed guides, best practices, and technical documentation specific to working with Tackl's features and conventions.

16. **`README.md`**: The primary project documentation file providing an overview, setup instructions, and essential information for developers working with the project. You're reading it right now!

## 🎓Learning NextJS

Next.js is a powerful React framework that enables features like server-side rendering and static site generation. To deepen your understanding of Next.js and make the most of its capabilities, we recommend exploring these valuable resources:

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive documentation covering all Next.js features, APIs, and best practices. Perfect for both beginners and advanced developers.
- [Learn Next.js](https://nextjs.org/learn) - An interactive, hands-on tutorial that guides you through building a full Next.js application from scratch. Great for practical learning.
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples) - A collection of example projects demonstrating various Next.js features and integration patterns.
- [Next.js Discord Community](https://discord.com/invite/bUG2bvbtHy) - Join thousands of Next.js developers for real-time discussions, help, and networking.

The framework is open source and actively maintained by Vercel and the community. You can explore or contribute to [the Next.js GitHub repository](https://github.com/vercel/next.js/). Whether you're fixing bugs, adding features, or improving documentation, your contributions help make Next.js better for everyone!

## 👥 Authors & Maintainers

This project is developed and maintained by the 12 Studio Team:

### Core Team

- **Lead Developers**
    - Joe Taylor (joe@12studio.agency)
    - Adam Roberts (adam@12studio.agency)

### Contributing

We welcome contributions from the community! Please read our contribution guidelines before submitting pull requests.

For support, feature requests, or bug reports, please:

1. Check existing GitHub issues
2. Create a new issue if needed
3. Contact the development team at hello+tackl@12studio.agency

### License

This project is proprietary software owned by Tackl. All rights reserved.
