import React, { useState } from 'react';
import { Button, Typography, Box, Avatar, Stack, Container, TextField } from '@mui/material';
import { useNavigate, Form } from 'react-router-dom';
import { createUser } from '../services/user';

function Connexion() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const avatars = [
        { src: '/src/assets/1.jpg' },
        { src: '/src/assets/2.jpg' },
        { src: '/src/assets/3.jpg' }
    ];

    const navigate = useNavigate();

    function handleCreateAccountClick(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const nom = form.get('nom');
        if (!nom) {
            alert("Vous devez saisir un nom");
        }else{
            createUser(nom, selectedAvatar)
            navigate('/pokedex');
        }
    } 
    
    return (
        <>
            <Container sx={{ marginBottom: 1, textAlign: 'center' }}>
                <Typography variant='h1'>Créer un utilisateur</Typography>
            </Container>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant='h4'>Choisir un avatar</Typography>
            </Box>
            <Form onSubmit={handleCreateAccountClick}>
                    <Stack direction="row" sx={{ marginBottom: 1 }}>
                        {avatars.map((avatar, index) => (
                            <Avatar key={index} alt={`Avatar ${index + 1}`} src={avatar.src} sx={{
                                    width: 75, height: 75, margin: 1, cursor: 'pointer',
                                    opacity: selectedAvatar === index + 1 ? 1 : 0.5
                                }}
                                onClick={() => setSelectedAvatar(index + 1)}
                            />
                        ))}
                    </Stack>

                <Box sx={{ marginBottom: 1 }}>
                    <TextField name='nom' fullWidth label="Nom" />
                </Box>

                <Stack sx={{ marginBottom: 1 }}>
                    <Button type='submit' variant="contained" fullWidth>Créer un compte</Button>
                </Stack>
            </Form>
        </>
    );
}

export default Connexion;
