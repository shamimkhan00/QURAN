import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About PathToQuran</h1>

      <p className={styles.text}>
        <strong>PathToQuran</strong> is a free, user-friendly Quran web app built to help people
        read, understand, and reflect on the Holy Quran. Whether you're a student of knowledge or someone seeking peace through Allah's words, this app aims to bring the Quran closer to your heart.
      </p>

      <p className={styles.text}>
        🌙 It features beautiful Arabic scripts (IndoPak & Uthmani), translations in multiple languages,
        tafsir (explanations), and an audio player to listen verse by verse. Navigation is simple,
        and you can explore the Quran one verse at a time.
      </p>

      <h2 className={styles.subtitle}>Support & Donation</h2>

      <p className={styles.text}>
        This project is maintained with love and dedication. If you find it helpful and wish to support the
        development and hosting costs, consider making a small donation.
      </p>

      <p className={styles.text}>
        📱 <strong>Donate via UPI:</strong> <code>shamim1245789-2@okicici</code>
      </p>

      {/* OR use QR image */}
      {/* <img src="/your-qr-image.png" alt="Donate via UPI" className={styles.qr} /> */}

      <p className={styles.text}>
        May Allah ﷻ reward you for your support and accept it from you. JazakAllah Khair! <br />
        E-Mail: <span style={{ color: '#1e90ff' }}>shamim134579@gmail.com</span>
      </p>
    </div>
  );
}
