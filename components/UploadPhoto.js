import React, { useState, useEffect, useRef } from "react";
import imageCompression from 'browser-image-compression';

// Composants 
import CustomSnackbar from "./CustomSnackBar";

// Style
import styles from "../styles/UploadStyle.module.css";

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
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [photoName, setPhotoName] = useState("");
  const [auteur, setAuteur] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false)

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

  const uploadPhoto = () => {
    const formData = new FormData();
    if (photo) {
      formData.append("file", photo);
    }

    formData.append("photoName", photoName);
    formData.append("auteur", auteur);
    formData.append("prix", price);
    formData.append("description", description);



    axios
      .post("https://art-papa-backend.vercel.app/photos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("image uploaded");
        // Réinitialiser vos états ici
        setPhotoName("");
        setAuteur("");
        setDescription("");
        setPrice(0); // Réinitialiser le prix
        setPhoto(null);
        setPreviewUrl(null); // Supprimer l'URL de l'aperçu
        // Réinitialisez le champ de fichier
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setOpen(true)
        
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
        setPhoto(compressedFile);
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
          id="outlined-basic"
          label="Nom de la photo"
          variant="outlined"
          value={photoName}
          onChange={(event) => setPhotoName(event.target.value)}
          className={styles.formItem}

        />

        <TextField
          id="outlined-basic"
          label="Auteur"
          variant="outlined"
          value={auteur}
          onChange={(event) => setAuteur(event.target.value)}
          className={styles.formItem}

        />

        <TextField
          id="outlined-number"
          label="Prix"
          type="number"
          value={price}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => setPrice(Number(event.target.value))}
          className={styles.formItem}

        />

        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          maxRows={30}
          rows={5} 
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={styles.formItem}

        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick={() => uploadPhoto()}
          className={styles.formItem}

        >
          Envoi photo
        </Button>

        <CustomSnackbar
          open={open}
          handleClose={() => setOpen(false)}
          message="Photo envoyée"
          duration={3000}
        />

      </div>
    </div>
  );
}
