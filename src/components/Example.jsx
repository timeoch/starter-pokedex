import React, { useState } from 'react';
import Page from './Page';
import { Button, Typography, Box, Avatar, Stack, Container, TextField, ClickAwayListener } from '@mui/material';

function Example() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleAvatarClick = (avatarSrc) => {
        setSelectedAvatar(avatarSrc);
    };

    const handleAvatarClickAway = () => {
        setSelectedAvatar(null);
    };

    const avatars = [
        { src: '/src/assets/1.jpg' },
        { src: '/src/assets/2.jpg' },
        { src: '/src/assets/3.jpg' }
    ];

    return (
        <Page>
            <Container sx={{ marginBottom: 1, textAlign: 'center' }}>
                <Typography variant='h1'>Créer un utilisateur</Typography>
            </Container>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant='h4'>Choisir un avatar</Typography>
            </Box>
            <ClickAwayListener onClickAway={handleAvatarClickAway}>
                <Stack direction="row" sx={{ marginBottom: 1 }}>
                    {avatars.map((avatar, index) => (
                        <Avatar key={index} alt={`Avatar ${index + 1}`} src={avatar.src} sx={{
                                width: 75,
                                height: 75,
                                margin: 1,
                                opacity: selectedAvatar === avatar.src ? 1 : 0.5,
                                cursor: 'pointer'
                            }}
                            onClick={() => handleAvatarClick(avatar.src)}
                        />
                    ))}
                </Stack>
            </ClickAwayListener>

            <Box sx={{ marginBottom: 1 }}>
                <TextField fullWidth id="outlined-basic" label="Nom" variant="outlined" />
            </Box>

            <Stack sx={{ marginBottom: 1 }}>
                <Button variant="contained" fullWidth>Cliquer ici</Button>
            </Stack>
        </Page>
    );
}

export default Example;
