import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/user';

//style
import styles from "../styles/Upload.module.css";

//components
import UploadAffiche from "../components/UploadAffiche";
import UploadTableau from "../components/UploadTableau";
import UploadPhoto from "../components/UploadPhoto";
import UploadExpo from "../components/UploadExpo";

// components MUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import EditRoundedIcon from '@mui/icons-material/EditRounded';


export default function upload() {

  const token = useSelector((state) => state.user.value.token)
  const router = useRouter();
  const dispatch = useDispatch();

  const [file, setFile] = useState("");

  const handleChange = (event) => {
    setFile(event.target.value);
  };

  const handleLogOut = () => {
    dispatch(logout({ token: null, user: null }));
    router.push('./signIn')
  }

  const handleGestion = () => {
    router.push('./adminFichiers')
  }

  // Récupération des affiches
  useEffect(() => {
    if (!token) {
      router.push('./signIn')
    }
  }, [token]);


  return (
    <>

      {token && <div className={styles.page}>

        <div className={styles.logout}>
          <IconButton onClick={() => handleGestion()} aria-label="Gestion">
            <EditRoundedIcon />
          </IconButton>

          <IconButton onClick={() => handleLogOut()} aria-label="logout">
            <LogoutIcon />
          </IconButton>

        </div>


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
              <MenuItem value={40}>Expo</MenuItem>

            </Select>
          </FormControl>
        </Box>

        <div className={styles.formContainer}>
          {file == 10 && <UploadAffiche />}
          {file == 20 && <UploadTableau />}
          {file == 30 && <UploadPhoto />}
          {file == 40 && <UploadExpo />}

        </div>

      </div>}

    </>



  );
}
