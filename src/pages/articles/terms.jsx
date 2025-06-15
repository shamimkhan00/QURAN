import React from 'react';
import styles from './CommonPage.module.css';

export default function Terms() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Terms of Use</h1>
      <p className={styles.paragraph}>
        By using PathToQuran.com, you agree to use the content for personal, educational, and spiritual purposes only.
      </p>
      <p className={styles.paragraph}>
        All content is provided "as is" and we do not guarantee 100% accuracy. Use the content with reflection and personal judgment.
      </p>
      <p className={styles.paragraph}>
        This site is not officially affiliated with any Islamic institution.
      </p>
    </div>
  );
}
