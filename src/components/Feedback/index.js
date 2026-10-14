import React, {useState} from 'react';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

/**
 * "Was this page helpful?" — the pattern Stripe and Fingerprint both use.
 *
 * A No answer opens a short follow-up, because the vote alone says a page
 * failed without saying how. Nothing is transmitted in this prototype; wire
 * onSubmit to an analytics endpoint when there is one.
 */
export default function Feedback() {
  const {pathname} = useLocation();
  const [vote, setVote] = useState(null);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  // Reset when the reader navigates to another page.
  React.useEffect(() => {
    setVote(null);
    setNote('');
    setSent(false);
  }, [pathname]);

  if (sent) {
    return (
      <div className={styles.wrap}>
        <p className={styles.thanks}>
          Thanks. Your feedback helps us prioritise what to fix.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <span className={styles.q}>Was this page helpful?</span>
        <div className={styles.btns}>
          <button
            type="button"
            className={vote === 'yes' ? styles.btnOn : styles.btn}
            aria-pressed={vote === 'yes'}
            onClick={() => {
              setVote('yes');
              setSent(true);
            }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3Z" />
              <path d="M7 10l4.5-7a2 2 0 0 1 3.4 2l-1.4 5h5.1a2 2 0 0 1 2 2.5l-1.8 7a2 2 0 0 1-2 1.5H7" />
            </svg>
            Yes
          </button>
          <button
            type="button"
            className={vote === 'no' ? styles.btnOn : styles.btn}
            aria-pressed={vote === 'no'}
            onClick={() => setVote('no')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <path d="M17 14V3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3Z" />
              <path d="M17 14l-4.5 7a2 2 0 0 1-3.4-2l1.4-5H5.4a2 2 0 0 1-2-2.5l1.8-7A2 2 0 0 1 7.2 3H17" />
            </svg>
            No
          </button>
        </div>
      </div>

      {vote === 'no' && (
        <form
          className={styles.followUp}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}>
          <label htmlFor="fb-note" className={styles.label}>
            What was missing or wrong?
          </label>
          <textarea
            id="fb-note"
            className={styles.textarea}
            rows={3}
            value={note}
            placeholder="Optional. The more specific, the faster we can fix it."
            onChange={(e) => setNote(e.target.value)}
          />
          <div className={styles.formActions}>
            <button type="submit" className={styles.submit}>
              Send feedback
            </button>
            <a
              className={styles.issueLink}
              href="https://github.com/harshilp24/paperkraft-docs-test/issues"
              target="_blank"
              rel="noreferrer noopener">
              Or open an issue
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
