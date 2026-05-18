import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import PosterCard from '../components/PosterCard';
import SkeletonCard from '../components/SkeletonCard';
import AddCard from '../components/AddCard';
import EditModal from '../components/EditModal';
import Header from '../components/Header';
import styles from '../styles/Posters.module.css';
import { API_URL } from '../lib/api';
import { staggerContainer, cardVariant, fadeUp } from '../lib/motion';

export default function Posters() {
  const router = useRouter();
  const token = useSelector((state) => state.user.value.token);
  const [postersData, setPostersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [lightbox, setLightbox] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posters/`).then((r) => r.json())
      .then((data) => { if (data.result) setPostersData(data.posters); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...postersData].sort((a, b) =>
    sortMethod === 'name' ? a.posterName.localeCompare(b.posterName) : new Date(b.creationDate) - new Date(a.creationDate)
  );
  const filtered = sorted.filter((i) => i.posterName.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = (id) => {
    fetch(`${API_URL}/posters/${id}`, { method: 'POST', headers: { Authorization: token } })
      .then((r) => r.json()).then((data) => { if (data.result) setPostersData((p) => p.filter((x) => x._id !== id)); });
  };

  const handleSave = (id, fields) => {
    fetch(`${API_URL}/posters/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: token }, body: JSON.stringify(fields) })
      .then((r) => r.json()).then((data) => {
        if (data.result) { setPostersData((p) => p.map((x) => x._id === id ? { ...x, ...data.poster } : x)); setEditing(null); }
      });
  };

  return (
    <div className={styles.page}>
      <Header />
      <motion.div className={styles.toolbar} {...fadeUp} transition={{ duration: 0.4, delay: 0.3 }}>
        <div className={styles.toolbarLeft}>
          <span className={styles.label}>Posters</span>
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
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} ratio="3/4" />)
          : <>
            {token && (
              <motion.div className={styles.cardWrapper} variants={cardVariant}>
                <AddCard onClick={() => router.push('/upload?type=poster')} />
              </motion.div>
            )}
            {filtered.map((item) => (
              <motion.div className={styles.cardWrapper} key={item._id} variants={cardVariant}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}>
                <div className={styles.cell} onClick={() => setLightbox(item.imageName)}>
                  <PosterCard poster={item.imageName} name={item.posterName}
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
            <motion.img src={lightbox} alt="Poster" className={styles.lightboxImg}
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }} transition={{ duration: 0.3 }} />
            <button className={styles.lightboxClose} onClick={() => setLightbox('')}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {editing && <EditModal item={editing} type="poster" onSave={handleSave} onClose={() => setEditing(null)} />}
      </AnimatePresence>
    </div>
  );
}
