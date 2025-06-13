import Sidebar from "./sidebar/Sidebar";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import SignIn from './Extra/SignIn.jsx';
import SignUp from "./Extra/Signup.jsx";
import { ProfileName } from "./ProfileName.jsx";
import styles from './Headermob.module.css';
import { useEffect, useState } from "react";
import { auth } from "../firebase.js";
import surahName from '../Quran/surahName.json';
import { FaSearch } from "react-icons/fa";
import verseCounts from "./Extra/verseCountsData.js";

export const Headermob = ({
  incrementCount,
  decrementCount,
  setLanguage,
  setScript,
  isOpen,
  setIsOpen,
  surah,
  verse,
  setSurah,
  setVerse
}) => {

  //useStates
  const [loading, setLoading] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [inputSurah, setInputSurah] = useState('Enter');
  const [inputVerse, setInputVerse] = useState('Verse');


  //functions
  const handleSurahVerse = () => {
    const surahNum = parseInt(inputSurah);
    const verseNum = parseInt(inputVerse);

    if (surahNum >= 1 && surahNum <= 114) {
      const maxVerse = verseCounts[surahNum.toString()];
      if (verseNum >= 1 && verseNum <= maxVerse) {
        setSurah(surahNum);
        setVerse(verseNum);
      } else {
        alert(`❌ Verse must be between 1 and ${maxVerse} for Surah ${surahNum}`);
      }
    } else {
      alert("❌ Surah must be between 1 and 114");
    }
  };

  //useEffects
  useEffect(() => {
    auth.onAuthStateChanged((user) => {

      if (user) {
        setShowUser(true)
      } else {
        setShowUser(false)
      }
      setLoading(false);
    })
  });

  useEffect(() => {
    setInputSurah(surah);
    setInputVerse(verse);
  }, [surah, verse]);



  return (
    <>
      <div className={styles.container}>


        <div className={styles.righticon}>
          {/* <div><GiOpenBook size="2rem" /></div> */}
          <Sidebar setLanguage={setLanguage} setScript={setScript} isOpen={isOpen}
            setIsOpen={setIsOpen}></Sidebar>
          <div>
            <div className={styles.iconfont}>PathToQuran</div>
            {/* <div className={styles.iconfont2}>Shamim Khan</div> */}
          </div>
        </div>


        {loading ? (
          <div>.....</div>
        ) : showUser ? (
          <ProfileName></ProfileName>
        ) : (
          <div className={styles.signinup}>
            <SignIn setShowUser={setShowUser}></SignIn>
            <SignUp></SignUp>
          </div>
        )}



      </div>

      <div className={`${styles.container} ${styles.secondTopbar}`}>

        <div className={styles.middle}>

          <div className={styles.ayatName}>
            {surahName[parseInt(surah) - 1]}
          </div>

          <div className={styles.inputbtnsearch}>
            <div className={styles.inputWrapper}>

              <input
                type="number"
                placeholder="surah"
                value={inputSurah}
                onChange={(e) => setInputSurah(e.target.value)}
                className={styles.input}
              />:
              <input
                type="number"
                placeholder="verse"
                value={inputVerse}
                onChange={(e) => setInputVerse(e.target.value)}
                className={styles.input}
              />
            </div>
            <button onClick={handleSurahVerse} className={styles.searchBtn}><FaSearch /></button>
          </div>

          <div className={styles.btncontainer}>
            <button className={styles.btn} onClick={decrementCount}><FaArrowLeft /></button>
            <button className={styles.btn} onClick={incrementCount}><FaArrowRight /></button>
          </div>

        </div>

      </div>
    </>
  );
};
