import { useEffect, useRef, useState } from "react";
import styles from './VerseAudio.module.css';
import { FaPlay, FaPause } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function VerseAudio({ surah, ayah, onEnded }) {
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1.0);

  const audioUrl = `https://the-quran-project.github.io/Quran-Audio/Data/1/${surah}_${ayah}.mp3`;

  // Load and autoplay new audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = audioUrl;
    audio.load();

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);

      // Autoplay ONLY if previously playing
      if (isPlaying) {
        audio.play().then(() => {
          animationRef.current = requestAnimationFrame(whilePlaying);
        }).catch((error) => {
          console.log("Autoplay failed:", error);
        });
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      cancelAnimationFrame(animationRef.current);
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      setProgress(0);
    };
  }, [audioUrl]);

  const whilePlaying = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audio.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimelineChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    audioRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  return (
    <div className={styles.container}>
      <audio ref={audioRef} onEnded={onEnded} />

      <button onClick={toggleAudio} className={styles.playButton}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <div className={styles.timelineContainer}>
        <input
          type="range"
          min={0}
          max={duration}
          value={progress}
          step="0.01"
          onChange={handleTimelineChange}
          className={styles.timeline}
        />
        <div className={styles.timeDisplay}>
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className={styles.speedControl}>
        <label className={styles.speedLabel}>
          <BsThreeDotsVertical/>
          <select
            value={speed}
            onChange={handleSpeedChange}
            className={styles.speedSelect}
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
