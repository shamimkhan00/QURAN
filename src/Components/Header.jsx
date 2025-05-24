import { GiOpenBook } from "react-icons/gi";
import styles from './Header.module.css';

export const Header = ({
  chapter,
  incrementCount,
  decrementCount,
  input,
  handleInputChange
}) => {
  return (
    <div className={styles.container}>
      
      
      <div className={styles.righticon}>
        <div><GiOpenBook size="2rem" /></div>
        <div>
          <div className={styles.iconfont}>AL-QURAN</div>
          <div className={styles.iconfont2}>Shamim Khan</div>
        </div>
      </div>

      <div className={styles.middle}>
        {chapter.name}
        <br />
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter verse"
            value={input}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.btncontainer}>
        <button className={styles.btn} onClick={decrementCount}>Previous</button>
        <button className={styles.btn} onClick={incrementCount}>Next</button>
      </div>
    </div>
  );
};
