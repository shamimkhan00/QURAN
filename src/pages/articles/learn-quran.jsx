import React from 'react';
import styles from './LearnQuran.module.css';

export default function LearnQuranArticle() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>How to Start Learning the Quran</h1>

      <p className={styles.paragraph}>
        Learning the Quran is a journey of both knowledge and heart. Here's how to get started:
      </p>

      <h2 className={styles.sectionTitle}>1. Start with Easy Translations</h2>
      <p className={styles.paragraph}>
        Choose a simple, authentic translation that’s easy to understand...
      </p>

      <h2 className={styles.sectionTitle}>2. Add Tafsir to Deepen Understanding</h2>
      <p className={styles.paragraph}>
        Tafsir helps you go beyond the surface meanings and see the wisdom...
      </p>

      <h2 className={styles.sectionTitle}>3. Listen to Recitations</h2>
      <p className={styles.paragraph}>
        Listening helps improve your pronunciation and builds emotional connection...
      </p>

      <p className={styles.closing}>
        May Allah guide your efforts to learn His book. 🤲
      </p>
    </main>
  );
}
