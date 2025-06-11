// src/SignIn.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../../firebase';
import styles from './SignIn.module.css';
import { setDoc , doc } from 'firebase/firestore';

export default function SignUp() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(null);
  const [name,setName] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMsg('Signup successfull!');
      setShowModal(false);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
          email:user.email,
          fName:name
        });
      }
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.signInButton}>
        Sign Up
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>X</button>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
              <input
                type="text"
                placeholder="User Name"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <button type="submit" className={styles.submitButton}>Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
