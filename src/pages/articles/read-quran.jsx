import React from 'react';
import styles from './ReadQuran.module.css';

export default function ReadQuranArticle() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>How to Read the Quran Daily</h1>

      <p className={styles.paragraph}>
        Reading the Quran consistently strengthens your connection with Allah. Here’s how to build a habit:
      </p>

      <h2 className={styles.sectionTitle}>1. Set a Time Daily</h2>
      <p className={styles.paragraph}>
        Choose a fixed time — morning or night — to read a few verses.
      </p>

      <h2 className={styles.sectionTitle}>2. Use a Clear Mushaf or App</h2>
      <p className={styles.paragraph}>
        A clear font and translation helps you stay focused and understand better.
      </p>

      <h2 className={styles.sectionTitle}>3. Reflect After Reading</h2>
      <p className={styles.paragraph}>
        Take a moment to reflect on the meaning. Let the words affect your heart.
      </p>

      <p className={styles.closing}>
        Make it a part of your life. Allah loves consistency. 🌙
      </p>
    </main>
  );
}
