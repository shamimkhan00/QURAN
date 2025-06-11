import { GiOpenBook } from "react-icons/gi";
import Sidebar from "./sidebar/Sidebar";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import SignIn from './Extra/SignIn.jsx';
import SignUp from "./Extra/Signup.jsx";
import { ProfileName } from "./ProfileName.jsx";
import styles from './Headermob.module.css';
import { useEffect, useState } from "react";
import { auth } from "../firebase.js";

export const Headermob = ({
  chapter,
  incrementCount,
  decrementCount,
  input,
  handleInputChange,
  setLanguage,
  setScript,
  isOpen,
  setIsOpen
}) => {

  const [loading, setLoading] = useState(true);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);

      if (user) {
        setShowUser(true)
      } else {
        setShowUser(false)
      }
      setLoading(false);
    })
  });






  return (
    <>
      <div className={styles.container}>


        <div className={styles.righticon}>
          {/* <div><GiOpenBook size="2rem" /></div> */}
          <Sidebar setLanguage={setLanguage} setScript={setScript} isOpen={isOpen}
            setIsOpen={setIsOpen}></Sidebar>
          <div>
            <div className={styles.iconfont}>AL-QURAN</div>
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

          <div>
            {chapter.name}
          </div>

          <div className={styles.inputWrapper}>

            <input
              type="text"
              placeholder="Enter verse"
              value={input}
              onChange={(e) => handleInputChange(e)}
              className={styles.input}
            />
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
