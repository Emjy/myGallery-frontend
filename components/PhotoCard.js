import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/PhotoCard.module.css';
import confirm from '../styles/CardConfirm.module.css';

export default function PhotoCard({ photo, name, auteur, prix, onDelete }) {
  const [loaded, setLoaded] = useState(false);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className={styles.card}>
      <Image
        src={photo}
        alt={name || 'Photo'}
        width={800}
        height={600}
        className={`${styles.image} ${loaded ? styles.imageVisible : styles.imageHidden}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, (max-width: 1400px) 33vw, 25vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className={styles.overlay} />
      <div className={styles.text}>
        <div className={styles.photoName}>{name}</div>
        {auteur && <div className={styles.auteurName}>{auteur}</div>}
        {prix !== undefined && prix !== null && prix !== '' && (
          <div className={styles.price}>{prix} €</div>
        )}
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
