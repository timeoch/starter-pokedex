import React from 'react';
import { Button, Typography, Box, Avatar, Stack, Container, TextField } from '@mui/material';
import { getUser, getUsers } from '../services/user';
import { useNavigate } from 'react-router-dom';

function Pokedex() {
    const navigate = useNavigate();
    const user = getUser();

    const users = getUsers();

    const handlePokemon = (pokemon) => {
        navigate(`/Pokemon/${pokemon.name}`);
    };


    console.log(users);

    return (
        <>
            <Stack direction="row" sx={{ margin: 1 }} justifyContent="center" alignItems="center" spacing={2}>
                <Avatar src={`/src/assets/${user.avatar}.jpg`} alt={user.nom} sx={{ width: 50, height: 50 }} />
                <Typography>Bonjour {user.nom}</Typography>
                <Button variant="contained" onClick={() => navigate('/Comptes')}>
                    Se déconnecter
                </Button>
            </Stack>

            <Container sx={{ marginBottom: 1, textAlign: 'center' }}>
                <Typography variant="h1">Pokedex</Typography>
            </Container>

            {user.pokedex && user.pokedex.length > 0 ? (
                user.pokedex.map((pokemon, index) => (
                    <div key={pokemon.name} style={{ width: '220px', height: '200px', display: 'inline-block', border: 'solid', margin: 17, borderRadius: 5, textAlign: 'center' }}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '100px', height: '100px' }}/>  
                        <h2 style={{ marginTop: 0, marginBottom: 10, textTransform:'capitalize'}}>{pokemon.name}</h2>
                        <Button variant="contained" onClick={() => handlePokemon(pokemon)}>Voir le Pokemon</Button>
                    </div>
                ))
            ) : (
                <Box sx={{ marginBottom: 1 }}>
                    <TextField disabled fullWidth variant="standard" label="Votre pokedex est vide" />
                </Box>
            )}       


            <Stack sx={{ marginBottom: 1 }}>
                <Button onClick={() => navigate('/Recherche')} variant="contained" fullWidth>
                    Chercher un Pokémon
                </Button>
            </Stack>
        </>
    );
}

export default Pokedex;
