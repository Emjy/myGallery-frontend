import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SkeletonCard from '../components/SkeletonCard';
import ExpoCard from '../components/ExpoCard';
import AddCard from '../components/AddCard';
import EditModal from '../components/EditModal';
import styles from '../styles/Expos.module.css';
import { API_URL } from '../lib/api';

export default function Expositions() {
  const router = useRouter();
  const token = useSelector((state) => state.user.value.token);
  const [exposData, setExposData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/expositions/`)
      .then((r) => r.json())
      .then((data) => {
        if (data.result) setExposData([...data.expos].sort((a, b) => new Date(b.startDate) - new Date(a.startDate)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_URL}/expositions/${id}`, { method: 'POST', headers: { Authorization: token } })
      .then((r) => r.json())
      .then((data) => { if (data.result) setExposData((prev) => prev.filter((e) => e._id !== id)); });
  };

  const handleSave = (id, fields) => {
    fetch(`${API_URL}/expositions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(fields),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.result) {
          setExposData((prev) => prev.map((e) => e._id === id ? { ...e, ...data.expo } : e));
          setEditing(null);
        }
      });
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.toolbar}>
        <span className={styles.label}>Expositions</span>
      </div>

      <div className={styles.list}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.skeletonExpo}>
                <SkeletonCard ratio="3/2" />
              </div>
            ))
          : <>
            {exposData.map((item) => (
              <div className={styles.expoWrapper} key={item._id}>
                <ExpoCard
                  expoImg={item.imageCouv}
                  expoName={item.expoName}
                  auteur={item.auteur}
                  adresse={item.adresse}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  onDelete={token ? () => handleDelete(item._id) : undefined}
                />
                {token && (
                  <div className={styles.cardActions}>
                    <button className={styles.editBtn} onClick={() => setEditing(item)} aria-label="Modifier">
                      ✎ Modifier
                    </button>
                  </div>
                )}
              </div>
            ))}
            {exposData.length === 0 && (
              <div className={styles.empty}>Pas d&apos;expositions pour le moment</div>
            )}
          </>
        }
      </div>

      {token && (
        <div className={styles.addRow}>
          <button className={styles.addBtn} onClick={() => router.push('/upload?type=expo')}>
            + Ajouter une exposition
          </button>
        </div>
      )}

      {editing && (
        <EditModal
          item={editing}
          type="expo"
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
