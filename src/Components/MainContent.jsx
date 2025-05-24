import React from 'react';
import styles from './MainContent.module.css';



export const MainContent = ({ currentVerseData }) => {
    return (
        <main className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.card}>
                    {currentVerseData ? (
                        <div className={styles.verseBlock}>
                            {/* Arabic Text */}
                            <div className={styles.arabicSection}>
                                <div className={styles.arabicText}>
                                    {currentVerseData.arabic}
                                </div>
                                <div className={styles.separator}></div>
                            </div>

                            {/* Translation */}
                            <div className={styles.translationBox}>
                                <p className={styles.translationText}>
                                    "{currentVerseData.translation}"
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading verse...</p>
                    )}
                </div>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        alert("UPI ID : shamim1245789-2@oksbi");
                    }}
                    style={{
                        color: '#CAE8BD', // Emerald green
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontSize: '10px'
                    }}
                >
                    SHOW SOME SUPPORT
                </a>
            </div>

        </main>
    );
};


