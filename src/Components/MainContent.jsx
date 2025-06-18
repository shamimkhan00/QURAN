import React from 'react';
import styles from './MainContent.module.css';
import VerseAudio from './VerseAudio';
import { IoSettings } from "react-icons/io5";
import { s, style } from 'framer-motion/client';

export const MainContent = ({ currentVerseData, surah,verse , onEnded, setIsOpen ,isDarkMode}) => {
    // console.log(currentVerseData);

    
    return (
        <main className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.topcontainer}>

                    <VerseAudio surah={surah} ayah={verse} onEnded={onEnded}></VerseAudio>
                    <div className={styles.settingscon}>
                        <IoSettings className={styles.settings} onClick={() => { setIsOpen(true) }} />
                    </div>
                </div>

                <div className={`${styles.card} ${isDarkMode ? styles.CarddarkMode : styles.CardlightMode}`}>
                    {currentVerseData ? (
                        <div className={styles.verseBlock}>
                            {/* Arabic Text */}
                            <div className={styles.arabicSection}>
                                <div className={`${styles.arabicText} ${isDarkMode ? styles.ArabicDarkMode : styles.ArabicLightMode}`}>
                                    {currentVerseData.arabic}
                                </div>
                                <div className={styles.separator}></div>
                            </div>

                            {/* Translation */}
                            <div className={`${styles.translationBox} ${isDarkMode ? styles.TranslationDarkMode : styles.TranslationLightMode}`}>
                                <p className={`${styles.translationText} ${isDarkMode ? styles.TextDarkMode : styles.TextLightMode}`}>
                                    {currentVerseData.translation}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading verse...</p>
                    )}
                </div>
                <div className={styles.trans}>
                    <p>Transliteration</p>
                </div>
                <div className={`${styles.card} ${isDarkMode ? styles.CarddarkMode : styles.CardlightMode}`}>
                    {currentVerseData ? (
                        <div className={styles.verseBlock}>
                            {/* Translation */}
                            <div className={`${styles.translationBox} ${isDarkMode ? styles.TranslationDarkMode : styles.TranslationLightMode}`}>
                                <p className={`${styles.translationText} ${isDarkMode ? styles.TextDarkMode : styles.TextLightMode}`}>
                                    {currentVerseData.trans}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading verse...</p>
                    )}
                </div>
                <div className={styles.trans}>
                    <p>Tasfir</p>
                </div>
                <div className={`${styles.card} ${isDarkMode ? styles.CarddarkMode : styles.CardlightMode}`}>
                    {currentVerseData ? (
                        <div className={styles.verseBlock}>
                            {/* Translation */}
                            <div className={`${styles.translationBox} ${isDarkMode ? styles.TranslationDarkMode : styles.TranslationLightMode}`}>
                                <span className={`${styles.translationText} ${isDarkMode ? styles.TextDarkMode : styles.TextLightMode}`}>
                                    {/* {currentVerseData.tafsir} */}
                                    <div dangerouslySetInnerHTML={{ __html: currentVerseData?.tafsir }} />
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p>Loading verse...</p>
                    )}
                </div>
                <div>
                    <br /><br />
                </div>
            </div>
        </main>
    );
};


