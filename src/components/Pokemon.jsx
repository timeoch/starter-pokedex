import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Avatar, Stack, Container, Chip, CircularProgress, Grid } from '@mui/material';
import { getPokemonByName } from '../services/pokemon';
import { getUser, updateUsers } from '../services/user';
import { useNavigate, useParams } from 'react-router-dom';

function Pokemon() {
    const [pokemonData, setPokemonData] = useState(null);
    const [isInPokedex, setIsInPokedex] = useState(false);
    const { pokemonName } = useParams();

    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const pokemon = await getPokemonByName(pokemonName);
                setPokemonData(pokemon);
                const isInPokedex = user.pokedex.some(p => p.name === pokemon.name);
                setIsInPokedex(isInPokedex);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du Pokémon:', error);
            }
        };

        if (pokemonName) {
            fetchPokemonDetails();
        }
    }, [pokemonName, user.pokedex]);

    const addToPokedex = () => {
        if (pokemonData && user) {
            const updatedUser = { ...user };
            updatedUser.pokedex.push(pokemonData);
            window.localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsInPokedex(true);

            // Mettre à jour l'utilisateur dans le tableau users
            updateUsers(updatedUser);
        }
    };

    const removeFromPokedex = () => {
        if (pokemonData && user) {
            const updatedUser = { ...user };
            updatedUser.pokedex = updatedUser.pokedex.filter(p => p.name !== pokemonData.name);
            // Mettre à jour l'utilisateur dans le localStorage
            window.localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsInPokedex(false);

            // Mettre à jour le tableau users
            updateUsers(updatedUser);
        }
    };

    return (
        <>
            <Stack direction="row" sx={{ margin: 1 }} justifyContent="center" alignItems="center" spacing={2}>
                <Avatar src={`/src/assets/${user.avatar}.jpg`} alt={user.nom} sx={{ width: 50, height: 50 }} />
                <Typography>Bonjour {user.nom}</Typography>
                <Button variant="contained" onClick={() => navigate('/Comptes')}>
                    Se déconnecter
                </Button>
            </Stack>

            {pokemonData && (
                <Box sx={{ marginTop: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h1" sx={{ textTransform: 'capitalize' }}>
                            {pokemonData.name}
                        </Typography>
                        <Typography variant="h2">#{pokemonData.id}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
                        {pokemonData.types?.map((type, index) => (
                            <Chip key={index} label={type.type.name} sx={{ marginRight: 1, textTransform: 'capitalize' }} />
                        ))}
                    </Stack>

                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            src={pokemonData.sprites.front_default}
                            alt={pokemonData.name}
                            style={{ width: '200px', height: '200px', marginTop: '20px' }}
                        />
                    </Box>

                    <Typography variant="h4" sx={{ margin: 2 }}>Statistiques</Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Grid container spacing={4}>
                            {pokemonData.stats?.map((stat, index) => (
                                <Grid key={index} item xs={12} sm={4}>
                                    <Box sx={{ flexDirection: 'column', alignItems: 'center', gap: 1, position: 'relative', display: 'flex' }}>
                                        <Box sx={{ position: 'relative' }}>
                                            <Typography sx={{ position: 'absolute', left: 10, top: 10 }} variant="body1">
                                                {stat.base_stat}
                                            </Typography>
                                            <CircularProgress variant="determinate" value={stat.base_stat} />
                                        </Box>
                                        <Typography variant="body1">{stat.stat.name}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            )}

            {pokemonData && (
                <Stack sx={{ margin: 2 }}>
                    {isInPokedex ? (
                        <Button onClick={removeFromPokedex} variant="contained" fullWidth>
                            Supprimer du Pokédex
                        </Button>
                    ) : (
                        <Button onClick={addToPokedex} variant="contained" fullWidth>
                            Ajouter dans le Pokédex
                        </Button>
                    )}
                </Stack>
            )}

            <Stack sx={{ margin: 2 }}>
                <Button onClick={()=>{navigate('/Pokedex');}} variant="outlined" fullWidth>Retour au Pokedex</Button>
            </Stack>

            {!pokemonData && (
                <Container sx={{ marginTop: 2, textAlign: 'center' }}>
                    <Typography variant="h4">Chargement des détails du Pokémon...</Typography>
                </Container>
            )}
        </>
    );
}

export default Pokemon;
