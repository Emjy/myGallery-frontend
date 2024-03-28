import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function CustomSnackbar({ open, handleClose, message, duration = 3000 }) {


    return (
        <>
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                message={message}
                autoHideDuration={duration}
            />
        </>

    )
}


