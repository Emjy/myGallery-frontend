import React, { useState, useEffect, useRef } from "react";

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
      .post("http://localhost:3000/affiches/", formData, {
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

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAffiche(file);
      setPreviewUrl(URL.createObjectURL(file)); // Crée l'URL pour l'aperçu
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
          id="outlined-basic"
          label="Nom du film"
          variant="outlined"
          onChange={(event) => setFilmName(event.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Nom du réalisateur"
          variant="outlined"
          onChange={(event) => setRealName(event.target.value)}
        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick={() => uploadAffiche()}
        >
          Envoi
        </Button>
      </div>
    </div>
  );
}
