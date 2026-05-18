import Image from 'next/image';
import styles from '../styles/AfficheCard.module.css';

export default function AfficheCard({ affiche, name, real, onDelete }) {
  return (
    <div className={styles.card}>
      <Image
        src={affiche}
        alt={name || 'Affiche'}
        width={600}
        height={900}
        className={styles.image}
        loading="lazy"
        style={{ width: '100%', height: '100%' }}
      />
      <div className={styles.overlay} />
      <div className={styles.text}>
        <div className={styles.filmName}>{name}</div>
        {real && <div className={styles.realName}>{real}</div>}
      </div>
      {onDelete && (
        <button
          className={styles.deleteBtn}
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          aria-label="Supprimer"
        >
          ×
        </button>
      )}
    </div>
  );
}
