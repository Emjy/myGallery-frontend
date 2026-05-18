import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import styles from '../styles/UploadStyle.module.css';
import { API_URL } from '../lib/api';

const COMPRESS_OPTS = { maxSizeMB: 4.9, maxWidthOrHeight: 1920, useWebWorker: true, fileType: 'image/jpeg' };

export default function UploadExpo() {
  const token = useSelector((state) => state.user.value.token);
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [expoName, setExpoName] = useState('');
  const [auteur, setAuteur] = useState('');
  const [adresse, setAdresse] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [over, setOver] = useState(false);

  const processFile = async (raw) => {
    const compressed = await imageCompression(raw, COMPRESS_OPTS);
    setFile(compressed);
    setPreview(URL.createObjectURL(compressed));
    setSuccess(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('expoName', expoName);
    fd.append('auteur', auteur);
    fd.append('adresse', adresse);
    fd.append('startDate', startDate);
    fd.append('endDate', endDate);
    fd.append('description', description);
    try {
      await axios.post(`${API_URL}/expositions/`, fd, { headers: { Authorization: token } });
      setFile(null); setPreview(''); setExpoName(''); setAuteur('');
      setAdresse(''); setStartDate(''); setEndDate(''); setDescription('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } finally {
      setLoading(false);
    }
  };

  if (!preview) {
    return (
      <div
        className={`${styles.dropzone} ${over ? styles.dropzoneOver : ''}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={handleDrop}
      >
        <input className={styles.fileInput} type="file" accept="image/*"
          ref={fileRef} onChange={(e) => e.target.files[0] && processFile(e.target.files[0])} />
        <span className={styles.dropzoneIcon}>+</span>
        <span className={styles.dropzoneLabel}>Glisser l'image de couverture ici</span>
        <span className={styles.dropzoneHint}>ou cliquer pour parcourir</span>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <div className={styles.layout}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Aperçu" className={styles.preview} />
          <button className={styles.changeImg}>
            Changer l'image
            <input className={styles.changeImgInput} type="file" accept="image/*"
              onChange={(e) => e.target.files[0] && processFile(e.target.files[0])} />
          </button>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label}>Nom de l'exposition</label>
            <input className={styles.input} type="text" value={expoName}
              onChange={(e) => setExpoName(e.target.value)} placeholder="Titre de l'expo" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Auteur</label>
            <input className={styles.input} type="text" value={auteur}
              onChange={(e) => setAuteur(e.target.value)} placeholder="François Giraud" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Adresse</label>
            <input className={styles.input} type="text" value={adresse}
              onChange={(e) => setAdresse(e.target.value)} placeholder="Galerie X, Paris" />
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Date début</label>
              <input className={styles.input} type="date" value={startDate}
                onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Date fin</label>
              <input className={styles.input} type="date" value={endDate}
                onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea className={styles.textarea} value={description}
              onChange={(e) => setDescription(e.target.value)} rows={3}
              placeholder="Description de l'exposition…" />
          </div>

          <button className={styles.submitBtn} onClick={handleSubmit}
            disabled={loading || !expoName}>
            {loading ? 'Envoi en cours…' : 'Publier l\'exposition'}
          </button>

          {success && <p className={styles.success}>Exposition publiée avec succès.</p>}
        </div>
      </div>
    </div>
  );
}
