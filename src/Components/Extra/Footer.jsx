import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <div className={styles.legalLinks}>
            <Link to="/privacy-policy" className={styles.link}>Privacy Policy</Link>
            <span className={styles.separator}>|</span>
            <Link to="/terms" className={styles.link}>Terms</Link>
        </div>
    );
}