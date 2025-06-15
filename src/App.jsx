import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Components/Header';
import { Headermob } from './Components/Headermob';
import { MainContent } from './Components/MainContent';
import verseCounts from './Components/Extra/verseCountsData';
import { Helmet } from 'react-helmet-async';
import { Footer } from './Components/Extra/Footer';

//Scripts
import IndoPak from './Quran/IndoPak.json';
import Uthmani from './Quran/Uthmani.json';
import English from './Quran/English.json';
import bn from './Quran/bn.json';
import EnTrans from './Quran/EnTrans.json';

function App() {


  //useState
  const [surah, setSurah] = useState(() => {
    const savedSurah = localStorage.getItem('surah');
    return savedSurah !== null ? parseInt(savedSurah) : 1;
  });

  const [verse, setVerse] = useState(() => {
    const savedVerse = localStorage.getItem('verse');
    return savedVerse !== null ? parseInt(savedVerse) : 1;
  });

  // Update localStorage whenever surah or verse changes
  useEffect(() => {
    localStorage.setItem('surah', surah.toString());
    localStorage.setItem('verse', verse.toString());
  }, [surah, verse]);



  const [currentVerseData, setCurrentVerseData] = useState({ arabic: '', translation: '', trans: '', tafsir: '' });
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

  useEffect(() => {
    const ssrPreview = document.getElementById('ssr-preview');
    if (ssrPreview) ssrPreview.remove();
  }, []);











  const incrementCount = () => {
    const verseLimit = verseCounts[surah];

    const currentSurah = parseInt(surah);
    const currentVerse = parseInt(verse);

    if (currentSurah > 0 && currentSurah <= 114) {
      if (currentVerse < verseLimit) {
        setVerse(currentVerse + 1);
      } else if (currentSurah < 114) {
        setSurah(currentSurah + 1);
        setVerse(1);
      }
    }
  };


  const decrementCount = () => {
    const currentSurah = parseInt(surah);
    const currentVerse = parseInt(verse);

    if (currentSurah > 0 && currentSurah <= 114) {
      if (currentVerse > 1) {
        setVerse(currentVerse - 1);
      } else if (currentSurah > 1) {
        const previousSurah = currentSurah - 1;
        const lastVerseOfPreviousSurah = verseCounts[previousSurah];
        setSurah(previousSurah);
        setVerse(lastVerseOfPreviousSurah);
      }
    }
  };



  useEffect(() => {
    const data = scripts === "indopak" ? IndoPak : Uthmani;
    const transliterationEn = EnTrans[surah][verse] || "Verse Not Found";
    const translations =
      language === "english"
        ? English[surah]?.[verse] || "Verse Not Found"
        : bn[surah]?.[parseInt(verse) - 1]?.text || "Verse Not Found";
    const verseText = data[surah]?.[verse] || "Verse Not Found";

    // Start lazy-load
    const fetchTafsir = async () => {
      let tafsirText = "";
      const ayahKey = `${surah}:${verse}`;
      try {
        if (language === "english") {
          const tasfirEN = await import('./Quran/tasfirEN.json');
          const tafsirEntry = tasfirEN.default[ayahKey];
          if (typeof tafsirEntry === "string") {
            tafsirText = tasfirEN.default[tafsirEntry]?.text || "";
          } else {
            tafsirText = tafsirEntry?.text || "";
          }
        } else {
          const tasfirBN = await import('./Quran/tasfirBN.json');
          tafsirText = tasfirBN.default[ayahKey]?.text || "";
        }
      } catch (e) {
        tafsirText = "Tafsir could not be loaded.";
      }

      setCurrentVerseData({
        arabic: verseText,
        translation: translations,
        trans: transliterationEn,
        tafsir: tafsirText
      });
    };

    fetchTafsir();
  }, [surah, verse, scripts, language]);










  return (
    <>
      <Helmet>
        <title>PathToQuran - Read/Learn the Quran Online</title>
        <meta name="description" content="PathToQuran is a simple, Quran web app with tafsir, translation, and audio. Learn, listen, and reflect on the Quran." />
        <link rel="canonical" href="https://path-to-quran.com/" />


        <meta property="og:title" content="PathToQuran - Learn/Read the Quran Online" />
        <meta property="og:description" content="Simple, Quran web app with tafsir, translation, and audio." />
        <meta property="og:url" content="https://path-to-quran.com/" />
        <meta property="og:type" content="website" />
        <link rel="alternate" href="https://www.path-to-quran.com/articles/learn-quran" />
        <link rel="alternate" href="https://www.path-to-quran.com/articles/read-quran" />
        
      </Helmet>
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

          incrementCount={incrementCount}
          decrementCount={decrementCount}
          language={language}
          setLanguage={setLanguage}
          setScript={setScript}
          isOpen={isOpen}
          setIsOpen={setIsOpen}


          surah={surah}
          verse={verse}
          setSurah={setSurah}
          setVerse={setVerse}
        />
        <MainContent currentVerseData={currentVerseData} surah={surah} verse={verse} onEnded={incrementCount} setIsOpen={setIsOpen} />
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
