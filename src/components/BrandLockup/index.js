import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/** Navbar brand: a mark in the main colour, the name, then a quieter "docs". */
export default function BrandLockup() {
  return (
    <div className={styles.lockup}>
      <Link to="/" className={styles.half} aria-label="Xenon Studio Docs docs, home">
        <span aria-hidden="true" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: 6, background: 'var(--mw-brand)', color: '#fff', fontSize: 12, fontWeight: 700}}>
          X
        </span>
        <span className={styles.mwWord}>Xenon Studio</span>
        <span className={styles.docs}>docs</span>
      </Link>
    </div>
  );
}
