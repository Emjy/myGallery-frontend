import React, { useState, useEffect } from 'react'

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

// Composants 
import CustomSnackbar from '../components/CustomSnackBar';

export default function adminFichiers() {

    const [affichesData, setAffichesData] = useState([]);
    const [tableauData, setTableauData] = useState([]);
    const [photoData, setPhotoData] = useState([]);

    const [open, setOpen] = useState(false)

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




    return (
        <div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Miniature</TableCell>
                            <TableCell align="left">Nom du film</TableCell>
                            <TableCell align="left">Réalisateur</TableCell>
                            <TableCell align="left">Supprimer</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
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
            </TableContainer>

            <CustomSnackbar
                open={open}
                handleClose={() => setOpen(false)}
                message="Affiche supprimée"
                duration={3000}
            />

        </div>
    )
}
