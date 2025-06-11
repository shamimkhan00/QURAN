// src/Components/Extra/SignIn.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import styles from './SignIn.module.css';

export default function SignInButton({setShowUser}) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [name,setName] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // alert(`Signed in as: ${userCredential.user.email}`);

      setError(null);
      // setEmail('');
      // setPassword('');
      setShowModal(false); // close modal on success
      setShowUser(true);
      
    } catch (err) {
      setError("Wrong Credential / Try Again");
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.signInButton}>
        Sign In
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>X</button>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitButton}>Login</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
