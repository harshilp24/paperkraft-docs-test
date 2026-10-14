// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

// Set this to the address your docs are published at: canonical links,
// the sitemap and the structured data below all use it.
const SITE_URL = 'https://example.com';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Xenon Studio Docs',
  tagline: 'Xenon Studio keeps your software documentation in step with your product.',
  future: {v4: true},
  url: SITE_URL,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  clientModules: ['./src/clientModules/fonts.js'],
  i18n: {defaultLocale: 'en', locales: ['en']},
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {path: 'docs', routeBasePath: 'docs', sidebarPath: './sidebars.js'},
        blog: false,
        theme: {customCss: './src/css/custom.css'},
        sitemap: {changefreq: 'weekly', priority: 0.5, ignorePatterns: ['/search'], filename: 'sitemap.xml'},
      }),
    ],
  ],
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      ({hashed: true, docsRouteBasePath: '/docs', indexBlog: false, indexPages: true, searchBarShortcut: true, searchBarShortcutHint: true}),
    ],
  ],
  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({'@context': 'https://schema.org', '@type': 'WebSite', name: 'Xenon Studio Docs', url: SITE_URL}),
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {defaultMode: 'light', respectPrefersColorScheme: false},
      navbar: {hideOnScroll: false, items: []},
      prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
    }),
};

export default config;
