import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/AfficheCard.module.css';
import confirm from '../styles/CardConfirm.module.css';

export default function AfficheCard({ affiche, name, real, onDelete }) {
  const [loaded, setLoaded] = useState(false);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {!loaded && <div className={styles.skeleton} />}
        <Image
          src={affiche}
          alt={name || 'Affiche'}
          width={600}
          height={900}
          className={`${styles.image} ${loaded ? styles.imageVisible : styles.imageHidden}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
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
      <div className={styles.info}>
        <div className={styles.filmName}>{name}</div>
        {real && <div className={styles.realName}>{real}</div>}
      </div>
    </div>
  );
}
