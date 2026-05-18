import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/PosterCard.module.css';
import confirm from '../styles/CardConfirm.module.css';

export default function PosterCard({ poster, name, onDelete }) {
  const [loaded, setLoaded] = useState(false);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className={styles.card}>
      {!loaded && <div className={styles.skeleton} />}
      <Image
        src={poster}
        alt={name || 'Poster'}
        width={600}
        height={900}
        className={`${styles.image} ${loaded ? styles.imageVisible : styles.imageHidden}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ width: '100%', height: '100%' }}
      />
      <div className={styles.overlay} />
      <div className={styles.text}>
        <div className={styles.posterName}>{name}</div>
      </div>
      {onDelete && !confirming && (
        <button
          className={styles.deleteBtn}
          onClick={(e) => { e.stopPropagation(); setConfirming(true); }}
          aria-label="Supprimer"
        >
          ×
        </button>
      )}
      {confirming && (
        <div className={confirm.confirmOverlay} onClick={(e) => e.stopPropagation()}>
          <span className={confirm.confirmText}>Supprimer ?</span>
          <div className={confirm.confirmBtns}>
            <button className={confirm.confirmYes} onClick={(e) => { e.stopPropagation(); onDelete(); }}>Oui</button>
            <button className={confirm.confirmNo} onClick={(e) => { e.stopPropagation(); setConfirming(false); }}>Non</button>
          </div>
        </div>
      )}
    </div>
  );
}
