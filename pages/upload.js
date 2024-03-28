import React, { useState } from "react";

//style
import styles from "../styles/Upload.module.css";

//components
import UploadAffiche from "../components/UploadAffiche";
import UploadTableau from "../components/UploadTableau";
import UploadPhoto from "../components/UploadPhoto";

// components MUI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function upload() {
  const [file, setFile] = useState("");

  const handleChange = (event) => {
    setFile(event.target.value);
  };

  return (
    <div className={styles.page}>
      <div className={styles.title}>{"Création d'un fichier"}</div>

      <Box className={styles.selecteur}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type de fichier</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={file}
            label="Type de fichier"
            onChange={handleChange}
          >
            <MenuItem value={10}>Affiche</MenuItem>
            <MenuItem value={20}>Tableau</MenuItem>
            <MenuItem value={30}>Photo</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {file == 10 && <UploadAffiche />}
      {file == 20 && <UploadTableau />}
      {file == 30 && <UploadPhoto />}

    </div>
  );
}
