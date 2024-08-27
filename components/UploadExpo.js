import React, { useState, useEffect, useRef } from "react";
import imageCompression from 'browser-image-compression';
import dayjs from 'dayjs';


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
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Transfert des data vers cloudinary
import axios from "axios";

export default function UploadFile() {

  const fileInputRef = useRef(); // Créez une référence pour le champ de fichier
  const [expo, setExpo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [expoName, setExpoName] = useState("");
  const [auteur, setAuteur] = useState("");
  const [adresse, setAdresse] = useState("");
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs())
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

  const uploadExpo = () => {
    const formData = new FormData();
    if (expo) {
      formData.append("file", expo);
    }
    formData.append("expoName", expoName);
    formData.append("adresse", adresse);
    formData.append("auteur", auteur);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("description", description);


    axios.post("https://françoisgiraud.fr/expositions/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        console.log("image uploaded");
        // Réinitialiser vos états ici
        setExpoName("");
        setAuteur("");
        setDescription("");
        setAdresse('');
        setExpo(null);
        setPreviewUrl(null); // Supprimer l'URL de l'aperçu
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
        setExpo(compressedFile);
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
          Image de couverture
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
          label="Nom de l'expo"
          variant="outlined"
          value={expoName}
          onChange={(event) => setExpoName(event.target.value)}
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
          id="outlined-basic"
          label="Adresse"
          variant="outlined"
          value={adresse}
          onChange={(event) => setAdresse(event.target.value)}
          className={styles.formItem}

        />

        <div className={styles.formItem} style={{ display: 'flex', justifyContent: 'space-between' }}>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date de début"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}

            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date de fin"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </LocalizationProvider>

        </div>


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
          onClick={() => uploadExpo()}
          className={styles.formItem}

        >
          Envoi Expo
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
