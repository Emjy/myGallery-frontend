import React from 'react';
import Header from '../components/Header';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  return (
    <div>
      <Header />
      <div className={styles.page}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>Contact</p>
          <h1 className={styles.title}>Prendre contact</h1>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Email</span>
            <span className={styles.contactValue}>
              <a href="mailto:giraudliard@gmail.com">giraudliard@gmail.com</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
