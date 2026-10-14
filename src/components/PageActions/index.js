import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

/**
 * Split button: the primary half copies the page, the caret opens the rest.
 * It keeps a row of competing buttons out of the top of every page.
 */

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const MarkdownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M6 15V9l3 3 3-3v6" />
    <path d="M17 9v4l-1.6-1.6M17 13l1.6-1.6" />
  </svg>
);

const ChatGPTIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a4 4 0 0 1 3.5 2M12 3a4 4 0 0 0-3.5 2M20 8.5a4 4 0 0 1-1.5 5M20 8.5a4 4 0 0 0-4.5-3.5M4 8.5a4 4 0 0 0 1.5 5M4 8.5A4 4 0 0 1 8.5 5M5.5 13.5A4 4 0 0 0 8.5 19M18.5 13.5a4 4 0 0 1-3 5.5M8.5 19a4 4 0 0 0 7 0" />
  </svg>
);

const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" aria-hidden="true">
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
  </svg>
);

const CaretIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ExternalIcon = () => (
  <svg className={styles.ext} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

function getArticleText() {
  const article =
    document.querySelector('article .markdown') ||
    document.querySelector('article');
  return article ? article.innerText.trim() : '';
}

export default function PageActions() {
  const {pathname} = useLocation();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close on outside click or Escape, the way a menu is expected to behave.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getArticleText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
    setOpen(false);
  }, []);

  const handleView = useCallback(() => {
    const text = getArticleText();
    const win = window.open('', '_blank');
    if (win) {
      win.document.title = 'Markdown source';
      win.document.body.style.cssText =
        'margin:0;background:#0f1117;color:#e2e5ea;font:13px/1.7 ui-monospace,monospace;padding:28px;';
      const pre = win.document.createElement('pre');
      pre.style.cssText = 'white-space:pre-wrap;word-break:break-word;';
      pre.textContent = text;
      win.document.body.appendChild(pre);
    }
    setOpen(false);
  }, []);

  // Hand the assistant the page URL and let it fetch, rather than stuffing
  // the whole article into a query string that browsers will truncate.
  const askUrl = (base) => {
    const here =
      typeof window !== 'undefined' ? window.location.href : pathname;
    return `${base}${encodeURIComponent(
      `Read ${here} and answer questions about it.`,
    )}`;
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.split}>
        <button
          type="button"
          className={`${styles.main} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy page'}
        </button>
        <button
          type="button"
          className={styles.caret}
          aria-label="More page actions"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((v) => !v)}>
          <span className={open ? styles.caretUp : styles.caretDown}>
            <CaretIcon />
          </span>
        </button>
      </div>

      {open && (
        <div className={styles.menu} role="menu">
          <button
            type="button"
            role="menuitem"
            className={styles.item}
            onClick={handleCopy}>
            <span className={styles.itemIco}>
              <CopyIcon />
            </span>
            <span className={styles.itemText}>
              <span className={styles.itemTitle}>Copy page</span>
              <span className={styles.itemDesc}>
                Copy page as Markdown for LLMs
              </span>
            </span>
          </button>

          <button
            type="button"
            role="menuitem"
            className={styles.item}
            onClick={handleView}>
            <span className={styles.itemIco}>
              <MarkdownIcon />
            </span>
            <span className={styles.itemText}>
              <span className={styles.itemTitle}>
                View as Markdown
                <ExternalIcon />
              </span>
              <span className={styles.itemDesc}>
                View this page as plain text
              </span>
            </span>
          </button>

          <a
            role="menuitem"
            className={styles.item}
            href={askUrl('https://chatgpt.com/?q=')}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}>
            <span className={styles.itemIco}>
              <ChatGPTIcon />
            </span>
            <span className={styles.itemText}>
              <span className={styles.itemTitle}>
                Open in ChatGPT
                <ExternalIcon />
              </span>
              <span className={styles.itemDesc}>
                Ask questions about this page
              </span>
            </span>
          </a>

          <a
            role="menuitem"
            className={styles.item}
            href={askUrl('https://claude.ai/new?q=')}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}>
            <span className={styles.itemIco}>
              <ClaudeIcon />
            </span>
            <span className={styles.itemText}>
              <span className={styles.itemTitle}>
                Open in Claude
                <ExternalIcon />
              </span>
              <span className={styles.itemDesc}>
                Ask questions about this page
              </span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
