import styles from '../styles/AddCard.module.css';

export default function AddCard({ onClick }) {
  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <span className={styles.plus}>+</span>
    </div>
  );
}
