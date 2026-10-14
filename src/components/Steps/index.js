import React from 'react';
import styles from './styles.module.css';

export function Step({title, children}) {
  return (
    <div className={styles.step}>
      {title && <h3 className={styles.stepTitle}>{title}</h3>}
      <div className={styles.stepContent}>{children}</div>
    </div>
  );
}

export function Steps({children}) {
  return <div className={styles.steps}>{children}</div>;
}

export default Steps;
