import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import styles from '../styles/UploadStyle.module.css';
import { API_URL } from '../lib/api';

const COMPRESS_OPTS = { maxSizeMB: 4.9, maxWidthOrHeight: 1920, useWebWorker: true, fileType: 'image/jpeg' };

export default function UploadPhoto() {
  const token = useSelector((state) => state.user.value.token);
  const fileRef = useRef();
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(0);
  const [over, setOver] = useState(false);

  const addFiles = async (rawFiles) => {
    const items = await Promise.all(Array.from(rawFiles).map(async (f) => {
      const compressed = await imageCompression(f, COMPRESS_OPTS);
      return { file: compressed, preview: URL.createObjectURL(compressed), fields: {} };
    }));
    setQueue((q) => [...q, ...items]);
  };

  const updateField = (idx, key, val) =>
    setQueue((q) => q.map((item, i) => i === idx ? { ...item, fields: { ...item.fields, [key]: val } } : item));

  const remove = (idx) => setQueue((q) => q.filter((_, i) => i !== idx));

  const submitAll = async () => {
    setLoading(true);
    let count = 0;
    for (const item of queue) {
      const fd = new FormData();
      fd.append('file', item.file);
      fd.append('photoName', item.fields.photoName || '');
      fd.append('auteur', item.fields.auteur || '');
      fd.append('prix', item.fields.prix || '');
      await axios.post(`${API_URL}/photos/`, fd, { headers: { Authorization: token } });
      count++;
      setDone(count);
    }
    setQueue([]);
    setLoading(false);
  };

  const handleDrop = (e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); };

  if (queue.length === 0) {
    return (
      <div className={`${styles.dropzone} ${over ? styles.dropzoneOver : ''}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)} onDrop={handleDrop}>
        <input className={styles.fileInput} type="file" accept="image/*" multiple
          ref={fileRef} onChange={(e) => addFiles(e.target.files)} />
        <span className={styles.dropzoneIcon}>+</span>
        <span className={styles.dropzoneLabel}>Glisser les images ici</span>
        <span className={styles.dropzoneHint}>ou cliquer — sélection multiple possible</span>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      {loading && (
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(done / queue.length) * 100}%` }} />
          <span className={styles.progressLabel}>{done} / {queue.length} envoyées</span>
        </div>
      )}

      <div className={styles.multiGrid}>
        {queue.map((item, idx) => (
          <div className={styles.multiItem} key={idx}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.preview} alt="" className={styles.multiPreview} />
            <button className={styles.removeBtn} onClick={() => remove(idx)}>×</button>
            <div className={styles.multiFields}>
              <input className={styles.input} type="text" placeholder="Titre *"
                value={item.fields.photoName || ''} onChange={(e) => updateField(idx, 'photoName', e.target.value)} />
              <input className={styles.input} type="text" placeholder="Auteur"
                value={item.fields.auteur || ''} onChange={(e) => updateField(idx, 'auteur', e.target.value)} />
              <input className={styles.input} type="text" placeholder="Prix (€)"
                value={item.fields.prix || ''} onChange={(e) => updateField(idx, 'prix', e.target.value)} />
            </div>
          </div>
        ))}
        <label className={styles.addMore}>
          <input type="file" accept="image/*" multiple style={{ display: 'none' }}
            onChange={(e) => addFiles(e.target.files)} />
          +
        </label>
      </div>

      <button className={styles.submitBtn} onClick={submitAll}
        disabled={loading || queue.every(i => !i.fields.photoName)}>
        {loading ? `Envoi… (${done}/${queue.length})` : `Publier ${queue.length} photo${queue.length > 1 ? 's' : ''}`}
      </button>
    </div>
  );
}
