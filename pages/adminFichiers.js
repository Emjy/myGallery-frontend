import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";

//style
import styles from "../styles/AdminFichiers.module.css";

// composants MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import IconButton from '@mui/material/IconButton';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';

// Composants 
import CustomSnackbar from '../components/CustomSnackBar';

export default function adminFichiers() {

    const [affichesData, setAffichesData] = useState([]);
    const [tableauData, setTableauData] = useState([]);
    const [photoData, setPhotoData] = useState([]);

    const [open, setOpen] = useState(false)
    const [navigation, setNavigation] = useState('Affiches')


    const router = useRouter();

    // Récupération des data
    useEffect(() => {

        fetch(`https://art-papa-backend.vercel.app/affiches/`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    // Tri des affiches par date de création
                    const sortedAffiches = data.affiches.sort((a, b) => {
                        return new Date(b.creationDate) - new Date(a.creationDate);
                    });
                    setAffichesData(sortedAffiches);
                }
            });

        fetch(`https://art-papa-backend.vercel.app/tableaux/`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    // Tri des affiches par date de création
                    const sortedTableau = data.tableaux.sort((a, b) => {
                        return new Date(b.creationDate) - new Date(a.creationDate);
                    });
                    // Récupéreration des tableaux
                    setTableauData(sortedTableau);
                }
            });

        fetch(`https://art-papa-backend.vercel.app/photos/`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    // Tri des affiches par date de création
                    const sortedPhoto = data.photos.sort((a, b) => {
                        return new Date(b.creationDate) - new Date(a.creationDate);
                    });
                    // Récupéreration des affiches
                    setPhotoData(sortedPhoto);
                }
            });

    }, []);


    const deleteAffiche = (afficheId) => {
        fetch(`https://art-papa-backend.vercel.app/affiches/${afficheId}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {

                    console.log("Affiche deleted successfully");
                    const updatedAffiches = affichesData.filter(affiche => affiche._id !== afficheId);
                    setAffichesData(updatedAffiches);
                    setOpen(true);

                } else {
                    console.error("Error deleting affiche:", data.message);
                }
            })
            .catch(error => {
                console.error("Network or request error when deleting affiche:", error);
            });
    }

    const deletePhoto = (photoId) => {
        fetch(`https://art-papa-backend.vercel.app/photos/${photoId}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {

                    console.log("Photo deleted successfully");
                    const updatedPhotos = photosData.filter(photo => photo._id !== photoId);
                    setPhotoData(updatedPhotos);
                    setOpen(true);

                } else {
                    console.error("Error deleting photo:", data.message);
                }
            })
            .catch(error => {
                console.error("Network or request error when deleting photo:", error);
            });
    }

    const deleteTableau = (tableauId) => {
        fetch(`https://art-papa-backend.vercel.app/tableaux/${tableauId}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {

                    console.log("Tableau deleted successfully");
                    const updatedTableaux = tableauData.filter(tableau => tableau._id !== tableauId);
                    setTableauData(updatedTableaux);
                    setOpen(true);

                } else {
                    console.error("Error deleting tableau:", data.message);
                }
            })
            .catch(error => {
                console.error("Network or request error when deleting tableau:", error);
            });
    }

    return (
        <div className={styles.page}>

            <div className={styles.navigation}>
                <IconButton onClick={() => router.push('./upload')} aria-label="return">
                    <KeyboardReturnRoundedIcon />
                </IconButton>
                <div className={styles.itemNav} onClick={() => setNavigation('Affiches')}>
                    {'Affiches'}
                </div>
                <div className={styles.itemNav} onClick={() => setNavigation('Photos')}>
                    {'Photos'}
                </div>
                <div className={styles.itemNav} onClick={() => setNavigation('Tableaux')}>
                    {'Tableaux'}
                </div>
            </div>

            <div className={styles.table}>

                {navigation === 'Affiches' &&
                    <TableContainer component={Paper} style={{ maxHeight: '80vh', borderRadius:'16px' }}>
                        <Table stickyHeader aria-label="customized table">
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }}>Miniature</TableCell>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }} align="left">Nom du film</TableCell>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }} align="left">Réalisateur</TableCell>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }} align="left">Supprimer</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                {affichesData.map((row) => (
                                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell align="left" component="th" scope="row"> <img style={{ height: '50px' }} src={row.imageName} />  </TableCell>
                                        <TableCell align="left" component="th" scope="row"> {row.filmName} </TableCell>
                                        <TableCell align="left">{row.realName}</TableCell>
                                        <TableCell align="center">
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteAffiche(row._id)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}

                {navigation === 'Photos' &&
                    <TableContainer component={Paper} style={{ maxHeight: '80vh' }}>
                        <Table stickyHeader aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }}>Miniature</TableCell>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }} align="left">Nom de la Photo</TableCell>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }} align="left">Auteur</TableCell>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }} align="left">Supprimer</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                {photoData.map((row) => (
                                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell align="left" component="th" scope="row"> <img style={{ height: '50px' }} src={row.imageName} />  </TableCell>
                                        <TableCell align="left" component="th" scope="row"> {row.photoName} </TableCell>
                                        <TableCell align="left">{row.auteur}</TableCell>
                                        <TableCell align="center">
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deletePhoto(row._id)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }

                {navigation === 'Tableaux' &&
                    <TableContainer component={Paper} style={{ maxHeight: '80vh' }}>
                        <Table stickyHeader aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }}>Miniature</TableCell>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }} align="left">Nom du Tableau</TableCell>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }} align="left">Auteur</TableCell>
                                    <TableCell style={{ backgroundColor: '#8CDEDC', color: 'white' }} align="left">Supprimer</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody style={{ overflowX: 'auto' }}>
                                {tableauData.map((row) => (
                                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell align="left" component="th" scope="row"> <img style={{ height: '50px' }} src={row.imageName} />  </TableCell>
                                        <TableCell align="left" component="th" scope="row"> {row.tableauName} </TableCell>
                                        <TableCell align="left">{row.auteur}</TableCell>
                                        <TableCell align="center">
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteTableau(row._id)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}

            </div>

            <CustomSnackbar
                open={open}
                handleClose={() => setOpen(false)}
                message="Fichier supprimé"
                duration={3000}
            />

        </div>
    )
}
