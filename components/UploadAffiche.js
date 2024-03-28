import React, { useState, useEffect, useRef } from "react";
import imageCompression from 'browser-image-compression';


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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
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

    axios
      .post("https://art-papa-backend.vercel.app/affiches/", formData, {
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
        // Réinitialisez le champ de fichier
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      })
      .catch((error) => console.log(error));
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 4.9, // Taille maximale en MegaBytes
        maxWidthOrHeight: 1920, // Largeur ou hauteur maximale en pixels
        useWebWorker: true,
        fileType: 'image/jpeg', // Conversion en JPEG
        convertSize: 5000000, // Convertir les images plus grandes que 5 MB en JPEG (si elles ne sont pas déjà en JPEG)
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
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AddPhotoAlternateIcon />}
          ref={fileInputRef}
          onChange={(event) => handleChange(event)}
          className={styles.formItem}

        >
          Image
          <VisuallyHiddenInput type="file" />
        </Button>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{ display: "block", maxHeight: "500px" }}
          />
        )}

        <TextField
          id="outlined-basic-1"
          label="Nom du film"
          variant="outlined"
          value={filmName}
          onChange={(event) => setFilmName(event.target.value)}
          className={styles.formItem}

        />

        <TextField
          id="outlined-basic-2"
          label="Nom du réalisateur"
          variant="outlined"
          value={realName}
          onChange={(event) => setRealName(event.target.value)}
          className={styles.formItem}

        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick={() => uploadAffiche()}
          className={styles.formItem}
        >
          Envoi Affiche
        </Button>
      </div>
    </div>
  );
}
