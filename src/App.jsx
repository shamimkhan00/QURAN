import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import './App.css';
import { Header } from './Components/Header';
import { Headermob } from './Components/Headermob';
import { MainContent } from './Components/MainContent';


function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [chapter, setChapter] = useState({ name: '', no: '', verse: '' });
  const [currentVerseData, setCurrentVerseData] = useState({ arabic: '', translation: '' });
  const [ayahNumber, setAyahNumber] = useState(1);
  const [input, setInput] = useState('');

  const incrementCount = () => setAyahNumber(prev => prev + 1);
  const decrementCount = () => setAyahNumber(prev => prev - 1);
  const handleInputChange = (e) => setInput(e.target.value);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const [surahStr, verseStr] = input.split(":");
      const surah = parseInt(surahStr);
      const verse = parseInt(verseStr);
      if (!surah || !verse) return;

      try {
        const res = await axios.get(`https://api.alquran.cloud/v1/ayah/${surah}:${verse}/en.asad`);
        const ayah = res.data.data.number;
        setAyahNumber(ayah);
      } catch (error) {
        console.error("Error resolving ayah:", error);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [input]);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const [arabicRes, englishRes] = await Promise.all([
          axios.get(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar.asad`),
          axios.get(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/en.sahih`)
        ]);

        setCurrentVerseData({
          arabic: arabicRes.data.data.text,
          translation: englishRes.data.data.text
        });

        const surah = englishRes.data.data.surah;
        setChapter({
          name: surah.englishName,
          no: surah.number,
          verse: englishRes.data.data.numberInSurah
        });

        setInput(`${surah.number}:${englishRes.data.data.numberInSurah}`);
      } catch (error) {
        console.error("Error fetching verse:", error);
      }
    };

    fetchVerse();
  }, [ayahNumber]);

  return (
    <div>
      {isMobile ? (
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
      )}
      <MainContent currentVerseData={currentVerseData} ayahNumber={ayahNumber} />
    </div>
  );
}

export default App;
