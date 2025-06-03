import { GiOpenBook } from "react-icons/gi";
import Sidebar from "./sidebar/Sidebar";
import { FaArrowRight , FaArrowLeft } from "react-icons/fa";


import styles from './Headermob.module.css';

export const Headermob = ({
  chapter,
  incrementCount,
  decrementCount,
  input,
  handleInputChange
}) => {
  return (
    <>
      <div className={styles.container}>


        <div className={styles.righticon}>
          {/* <div><GiOpenBook size="2rem" /></div> */}
          <Sidebar></Sidebar>
          <div>
            <div className={styles.iconfont}>AL-QURAN</div>
            {/* <div className={styles.iconfont2}>Shamim Khan</div> */}
          </div>
        </div>




      </div>

      <div className={styles.container}>

        <div className={styles.middle}>

          <div>
            {chapter.name}
          </div>

          <div className={styles.inputWrapper}>

            <input
              type="text"
              placeholder="Enter verse"
              value={input}
              onChange={(e)=>handleInputChange(e)}
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
