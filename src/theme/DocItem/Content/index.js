import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import OriginalDocItemContent from '@theme-original/DocItem/Content';
import PageActions from '@site/src/components/PageActions';

/**
 * Per-page TechArticle structured data. Docusaurus already emits the meta
 * description/OG tags from frontmatter; this adds the JSON-LD layer so
 * search and AI answer engines can parse title/description/URL without
 * re-deriving them from raw HTML.
 */
export default function DocItemContent(props) {
  const {siteConfig} = useDocusaurusContext();
  const {metadata} = useDoc();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: metadata.description,
    url: `${siteConfig.url}${metadata.permalink}`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.title,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
    },
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <PageActions />
      <OriginalDocItemContent {...props} />
    </>
  );
}
