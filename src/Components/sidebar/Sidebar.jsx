import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth/cordova';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setLanguage, setScript, isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [scriptdrop, setscriptdrop] = useState(false);

  const script1 = [
    { name: "Indo-Pak", value: "indopak" },
    { name: "Uthmani", value: "uthmani" },
  ];

  const languages = [
    { name: "English", value: "english", fileUrl: "/downloads/english.json" },
    { name: "Bengali", value: "bengali", fileUrl: "/downloads/bengali.json" },
  ];

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.log(error);

    }
  }

  const handleLanguage = (value) => {
    setLanguage(value);
    setShowDropdown(false);
    setIsOpen(false);


  }

  const handleScript = (value) => {
    setScript(value);
    setscriptdrop(false);
    setIsOpen(false);
  }

  const handleAboutUs = () => {
    setIsOpen(false)
    navigate('/aboutus');
  }

  return (
    <>
      <button className={styles.hamburger} onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={toggleSidebar}>×</button>
        <ul className={styles.listContainer}>
          <li className={styles.list}><a href="/">Home</a></li>
          <li className={styles.list} onClick={() => scriptdrop ? (setscriptdrop(false)) : (setscriptdrop(true))}>
            Script
          </li>
          <AnimatePresence>
            {scriptdrop && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {script1.map((scr) => (
                  <li className={`${styles.list} ${styles.droplist}`} key={scr.value} onClick={() => handleScript(scr.value)}>
                    {scr.name}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <li className={styles.list} onClick={() => showDropdown ? (setShowDropdown(false)) : (setShowDropdown(true))}>
            Language
          </li>
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {languages.map((lang) => (
                  <li className={`${styles.list} ${styles.droplist}`} key={lang.value} onClick={() => handleLanguage(lang.value)}>
                    {lang.name}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          <li onClick={handleAboutUs} className={styles.list}>About Us</li>
          <li onClick={handleLogout} className={styles.logout}>Logout</li>
        </ul>
      </div>

      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

