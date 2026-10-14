import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// A missing page offers a way back instead of a dead end.
const DESTINATIONS = [
  {title: 'Get started', desc: 'Xenon Studio turns product changes into updated docs, help articles and guides for your team to review and publish.', to: '/docs/intro'},
  {title: 'Get started', desc: 'What Xenon Studio does, Set up your workspace, Your first change', to: '/docs/get-started/what-xenon-studio-does'},
  {title: 'Agents', desc: 'Docs sync, Docs writer, Link fixer', to: '/docs/agents/docs-sync'},
  {title: 'Review and publishing', desc: 'Review agent, Review policy, Approving a change', to: '/docs/review-and-publishing/review-agent'},
];

export default function NotFoundContent({className}) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className={styles.wrap}>
        <p className={styles.code}>404</p>
        <Heading as="h1" className={styles.title}>That page is not here</Heading>
        <p className={styles.lead}>
          The link may be out of date, or the page may have moved. Search is the quickest way back:{' '}
          <kbd className={styles.kbd}>⌘</kbd>
          <kbd className={styles.kbd}>K</kbd>.
        </p>
        <div className={styles.grid}>
          {DESTINATIONS.map((d) => (
            <Link key={d.to} to={d.to} className={styles.card}>
              <span className={styles.cardTitle}>{d.title}</span>
              <span className={styles.cardDesc}>{d.desc}</span>
            </Link>
          ))}
        </div>
        <p className={styles.foot}>
          Followed a link from these docs?{' '}
          <a href="https://github.com/harshilp24/paperkraft-docs-test/issues" target="_blank" rel="noreferrer noopener">Tell us</a> so we can fix it.
        </p>
      </div>
    </main>
  );
}
