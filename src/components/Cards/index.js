import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export function Card({title, href, to, icon, horizontal, children}) {
  const dest = to || href || '#';
  return (
    <Link
      to={dest}
      className={horizontal ? `${styles.card} ${styles.horizontal}` : styles.card}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.body}>
        <div className={styles.title}>
          {title}
          <svg
            className={styles.arrow}
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5">
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </div>
        {children && <div className={styles.desc}>{children}</div>}
      </div>
    </Link>
  );
}

export function CardGroup({cols = 2, children}) {
  return (
    <div className={styles.grid} style={{'--mw-card-cols': cols}}>
      {children}
    </div>
  );
}

export default Card;
