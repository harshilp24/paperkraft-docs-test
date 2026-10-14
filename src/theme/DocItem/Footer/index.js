import React from 'react';
import OriginalDocItemFooter from '@theme-original/DocItem/Footer';
import Feedback from '@site/src/components/Feedback';

/**
 * Appends the feedback widget to every doc page, above the original footer
 * (tags, last-updated, prev/next). Doing it here rather than per-page means
 * no page can forget it.
 */
export default function DocItemFooter(props) {
  return (
    <>
      <Feedback />
      <OriginalDocItemFooter {...props} />
    </>
  );
}
