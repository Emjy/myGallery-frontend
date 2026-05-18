import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import SkeletonCard from '../components/SkeletonCard';
import PhotoCard from '../components/PhotoCard';
import AddCard from '../components/AddCard';
import EditModal from '../components/EditModal';
import styles from '../styles/Photos.module.css';
import { API_URL } from '../lib/api';
import { fadeUp } from '../lib/motion';

const ResponsiveMasonry = dynamic(
  () => import('react-responsive-masonry').then((m) => m.ResponsiveMasonry), { ssr: false }
);
const Masonry = dynamic(
  () => import('react-responsive-masonry').then((m) => m.default), { ssr: false }
);

export default function Photos() {
  const router = useRouter();
  const token = useSelector((state) => state.user.value.token);
  const [photoData, setPhotoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/photos/`)
      .then((r) => r.json())
      .then((data) => {
        if (data.result) setPhotoData([...data.photos].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_URL}/photos/${id}`, { method: 'POST', headers: { Authorization: token } })
      .then((r) => r.json())
      .then((data) => { if (data.result) setPhotoData((prev) => prev.filter((p) => p._id !== id)); });
  };

  const handleSave = (id, fields) => {
    fetch(`${API_URL}/photos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(fields),
    }).then((r) => r.json()).then((data) => {
      if (data.result) {
        setPhotoData((prev) => prev.map((p) => p._id === id ? { ...p, ...data.photo } : p));
        setEditing(null);
      }
    });
  };

  return (
    <div className={styles.page}>
      <Header />

      <motion.div className={styles.toolbar} {...fadeUp} transition={{ duration: 0.4, delay: 0.3 }}>
        <span className={styles.label}>Photographies</span>
      </motion.div>

      {loading ? (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} ratio={i % 3 === 0 ? '4/5' : i % 2 === 0 ? '1/1' : '3/4'} />)}
        </div>
      ) : photoData.length > 0 ? (
        <motion.div className={styles.masonry} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 700: 2, 1050: 3, 1400: 4 }}>
            <Masonry gutter="8px">
              {photoData.map((item, i) => (
                <motion.div className={styles.photoWrapper} key={item._id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                  <div className={styles.photoItem} onClick={() => setLightbox(item.imageName)}>
                    <PhotoCard photo={item.imageName} name={item.photoName} auteur={item.auteur} prix={item.prix}
                      onDelete={token ? () => handleDelete(item._id) : undefined} />
                  </div>
                  {token && (
                    <div className={styles.cardActions}>
                      <button className={styles.editBtn} onClick={() => setEditing(item)}>✎</button>
                    </div>
                  )}
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </motion.div>
      ) : (
        <div className={styles.empty}>Pas de photos pour le moment</div>
      )}

      {token && (
        <motion.div className={styles.addRow} {...fadeUp} transition={{ duration: 0.4, delay: 0.5 }}>
          <button className={styles.addBtn} onClick={() => router.push('/upload?type=photo')}>
            + Ajouter une photo
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div className={styles.lightbox} onClick={() => setLightbox('')}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <motion.img src={lightbox} alt="Photo plein écran" className={styles.lightboxImg}
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }} transition={{ duration: 0.3 }} />
            <button className={styles.lightboxClose} onClick={() => setLightbox('')}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editing && <EditModal item={editing} type="photo" onSave={handleSave} onClose={() => setEditing(null)} />}
      </AnimatePresence>
    </div>
  );
}
