import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/**
 * Algolia DocSearch-style search: a trigger button in the navbar that opens a
 * centred command palette, with keyboard navigation and grouped results.
 *
 * Deliberately no Algolia account. It reads the local search index the
 * site already builds, so there is no key to manage and no network call, and
 * the UI is the part that matters here.
 */

const RECENT_KEY = 'mw-recent-searches';
const MAX_RECENT = 5;

function useIndex() {
  const [docs, setDocs] = useState(null);
  const url = useBaseUrl('/search-index.json');

  useEffect(() => {
    let alive = true;
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((raw) => {
        if (!alive || !raw) return;
        // The plugin ships an array of {documents:[...]} buckets.
        const flat = [];
        for (const bucket of Array.isArray(raw) ? raw : [raw]) {
          for (const d of bucket.documents || []) {
            // Entries with a title and url are pages; the rest are headings
            // and content chunks we do not surface separately.
            if (d.t && d.u) flat.push({title: d.t, url: d.u, crumbs: d.b || []});
          }
        }
        // De-duplicate by url, keeping the first (page-level) entry.
        const seen = new Set();
        setDocs(
          flat.filter((d) => {
            if (seen.has(d.url)) return false;
            seen.add(d.url);
            return true;
          }),
        );
      })
      .catch(() => alive && setDocs([]));
    return () => {
      alive = false;
    };
  }, [url]);

  return docs;
}

// Section label from the URL, so results group the way the nav does.
function sectionOf(url) {
  if (url.startsWith('/api')) return 'API reference';
  if (url.startsWith('/changelog')) return 'Changelog';
  const m = /^\/docs\/([^/]+)/.exec(url);
  const map = {"get-started":"Get started","agents":"Agents","review-and-publishing":"Review and publishing","automations":"Automations","connections":"Connections","teams":"Teams","help":"Help"};
  return (m && map[m[1]]) || 'Documentation';
}

function score(doc, q) {
  const t = doc.title.toLowerCase();
  if (t === q) return 0;
  if (t.startsWith(q)) return 1;
  if (t.includes(q)) return 2;
  if (doc.crumbs.join(' ').toLowerCase().includes(q)) return 3;
  return -1;
}

function Highlight({text, query}) {
  if (!query) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className={styles.mark}>{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

const PageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5" />
  </svg>
);

const EnterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 10 4 15l5 5" />
    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
  </svg>
);

function Modal({onClose}) {
  const docs = useIndex();
  const history = useHistory();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    inputRef.current?.focus();
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'));
    } catch {
      /* storage unavailable; recents just stay empty */
    }
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query || !docs) return [];
    return docs
      .map((d) => ({d, s: score(d, query)}))
      .filter((x) => x.s >= 0)
      .sort((a, b) => a.s - b.s || a.d.title.length - b.d.title.length)
      .slice(0, 12)
      .map((x) => x.d);
  }, [q, docs]);

  // Group results under their section, preserving rank order.
  const groups = useMemo(() => {
    const out = [];
    for (const r of results) {
      const s = sectionOf(r.url);
      let g = out.find((x) => x.section === s);
      if (!g) out.push((g = {section: s, items: []}));
      g.items.push(r);
    }
    return out;
  }, [results]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => setActive(0), [q]);

  const go = useCallback(
    (doc) => {
      if (!doc) return;
      try {
        const next = [
          {title: doc.title, url: doc.url},
          ...recent.filter((r) => r.url !== doc.url),
        ].slice(0, MAX_RECENT);
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* non-fatal */
      }
      onClose();
      history.push(doc.url);
    },
    [history, onClose, recent],
  );

  const onKeyDown = (e) => {
    if (e.key === 'Escape') return onClose();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(flat[active]);
    }
  };

  // Keep the highlighted row in view during keyboard navigation.
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({block: 'nearest'});
  }, [active]);

  let idx = -1;

  return createPortal(
    <div className={styles.scrim} onMouseDown={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}>
        <div className={styles.searchRow}>
          <svg className={styles.searchIco} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search documentation"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search documentation"
          />
          <button type="button" className={styles.escBtn} onClick={onClose}>
            Esc
          </button>
        </div>

        <div className={styles.body} ref={listRef}>
          {q && flat.length === 0 && docs && docs.length > 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>
                No results for &ldquo;{q}&rdquo;
              </p>
              <p className={styles.emptyHint}>
                Try a different term, or ask the assistant for a written answer.
              </p>
            </div>
          )}

          {/* The search index is generated at build time, so it is absent
              under `docusaurus start`. Say so rather than claiming the
              query matched nothing. */}
          {q && docs && docs.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Search index not built</p>
              <p className={styles.emptyHint}>
                The index is generated by <code>npm run build</code>. Search
                works on the built site.
              </p>
            </div>
          )}

          {q && !docs && (
            <div className={styles.empty}>
              <p className={styles.emptyHint}>Loading index…</p>
            </div>
          )}

          {!q && recent.length > 0 && (
            <div className={styles.group}>
              <div className={styles.groupLabel}>Recent</div>
              {recent.map((r, i) => (
                <button
                  key={r.url}
                  type="button"
                  className={styles.row}
                  onClick={() => go(r)}>
                  <span className={styles.rowIco}>
                    <PageIcon />
                  </span>
                  <span className={styles.rowTitle}>{r.title}</span>
                </button>
              ))}
            </div>
          )}

          {!q && recent.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyHint}>
                Search for a task, a page, or an endpoint.
              </p>
            </div>
          )}

          {groups.map((g) => (
            <div key={g.section} className={styles.group}>
              <div className={styles.groupLabel}>{g.section}</div>
              {g.items.map((r) => {
                idx += 1;
                const i = idx;
                return (
                  <button
                    key={r.url}
                    type="button"
                    data-idx={i}
                    className={i === active ? styles.rowOn : styles.row}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}>
                    <span className={styles.rowIco}>
                      <PageIcon />
                    </span>
                    <span className={styles.rowText}>
                      <span className={styles.rowTitle}>
                        <Highlight text={r.title} query={q.trim()} />
                      </span>
                      {r.crumbs.length > 0 && (
                        <span className={styles.rowCrumbs}>
                          {r.crumbs.join(' › ')}
                        </span>
                      )}
                    </span>
                    <span className={styles.rowEnter}>
                      <EnterIcon />
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.hint}>
            <kbd className={styles.kbd}>↵</kbd> to select
          </span>
          <span className={styles.hint}>
            <kbd className={styles.kbd}>↑</kbd>
            <kbd className={styles.kbd}>↓</kbd> to navigate
          </span>
          <span className={styles.hint}>
            <kbd className={styles.kbd}>esc</kbd> to close
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const {siteConfig} = useDocusaurusContext();
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || ''));
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Search documentation">
        <svg className={styles.triggerIco} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className={styles.triggerText}>Search</span>
        <span className={styles.triggerKeys}>
          <kbd className={styles.kbd}>{mac ? '⌘' : 'Ctrl'}</kbd>
          <kbd className={styles.kbd}>K</kbd>
        </span>
      </button>
      {open && <Modal onClose={() => setOpen(false)} />}
    </>
  );
}
