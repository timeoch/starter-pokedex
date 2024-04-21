import React, { useState } from 'react';
import { Button, Typography, Box, Avatar, Stack, Container, TextField, Card, ListItemIcon } from '@mui/material';
import {getUsers, deleteUser} from '../services/user';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function Comptes() {

    const [refresh, setRefresh] = useState(false);

    const users = getUsers();

    const handleSupprUser = (user) => {
        deleteUser(user)
        getUsers()
        setRefresh(!refresh);
    }

    const navigate = useNavigate();

    function handlePokeUser(user){
        window.localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        navigate('/Pokedex');
    }

    return (
        <>       
            <Container sx={{ marginBottom: 1, textAlign: 'center' }}>
                <Typography variant='h1'>Connexion au Pokedex</Typography>
            </Container>

            <Stack justifyContent="center" spacing={2}>
                {users.map((user, index) => (
                    <Card key={index}>
                        <Stack direction="row" alignItems="center">
                            <Stack direction="row" alignItems="center" onClick={()=>{handlePokeUser(user)}} sx={{cursor:'pointer'}}>
                                <Avatar src={"/src/assets/" + user.avatar + ".jpg"} alt={user.nom} sx={{ width: 50, height: 50, marginRight: 3 }} />
                                <Typography>{user.nom}</Typography>
                            </Stack>
                            <ListItemIcon onClick={()=>{handleSupprUser(user)}} sx={{ marginLeft: "auto", cursor: 'pointer'}}>
                                <DeleteIcon />
                            </ListItemIcon>
                        </Stack>
                    </Card>
                ))}
            </Stack>

            <Box sx={{ marginBottom: 3 }}>
                    <TextField disabled  fullWidth variant='standard'/>
            </Box>

            <Stack sx={{ marginBottom: 1 }}>
                    <Button onClick={()=>{navigate('/');}} variant="contained" fullWidth>Créer un compte</Button>
            </Stack>
        
        </>
    );
}

export default Comptes;
