import React, { useState, useEffect, useRef } from "react";
import imageCompression from 'browser-image-compression';

// Composants 
import CustomSnackbar from "./customSnackBar";

// Style
import styles from "../styles/UploadAffiche.module.css";

// Composants MUI
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles"; 
// Transfert des data vers cloudinary
import axios from "axios";

export default function UploadFile() {
  const fileInputRef = useRef(); // Créez une référence pour le champ de fichier
  const [affiche, setAffiche] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [filmName, setFilmName] = useState("");
  const [realName, setRealName] = useState("");

  const [open, setOpen] = useState(false)

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  });

  const uploadAffiche = () => {
    const formData = new FormData();
    if (affiche) {
      formData.append("file", affiche);
    }
    formData.append("filmName", filmName);
    formData.append("realName", realName);

    axios.post("https://art-papa-backend.vercel.app/affiches/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        console.log("image uploaded");
        // Réinitialisez vos états ici
        setFilmName("");
        setRealName("");
        setAffiche(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setOpen(true);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 4.9,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg',
        convertSize: 5000000,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        setAffiche(compressedFile);
        setPreviewUrl(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error(error);
      }
    }
  };
 
  return (
    <div className={styles.page}>
      <div className={styles.uploadForm}>
        <Button
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className={styles.formItem}
        >
          Image
        </Button>
        <VisuallyHiddenInput
          type="file"
          onChange={handleChange}
          ref={fileInputRef}
        />

        {previewUrl && (
          <img src={previewUrl} alt="Preview" style={{ maxHeight: "500px" }} />
        )}

        <TextField
          label="Nom du film"
          variant="outlined"
          value={filmName}
          onChange={(event) => setFilmName(event.target.value)}
          className={styles.formItem}
        />

        <TextField
          label="Nom du réalisateur"
          variant="outlined"
          value={realName}
          onChange={(event) => setRealName(event.target.value)}
          className={styles.formItem}
        />

        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={uploadAffiche}
          className={styles.formItem}
        >
          Envoi Affiche
        </Button>

        <CustomSnackbar
          open={open}
          handleClose={() => setOpen(false)}
          message="Affiche envoyée"
          duration={3000}
        />

      </div>
    </div>
  );
}
