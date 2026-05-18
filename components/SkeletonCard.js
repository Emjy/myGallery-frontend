import styles from '../styles/SkeletonCard.module.css';

export default function SkeletonCard({ ratio = '3/4' }) {
  return (
    <div className={styles.card}>
      <div className={styles.image} style={{ aspectRatio: ratio }} />
      <div className={styles.line} style={{ width: '60%', marginTop: 10 }} />
      <div className={styles.line} style={{ width: '40%' }} />
    </div>
  );
}
