import React, { useState, useEffect, useRef } from "react";

// Style
import styles from "../styles/UploadTableau.module.css";

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
  const [tableau, setTableau] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [tableauName, setTableauName] = useState("");
  const [auteur, setAuteur] = useState("");
  const [price, setPrice] = useState(0);

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

  const uploadTableau = () => {
    const formData = new FormData();
    if (tableau) {
      formData.append("file", tableau);
    }
    formData.append("tableauName", tableauName);
    formData.append("auteur", auteur);

    axios
      .post("http://localhost:3000/tableaux/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("image uploaded");
        // Réinitialisez vos états ici
        setTableauName("");
        setAuteur("");
        setTableau(null);
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
      setTableau(file);
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
          label="Nom du Tableau"
          variant="outlined"
          onChange={(event) => setTableauName(event.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Auteur"
          variant="outlined"
          onChange={(event) => setAuteur(event.target.value)}
        />

        <TextField
          id="outlined-number"
          label="Prix"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => setPrice(event.target.value)}

        />
         

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick={() => uploadTableau()}
        >
          Envoi
        </Button>
      </div>
    </div>
  );
}
