import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

// One tab per job the reader comes to do. Each tab has its own sidebar
// (sidebars.js) and lights up on its own pages.
const TABS = [
  {label: 'Home', to: '/', match: /^\/$/},
  {label: 'Get started', to: '/docs/intro', match: /^\/docs\/(intro|quickstart|faq|changelog)$/},
  {label: 'Get started', to: '/docs/get-started/what-xenon-studio-does', match: /^\/docs\/get-started\//},
  {label: 'Agents', to: '/docs/agents/docs-sync', match: /^\/docs\/agents\//},
  {label: 'Review and publishing', to: '/docs/review-and-publishing/review-agent', match: /^\/docs\/review-and-publishing\//},
  {label: 'Automations', to: '/docs/automations/triggers-and-schedules', match: /^\/docs\/automations\//},
  {label: 'Connections', to: '/docs/connections/connect-your-docs-repository', match: /^\/docs\/connections\//},
  {label: 'Teams', to: '/docs/teams/for-engineering', match: /^\/docs\/teams\//},
  {label: 'Help', to: '/docs/help/common-questions', match: /^\/docs\/help\//},
];

export default function SecondaryNav() {
  const {pathname} = useLocation();
  return (
    <nav className={styles.subnav} aria-label="Section navigation">
      {TABS.map((tab) => (
        <Link key={tab.label} to={tab.to} className={tab.match.test(pathname) ? `${styles.tab} ${styles.tabActive}` : styles.tab}>
          {tab.label}
        </Link>
      ))}
      <span className={styles.spacer} />
      <Link to="/docs/changelog" className={styles.metaLink}>
        Changelog
      </Link>
    </nav>
  );
}
