import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const STEPS = ["Sign in to Xenon Studio and create a workspace.","Connect the tools your team already uses, such as your docs repository and your help centre.","Point Xenon Studio at the docs site you want it to keep current.","Ask for a change from a thread, a pull request or a ticket, or let an agent pick up a merged change."];

// Where to start: one card per section, each with the pages to read.
const GROUPS = [
  {
    "job": "Get started",
    "outcome": "A plain overview of the agents and what each one handles.",
    "to": "/docs/get-started/what-xenon-studio-does",
    "tasks": [
      {
        "label": "What Xenon Studio does",
        "to": "/docs/get-started/what-xenon-studio-does"
      },
      {
        "label": "Set up your workspace",
        "to": "/docs/get-started/set-up-your-workspace"
      },
      {
        "label": "Your first change",
        "to": "/docs/get-started/your-first-change"
      },
      {
        "label": "Plans and credits",
        "to": "/docs/get-started/plans-and-credits"
      }
    ]
  },
  {
    "job": "Agents",
    "outcome": "How a merged pull request becomes one docs pull request with the affected pages updated.",
    "to": "/docs/agents/docs-sync",
    "tasks": [
      {
        "label": "Docs sync",
        "to": "/docs/agents/docs-sync"
      },
      {
        "label": "Docs writer",
        "to": "/docs/agents/docs-writer"
      },
      {
        "label": "Link fixer",
        "to": "/docs/agents/link-fixer"
      },
      {
        "label": "Slack agent",
        "to": "/docs/agents/slack-agent"
      }
    ]
  },
  {
    "job": "Review and publishing",
    "outcome": "How a second agent checks every change and scores its risk.",
    "to": "/docs/review-and-publishing/review-agent",
    "tasks": [
      {
        "label": "Review agent",
        "to": "/docs/review-and-publishing/review-agent"
      },
      {
        "label": "Review policy",
        "to": "/docs/review-and-publishing/review-policy"
      },
      {
        "label": "Approving a change",
        "to": "/docs/review-and-publishing/approving-a-change"
      },
      {
        "label": "Docs Score",
        "to": "/docs/review-and-publishing/docs-score"
      }
    ]
  },
  {
    "job": "Automations",
    "outcome": "How to run agents on triggers, schedules and workflows.",
    "to": "/docs/automations/triggers-and-schedules",
    "tasks": [
      {
        "label": "Triggers and schedules",
        "to": "/docs/automations/triggers-and-schedules"
      },
      {
        "label": "Weekly digest",
        "to": "/docs/automations/weekly-digest"
      },
      {
        "label": "Stale page alerts",
        "to": "/docs/automations/stale-page-alerts"
      }
    ]
  },
  {
    "job": "Connections",
    "outcome": "How to link the docs site you already have.",
    "to": "/docs/connections/connect-your-docs-repository",
    "tasks": [
      {
        "label": "Connect your docs repository",
        "to": "/docs/connections/connect-your-docs-repository"
      },
      {
        "label": "Connect Slack and your help centre",
        "to": "/docs/connections/connect-slack-and-your-help-centre"
      },
      {
        "label": "Custom skills and company context",
        "to": "/docs/connections/custom-skills-and-company-context"
      }
    ]
  },
  {
    "job": "Teams",
    "outcome": "Docs that change with every merge.",
    "to": "/docs/teams/for-engineering",
    "tasks": [
      {
        "label": "For engineering",
        "to": "/docs/teams/for-engineering"
      },
      {
        "label": "For support",
        "to": "/docs/teams/for-support"
      },
      {
        "label": "For product",
        "to": "/docs/teams/for-product"
      },
      {
        "label": "For developer relations",
        "to": "/docs/teams/for-developer-relations"
      },
      {
        "label": "For technical writers",
        "to": "/docs/teams/for-technical-writers"
      }
    ]
  }
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export default function Home() {
  return (
    <Layout title="Xenon Studio Docs" description="Xenon Studio keeps your software documentation in step with your product.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div>
            <h1 className={styles.h1}>Docs on autopilot</h1>
            <p className={styles.lead}>Xenon Studio turns product changes into updated docs, help articles and guides for your team to review and publish. Start with a task below, or search with ⌘K.</p>
            <div className={styles.actions}>
              <Link className={styles.primary} to="/docs/quickstart">Start the quickstart</Link>
              <Link className={styles.secondary} to="/docs/intro">Read the introduction</Link>
            </div>
          </div>
          {STEPS.length > 0 && (
            <ol className={styles.steps} aria-label="Quickstart">
              {STEPS.map((s, i) => (
                <li key={i} className={styles.step}>
                  <span className={styles.num}>{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <Link to="/docs/quickstart" className={styles.banner}>
          <span>
            <span className={styles.kicker}>New here</span>
            <span className={styles.bannerTitle}>Set up Xenon Studio for the first time</span>
            <span className={styles.bannerText}>Xenon Studio keeps your software documentation in step with your product.</span>
          </span>
          <span className={styles.pill}>Start <Arrow /></span>
        </Link>

        <section className={styles.section}>
          <h2 className={styles.h2}>Where to start</h2>
          <p className={styles.subtitle}>Pick the one that matches what you want to do.</p>
          <div className={styles.grid}>
            {GROUPS.map((g) => (
              <div key={g.job} className={styles.card}>
                <Link to={g.to} className={styles.cardHead}>
                  <span className={styles.cardTitle}>{g.job}</span>
                  {g.outcome && <span className={styles.outcome}>{g.outcome}</span>}
                </Link>
                <ul className={styles.tasks}>
                  {g.tasks.map((t) => (
                    <li key={t.to}>
                      <Link to={t.to} className={styles.task}>
                        {t.label}
                        <Arrow />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <nav className={styles.footLinks}>
            <Link to="/docs/changelog">Changelog</Link>
            <Link to="/docs/faq">FAQ</Link>
            <a href="/llms.txt">llms.txt</a>
          </nav>
          <span>© Xenon Studio {new Date().getFullYear()}</span>
        </footer>
      </main>
    </Layout>
  );
}
