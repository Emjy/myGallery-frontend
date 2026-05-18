import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import styles from '../styles/UploadStyle.module.css';
import { API_URL } from '../lib/api';

const COMPRESS_OPTS = { maxSizeMB: 4.9, maxWidthOrHeight: 1920, useWebWorker: true, fileType: 'image/jpeg' };

function useQueue(onUpload) {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(0);

  const addFiles = async (rawFiles) => {
    const items = await Promise.all(Array.from(rawFiles).map(async (f) => {
      const compressed = await imageCompression(f, COMPRESS_OPTS);
      return { file: compressed, preview: URL.createObjectURL(compressed), fields: {} };
    }));
    setQueue((q) => [...q, ...items]);
    setDone(0);
  };

  const updateField = (idx, key, val) =>
    setQueue((q) => q.map((item, i) => i === idx ? { ...item, fields: { ...item.fields, [key]: val } } : item));

  const remove = (idx) => setQueue((q) => q.filter((_, i) => i !== idx));

  const submitAll = async () => {
    setLoading(true);
    let count = 0;
    for (const item of queue) {
      await onUpload(item);
      count++;
      setDone(count);
    }
    setQueue([]);
    setLoading(false);
  };

  return { queue, loading, done, addFiles, updateField, remove, submitAll };
}

export default function UploadAffiche() {
  const fileRef = useRef();
  const [over, setOver] = useState(false);

  const { queue, loading, done, addFiles, updateField, remove, submitAll } = useQueue(async (item) => {
    const fd = new FormData();
    fd.append('file', item.file);
    fd.append('filmName', item.fields.filmName || '');
    fd.append('realName', item.fields.realName || '');
    await axios.post(`${API_URL}/affiches/`, fd);
  });

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
              <input className={styles.input} type="text" placeholder="Titre du film"
                value={item.fields.filmName || ''} onChange={(e) => updateField(idx, 'filmName', e.target.value)} />
              <input className={styles.input} type="text" placeholder="Réalisateur"
                value={item.fields.realName || ''} onChange={(e) => updateField(idx, 'realName', e.target.value)} />
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
        disabled={loading || queue.every(i => !i.fields.filmName)}>
        {loading ? `Envoi en cours… (${done}/${queue.length})` : `Publier ${queue.length} affiche${queue.length > 1 ? 's' : ''}`}
      </button>
    </div>
  );
}
