import React from 'react';
import styles from './MainContent.module.css';



export const MainContent = ({ currentVerseData , ayahNumber }) => {

    // useEffect(() => {
    //     const fetchVerse = async () => {
    //         try {
    //             const [arabicRes, englishRes] = await Promise.all([
    //                 axios.get(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar.asad`),
    //                 axios.get(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/en.asad`)
    //             ]);

    //             setCurrentVerseData({
    //                 arabic: arabicRes.data.data.text,
    //                 translation: englishRes.data.data.text
    //             });

    //             const surah = englishRes.data.data.surah;
    //             setChapter({
    //                 name: surah.englishName,
    //                 no: surah.number,
    //                 verse: englishRes.data.data.numberInSurah
    //             });

    //             // Automatically update input with current surah:verse
    //             setInput(`${surah.number}:${englishRes.data.data.numberInSurah}`);

    //         } catch (error) {
    //             console.error("Error fetching verse:", error);
    //         }
    //     };

    //     fetchVerse();
    // }, [ayahNumber]);

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


