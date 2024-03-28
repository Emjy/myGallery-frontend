import React from 'react'

// composants MUI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props) {

    // Styles MUI personnalisés stockés dans une variable
    const customMuiStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white', // Couleur de la bordure
                borderRadius: '16px',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 1)', // Couleur de la bordure au survol
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(255, 255, 255, 1)', // Couleur de la bordure lors de la focalisation
            },
            color: 'white', // Change la couleur du texte du placeholder et de l'input
            '& input': {
                color: 'rgba(255, 255, 255, 0.5)', // Couleur du texte que l'utilisateur tape
            },
            '& .MuiInputLabel-root': { // Couleur du label/placeholder avant la focalisation
                color: 'white',
            },
            '& .MuiInputLabel-root.Mui-focused': { // Garantit que le label/placeholder reste blanc même lors de la saisie
                color: 'white !important',
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)', // Couleur de la bordure initiale
            }
        },
        '& .MuiInputLabel-outlined': {
            color: 'rgba(255, 255, 255, 0.5)', // Assure que la couleur initiale du texte du label/placeholder est bien définie
        },
        // Style pour l'icône de suppression
        '& .MuiAutocomplete-clearIndicator': {
            color: 'rgba(255, 255, 255, 0.5)',
        }
    };


    return (
        <>
            <Autocomplete
                sx={customMuiStyles}
                id="free-solo-demo"
                freeSolo
                options={props.values.map((option) => option[props.search])}
                onInputChange={(event, newInputValue) => {
                    props.onSearchChange(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.label}
                        sx={{
                            width: {
                                xs: '60vw', // sur petits écrans
                                md: '33vw'  // sur écrans moyens et grands
                            },
                            ...customMuiStyles // Assurez-vous d'appliquer également vos styles personnalisés ici si nécessaire
                        }}
                    />
                )}
            />
        </>

    )
}
