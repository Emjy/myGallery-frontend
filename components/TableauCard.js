import Image from 'next/image';
import styles from '../styles/TableauCard.module.css';

export default function TableauCard({ tableau, name, auteur, prix }) {
  return (
    <div className={styles.tableauCard}>
      <Image
        src={tableau}
        alt={name || 'Tableau'}
        width={600}
        height={900}
        className={styles.tableauImage}
        loading="lazy"
      />
      <div className={styles.textOverlay}>
        <div className={styles.tableauName}>{name}</div>
        <div className={styles.auteurName}>{auteur}</div>
        <div className={styles.price}>{prix} €</div>
      </div>
    </div>
  );
}
