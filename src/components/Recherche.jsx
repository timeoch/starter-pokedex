import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Avatar, Stack, Container, TextField } from '@mui/material';
import { getUser } from '../services/user';
import { useNavigate } from 'react-router-dom';

function Recherche() {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
                const data = await response.json();
                setPokemonList(data.results);
            } catch (error) {
                console.error('Erreur lors de la récupération de la liste des Pokémon:', error);
            }
        };

        fetchPokemonList();
    }, []);

    useEffect(() => {
        if (pokemonName.trim() === '') {
            setFilteredPokemon([]);
            return;
        }

        const filtered = pokemonList.filter(pokemon =>
            pokemon.name.includes(pokemonName.toLowerCase())
        );
        setFilteredPokemon(filtered);
    }, [pokemonName, pokemonList]);

    const handlePokemon = (pokemon) => {
        navigate(`/Pokemon/${pokemon.name}`);
    };

    return (
        <>
            <Stack direction="row" sx={{ margin: 1 }} justifyContent={"center"} alignItems={"center"} spacing={2}>
                <Avatar src={"/src/assets/" + user.avatar + ".jpg"} alt={user.nom} sx={{ width: 50, height: 50 }} />
                <Typography>Bonjour {user.nom}</Typography>
                <Button variant="contained" onClick={() => navigate('/Comptes')}>Se déconnecter</Button>
            </Stack>


            <Container sx={{ marginBottom: 1, textAlign: 'center' }}>
                <Typography variant='h1'>Chercher un Pokemon</Typography>
            </Container>

            <Box sx={{ marginBottom: 1 }}>
                <TextField name='recherche' fullWidth label='Recherche...' value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}/>
            </Box>

            {filteredPokemon.length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant='h3'>Résultats de la recherche :</Typography>
                    {filteredPokemon.map((pokemon) => (
                        <div key={pokemon.name} style={{ width: '220px', height: '200px', display: 'inline-block', border: 'solid', margin: 17, borderRadius: 5, textAlign: 'center' }}>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
                            <h2 style={{ marginTop: 0, marginBottom: 10, textTransform:'capitalize'}}>{pokemon.name}</h2>
                            <Button variant="contained" onClick={() => handlePokemon(pokemon)}>Voir le Pokemon</Button>
                        </div>
                    ))}
                </Box>
            )}
        </>
    );
}

export default Recherche;
