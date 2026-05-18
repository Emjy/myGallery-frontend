import React from 'react';
import Header from '../components/Header';
import styles from '../styles/About.module.css';

export default function About() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.hero}>
        <div className={styles.textCol}>
          <span className={styles.eyebrow}>Artiste</span>
          <h1 className={styles.name}>François Giraud</h1>
          <p className={styles.tagline}>Peintre &amp; Photographe</p>
          <div className={styles.divider} />
          <p className={styles.body}>
            François Giraud crée des œuvres à la frontière de la peinture et de la photographie,
            explorant la lumière, la matière et le temps à travers des séries intimistes et des
            compositions graphiques.
          </p>
          <p className={styles.copyright}>
            © {year} François Giraud — Tous droits réservés.<br />
            François Giraud détient tous les droits d&apos;auteur sur ses œuvres, y compris les droits
            sur l&apos;image. Toute reproduction, diffusion ou utilisation commerciale des images
            de ses œuvres est interdite sans autorisation préalable et écrite.
          </p>
        </div>
        <div className={styles.visual}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="François Giraud" className={styles.logo} />
        </div>
      </div>
    </div>
  );
}
