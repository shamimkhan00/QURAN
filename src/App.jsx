import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import './App.css';
import { Header } from './Components/Header';
import { Headermob } from './Components/Headermob';
import { MainContent } from './Components/MainContent';
import verseCounts from './Components/Extra/verseCountsData';

function App() {
  // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [chapter, setChapter] = useState({ name: '', no: '', verse: '' });
  const [currentVerseData, setCurrentVerseData] = useState({ arabic: '', translation: '' });
  const [ayahNumber, setAyahNumber] = useState(1);
  // const [scripts, setScript] = useState('indopak');
  const [tafsir, setTasfit] = useState('');
  const [tafsirLoad, settafsirLoad] = useState(null);
  const [nextVerseData, setNextVerseData] = useState(null);
  const [trans,setTrans] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [scripts, setScript] = useState(() => {
    const savedarabicScript = localStorage.getItem('arabicScript');
    return savedarabicScript || 'indopak';
  });

  useEffect(() => {
    localStorage.setItem('arabicScript', scripts);
  }, [scripts]);
  

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    return savedLanguage || 'english';
  });

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);



  const [input, setInput] = useState(() => {
    return localStorage.getItem('input') || '1:1';
  });



  useEffect(() => {
    localStorage.setItem('input', input);
  }, [input]);




  const incrementCount = () => {
    if (nextVerseData) {
      // Use preloaded data for instant update
      setCurrentVerseData({
        arabic: nextVerseData.arabic,
        translation: nextVerseData.translation
      });

      setChapter({
        name: nextVerseData.surahName,
        no: nextVerseData.surah,
        verse: nextVerseData.verse
      });

      const globalAyah = getGlobalVerseNumber(nextVerseData.surah, nextVerseData.verse);
      setAyahNumber(globalAyah);
      setInput(`${nextVerseData.surah}:${nextVerseData.verse}`);
      getTafsirs(nextVerseData.surah, nextVerseData.verse);

      setNextVerseData(null); // clear to trigger re-prefetch in useEffect
    } else {
      // fallback if no preloaded data
      setAyahNumber(prev => {
        const newVal = Math.min(prev + 1, 6236);
        const { surah, ayah } = getSurahAndAyah(newVal);
        setInput(`${surah}:${ayah}`);
        return newVal;
      });
    }
  };


  const decrementCount = () => {
    setAyahNumber(prev => {
      const newVal = Math.max(prev - 1, 1);
      const { surah, ayah } = getSurahAndAyah(newVal);
      setInput(`${surah}:${ayah}`);
      return newVal;
    });
  };


  const handleInputChange = (e) => setInput(e.target.value);

  function getGlobalVerseNumber(surah, ayah) {
    if (surah < 1 || surah > 114 || ayah < 1 || ayah > verseCounts[surah]) {
      return null; // invalid input
    }

    // Sum all verses before the current Surah
    const verseOffset = verseCounts.slice(1, surah).reduce((a, b) => a + b, 0);

    return verseOffset + ayah;
  }


  function getSurahAndAyah(globalVerseNumber) {
    if (globalVerseNumber < 1 || globalVerseNumber > 6236) return null;

    let verseCount = 0;

    for (let surah = 1; surah < verseCounts.length; surah++) {
      const nextCount = verseCount + verseCounts[surah];
      if (globalVerseNumber <= nextCount) {
        const ayah = globalVerseNumber - verseCount;
        return { surah, ayah };
      }
      verseCount = nextCount;
    }

    return null; // should never reach here
  }

  const getTafsirs = async (surah, verse) => {  //en-al-jalalayn  //bn-tafsir-ahsanul-bayaan
    settafsirLoad(true);
    try {
      const languageVal = language === 'english' ? "en-al-jalalayn" : "bn-tafsir-ahsanul-bayaan"
      console.log(`lan ${languageVal}`);

      const tasfirRes = await axios.get(`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${languageVal}/${surah}/${verse}.json`);

      //https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-abubakrzakaria/1/2.json
      const transRes = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quran-la1/${surah}/${verse}.json`);
      // const transRes = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quran-la1/${surah}/${verse}.json`);
      
      setTrans(transRes.data.text);
      
      setTasfit(tasfirRes.data.text);
    } catch (err) {
      console.error("Error fetching tafsir:", err);
    } finally {
      settafsirLoad(false);
    }
  }



  useEffect(() => {
    const timeout = setTimeout(async () => {
      const [surahStr, verseStr] = input.split(":");
      const surah = parseInt(surahStr);
      const verse = parseInt(verseStr);
      if (!surah || !verse) return;

      try {
        // Fetch current verse
        const res = await axios.get(`https://quranapi.pages.dev/api/${surah}/${verse}.json`);
        const res2 = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/${surah}/${verse}.json`);
        const res3 = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranindopak/${surah}/${verse}.json`);
        
        setCurrentVerseData({
          arabic: scripts === 'indopak' ? res3.data.text : res2.data.text,
          translation: language === 'english' ? res.data.english : res.data.bengali
        });

        setChapter({
          name: res.data.surahName,
          no: surah,
          verse: verse
        });
      
        setAyahNumber(getGlobalVerseNumber(surah, verse));
        getTafsirs(surah, verse);

        // 🧠 PREFETCH NEXT VERSE
        const nextVerseNum = getGlobalVerseNumber(surah, verse) + 1;
        const next = getSurahAndAyah(nextVerseNum);
        if (next) {
          const [nsurah, nverse] = [next.surah, next.ayah];
          const [nres, nres2 , nres3] = await Promise.all([
            axios.get(`https://quranapi.pages.dev/api/${nsurah}/${nverse}.json`),
            axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/${nsurah}/${nverse}.json`),
            axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranindopak/${nsurah}/${nverse}.json`)
          ]);
          setNextVerseData({
            
            
            arabic: scripts === 'indopak' ? nres3.data.text : nres2.data.text,
            translation: language === 'english' ? nres.data.english : nres.data.bengali,
            surah: nsurah,
            verse: nverse,
            surahName: nres.data.surahName
          });
        }

      } catch (error) {
        console.error("Error resolving ayah:", error);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [input, language,scripts]);





  return (
    <div>
      {/* {isMobile ? (
        <Headermob
          chapter={chapter}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          input={input}
          handleInputChange={handleInputChange}
        />
      ) : (
        <Header
          chapter={chapter}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          input={input}
          handleInputChange={handleInputChange}
        />
      )} */}
      <Headermob
        chapter={chapter}
        incrementCount={incrementCount}
        decrementCount={decrementCount}
        input={input}
        handleInputChange={handleInputChange}
        language={language}
        setLanguage={setLanguage}
        setScript={setScript}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <MainContent currentVerseData={currentVerseData} ayahNumber={ayahNumber} surah={chapter.no} ayah={chapter.verse} onEnded={incrementCount} tafsir={tafsir} tafsirLoad={tafsirLoad} trans={trans} setIsOpen={setIsOpen}/>
    </div>
  );
}

export default App;
