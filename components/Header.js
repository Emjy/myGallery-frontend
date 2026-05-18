import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={styles.bar}>
        <Link href="/tableaux" className={styles.brand}>
          <Image src="/logob.jpg" alt="Giraud" width={32} height={32} className={styles.logo} priority />
          <span className={styles.brandName}>GIRAUD</span>
        </Link>

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

        <div className={styles.right}>
          <Link href="/about" className={styles.topLink}>À propos</Link>
          <Link href="/contact" className={styles.topLink}>Contact</Link>
          {token ? (
            <>
              <Link href="/upload" className={styles.adminBadge}>ADMIN</Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <Link href="/signIn" className={styles.signinLink}>Connexion</Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
