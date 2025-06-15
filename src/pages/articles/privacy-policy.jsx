import React from 'react';
import styles from './CommonPage.module.css';

export default function PrivacyPolicy() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Privacy Policy</h1>
      <p className={styles.paragraph}>
        At PathToQuran.com, we respect your privacy. We do not collect personal information unless you voluntarily provide it.
      </p>
      <p className={styles.paragraph}>
        This site may use third-party services like Google AdSense to serve ads. These services may use cookies to personalize ads.
      </p>
      <p className={styles.paragraph}>
        Learn more about how Google uses data here:{" "}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
          Google Advertising Policy
        </a>.
      </p>
    </div>
  );
}
