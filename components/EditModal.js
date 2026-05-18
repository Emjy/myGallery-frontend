import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/EditModal.module.css';
import { modalVariant, fadeIn } from '../lib/motion';

export default function EditModal({ item, type, onSave, onClose }) {
  const [fields, setFields] = useState({});

  useEffect(() => {
    if (!item) return;
    if (type === 'tableau') {
      setFields({ tableauName: item.tableauName || '', auteur: item.auteur || '', prix: item.prix || '', description: item.description || '' });
    } else if (type === 'affiche') {
      setFields({ filmName: item.filmName || '', realName: item.realName || '' });
    } else if (type === 'poster') {
      setFields({ posterName: item.posterName || '' });
    } else if (type === 'photo') {
      setFields({ photoName: item.photoName || '', auteur: item.auteur || '', prix: item.prix || '' });
    } else if (type === 'expo') {
      setFields({
        expoName: item.expoName || '', auteur: item.auteur || '',
        adresse: item.adresse || '', startDate: item.startDate ? item.startDate.slice(0, 10) : '',
        endDate: item.endDate ? item.endDate.slice(0, 10) : '', description: item.description || '',
      });
    }
  }, [item, type]);

  const set = (key, val) => setFields((f) => ({ ...f, [key]: val }));

  if (!item) return null;

  return (
    <motion.div className={styles.backdrop} onClick={onClose} {...fadeIn} transition={{ duration: 0.2 }}>
      <motion.div className={styles.panel} onClick={(e) => e.stopPropagation()} variants={modalVariant}
        initial="initial" animate="animate" exit="exit">
        <button className={styles.close} onClick={onClose}>×</button>
        <h2 className={styles.title}>Modifier</h2>

        <div className={styles.fields}>
          {type === 'tableau' && <>
            <Field label="Titre" value={fields.tableauName} onChange={(v) => set('tableauName', v)} />
            <Field label="Auteur" value={fields.auteur} onChange={(v) => set('auteur', v)} />
            <Field label="Prix (€)" value={fields.prix} onChange={(v) => set('prix', v)} />
            <Field label="Description" value={fields.description} onChange={(v) => set('description', v)} multiline />
          </>}
          {type === 'affiche' && <>
            <Field label="Titre du film" value={fields.filmName} onChange={(v) => set('filmName', v)} />
            <Field label="Réalisateur" value={fields.realName} onChange={(v) => set('realName', v)} />
          </>}
          {type === 'poster' && <>
            <Field label="Titre" value={fields.posterName} onChange={(v) => set('posterName', v)} />
          </>}
          {type === 'photo' && <>
            <Field label="Titre" value={fields.photoName} onChange={(v) => set('photoName', v)} />
            <Field label="Auteur" value={fields.auteur} onChange={(v) => set('auteur', v)} />
            <Field label="Prix (€)" value={fields.prix} onChange={(v) => set('prix', v)} />
          </>}
          {type === 'expo' && <>
            <Field label="Nom de l'expo" value={fields.expoName} onChange={(v) => set('expoName', v)} />
            <Field label="Auteur" value={fields.auteur} onChange={(v) => set('auteur', v)} />
            <Field label="Adresse" value={fields.adresse} onChange={(v) => set('adresse', v)} />
            <Field label="Date début" value={fields.startDate} onChange={(v) => set('startDate', v)} type="date" />
            <Field label="Date fin" value={fields.endDate} onChange={(v) => set('endDate', v)} type="date" />
            <Field label="Description" value={fields.description} onChange={(v) => set('description', v)} multiline />
          </>}
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Annuler</button>
          <button className={styles.saveBtn} onClick={() => onSave(item._id, fields)}>Enregistrer</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, value, onChange, multiline, type = 'text' }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {multiline ? (
        <textarea className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <input className={styles.input} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}
