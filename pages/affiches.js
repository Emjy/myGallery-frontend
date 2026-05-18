import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import AfficheCard from '../components/AfficheCard';
import SkeletonCard from '../components/SkeletonCard';
import AddCard from '../components/AddCard';
import EditModal from '../components/EditModal';
import Header from '../components/Header';
import styles from '../styles/Affiches.module.css';
import { API_URL } from '../lib/api';
import { staggerContainer, cardVariant, fadeUp } from '../lib/motion';

export default function Affiches() {
  const router = useRouter();
  const token = useSelector((state) => state.user.value.token);
  const [affichesData, setAffichesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [lightbox, setLightbox] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/affiches/`).then((r) => r.json())
      .then((data) => { if (data.result) setAffichesData(data.affiches); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...affichesData].sort((a, b) =>
    sortMethod === 'name' ? a.filmName.localeCompare(b.filmName) : new Date(b.creationDate) - new Date(a.creationDate)
  );
  const filtered = sorted.filter((i) => i.filmName.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = (id) => {
    fetch(`${API_URL}/affiches/${id}`, { method: 'POST', headers: { Authorization: token } })
      .then((r) => r.json()).then((data) => { if (data.result) setAffichesData((p) => p.filter((a) => a._id !== id)); });
  };

  const handleSave = (id, fields) => {
    fetch(`${API_URL}/affiches/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: token }, body: JSON.stringify(fields) })
      .then((r) => r.json()).then((data) => {
        if (data.result) { setAffichesData((p) => p.map((a) => a._id === id ? { ...a, ...data.affiche } : a)); setEditing(null); }
      });
  };

  return (
    <div className={styles.page}>
      <Header />
      <motion.div className={styles.toolbar} {...fadeUp} transition={{ duration: 0.4, delay: 0.3 }}>
        <div className={styles.toolbarLeft}>
          <span className={styles.label}>Affiches</span>
          <input className={styles.searchInput} type="text" placeholder="Rechercher…"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select className={styles.sortSelect} value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
          <option value="date">Plus récent</option>
          <option value="name">A — Z</option>
        </select>
      </motion.div>

      <motion.div className={styles.grid} variants={staggerContainer} initial="initial" animate="animate">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} ratio="2/3" />)
          : <>
            {token && (
              <motion.div className={styles.cardWrapper} variants={cardVariant}>
                <AddCard onClick={() => router.push('/upload?type=affiche')} />
              </motion.div>
            )}
            {filtered.map((item) => (
              <motion.div className={styles.cardWrapper} key={item._id} variants={cardVariant}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}>
                <div className={styles.cell} onClick={() => setLightbox(item.imageName)}>
                  <AfficheCard affiche={item.imageName} name={item.filmName} real={item.realName}
                    onDelete={token ? () => handleDelete(item._id) : undefined} />
                </div>
                {token && <div className={styles.cardActions}><button className={styles.editBtn} onClick={() => setEditing(item)}>✎</button></div>}
              </motion.div>
            ))}
          </>
        }
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div className={styles.lightbox} onClick={() => setLightbox('')}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <motion.img src={lightbox} alt="Affiche" className={styles.lightboxImg}
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }} transition={{ duration: 0.3 }} />
            <button className={styles.lightboxClose} onClick={() => setLightbox('')}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {editing && <EditModal item={editing} type="affiche" onSave={handleSave} onClose={() => setEditing(null)} />}
      </AnimatePresence>
    </div>
  );
}
