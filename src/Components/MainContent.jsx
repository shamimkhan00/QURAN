import React from 'react';
import styles from './MainContent.module.css';
import VerseAudio from './VerseAudio';
import { IoSettings } from "react-icons/io5";


export const MainContent = ({ currentVerseData, ayahNumber, surah, ayah, onEnded, tafsir, tafsirLoad, trans ,setIsOpen }) => {


    return (
        <main className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.topcontainer}> 

                    <VerseAudio surah={surah} ayah={ayah} onEnded={onEnded}></VerseAudio>
                    <div className={styles.settingscon}>
                        <IoSettings className={styles.settings} onClick={()=>{setIsOpen(true)}}/>
                    </div>
                </div>

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
                <div className={styles.trans}>
                    <p>Transliteration</p>
                </div>
                <div className={`${styles.card}`}>
                    {currentVerseData ? (
                        <div className={styles.verseBlock}>
                            {/* Translation */}
                            <div className={styles.translationBox}>
                                {tafsirLoad ? (
                                    <p className={styles.translationText}>
                                        Loading ........
                                    </p>
                                ) : (
                                    <p className={styles.translationText}>
                                        {trans}
                                    </p>
                                )}

                            </div>
                        </div>
                    ) : (
                        <p>Loading verse...</p>
                    )}
                </div>
                <div className={styles.trans}>
                    <p>Tasfir</p>
                </div>
                <div className={styles.card}>
                    {currentVerseData ? (
                        <div className={styles.verseBlock}>
                            {/* Translation */}
                            <div className={styles.translationBox}>
                                {tafsirLoad ? (
                                    <p className={styles.translationText}>
                                        Loading tafsir....
                                    </p>
                                ) : (
                                    <p className={styles.translationText}>
                                        {tafsir}
                                    </p>
                                )}

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


