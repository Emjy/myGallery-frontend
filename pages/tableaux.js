import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import SkeletonCard from '../components/SkeletonCard';
import TableauCard from '../components/TableauCard';
import AddCard from '../components/AddCard';
import EditModal from '../components/EditModal';
import styles from '../styles/Tableaux.module.css';
import { API_URL } from '../lib/api';
import { staggerContainer, cardVariant, fadeUp } from '../lib/motion';

export default function Tableaux() {
  const router = useRouter();
  const token = useSelector((state) => state.user.value.token);
  const [tableauData, setTableauData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState('date');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/tableaux/`).then((r) => r.json())
      .then((data) => { if (data.result) setTableauData(data.tableaux); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...tableauData].sort((a, b) =>
    sortMethod === 'name' ? a.tableauName.localeCompare(b.tableauName) : new Date(b.creationDate) - new Date(a.creationDate)
  );

  const handleDelete = (id) => {
    fetch(`${API_URL}/tableaux/${id}`, { method: 'POST', headers: { Authorization: token } })
      .then((r) => r.json()).then((data) => { if (data.result) setTableauData((p) => p.filter((t) => t._id !== id)); });
  };

  const handleSave = (id, fields) => {
    fetch(`${API_URL}/tableaux/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: token }, body: JSON.stringify(fields) })
      .then((r) => r.json()).then((data) => {
        if (data.result) { setTableauData((p) => p.map((t) => t._id === id ? { ...t, ...data.tableau } : t)); setEditing(null); }
      });
  };

  return (
    <div className={styles.page}>
      <Header />
      <motion.div className={styles.toolbar} {...fadeUp} transition={{ duration: 0.4, delay: 0.3 }}>
        <div className={styles.toolbarLeft}><span className={styles.label}>Tableaux</span></div>
        <select className={styles.sortSelect} value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
          <option value="date">Plus récent</option>
          <option value="name">A — Z</option>
        </select>
      </motion.div>

      <motion.div className={styles.grid} variants={staggerContainer} initial="initial" animate="animate">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} ratio="4/5" />)
          : <>
            {token && (
              <motion.div className={styles.cardWrapper} variants={cardVariant}>
                <AddCard onClick={() => router.push('/upload?type=tableau')} />
              </motion.div>
            )}
            {sorted.map((item) => (
              <motion.div className={styles.cardWrapper} key={item._id} variants={cardVariant}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}>
                <div className={styles.cell} onClick={() => router.push(`/tableauDetail?id=${item._id}`)}>
                  <TableauCard tableau={item.imageName} name={item.tableauName} auteur={item.auteur} prix={item.prix}
                    onDelete={token ? () => handleDelete(item._id) : undefined} />
                </div>
                {token && <div className={styles.cardActions}><button className={styles.editBtn} onClick={() => setEditing(item)}>✎</button></div>}
              </motion.div>
            ))}
          </>
        }
      </motion.div>

      <AnimatePresence>
        {editing && <EditModal item={editing} type="tableau" onSave={handleSave} onClose={() => setEditing(null)} />}
      </AnimatePresence>
    </div>
  );
}
