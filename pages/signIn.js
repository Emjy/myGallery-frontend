import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

// Style
import styles from "../styles/SignIn.module.css";

// Composant MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


export default function signIn() {

    const router = useRouter();
    const dispatch = useDispatch();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    // Connection 
    const handleConnection = () => {
        fetch('https://art-papa-backend.vercel.app/users/signIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, password }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ token: data.token, user: data.user }));
                    setUser('');
                    setPassword('');
                    router.push("/upload")
                } else {

                }
            });
    };

    return (
        <div className={styles.page}>

            <img src='logob.jpg' className={styles.logo} />
            <TextField
                id="outlined-basic"
                label="Utilisateur"
                variant="outlined"
                value={user}
                onChange={(event) => setUser(event.target.value)}

            />

            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}

            />

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={undefined}
                onClick={() => handleConnection()}
            >
                Connexion
            </Button>

        </div>
    )
}
