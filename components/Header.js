import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import styles from '../styles/Header.module.css';

const NAV_ITEMS = [
  { label: 'Tableaux', href: '/tableaux' },
  { label: 'Photos', href: '/photos' },
  { label: 'Affiches', href: '/affiches' },
  { label: 'Expositions', href: '/expositions' },
];

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.value.token);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/tableaux');
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link href="/tableaux" className={styles.brand}>
          <span className={styles.brandName}>GIRAUD</span>
          <span className={styles.brandSub}>François Giraud — Peintre &amp; Photographe</span>
        </Link>

        <div className={styles.topRight}>
          <Link href="/about" className={styles.topLink}>À propos</Link>
          <Link href="/contact" className={styles.topLink}>Contact</Link>
          {token && (
            <>
              <Link href="/upload" className={styles.adminBadge}>ADMIN</Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
