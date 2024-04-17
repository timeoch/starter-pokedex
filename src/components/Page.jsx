import React from 'react'
import {Box, Container,Card, Typography, Avatar,Button} from '@mui/material'
import logo from '../assets/logo.png'
//import { getCurrentUser, removeCurrentUser } from '../services/users'
import { useNavigate } from 'react-router-dom'

function Page({children}) {

    return (
        <Box>
            <Box sx={{backgroundColor:"#F8F4F4",minHeight:'100vh'}}>
            <Container maxWidth="sm">
              <Box sx={{paddingTop:5,paddingBottom:6}}>
                <Box sx={{marginBottom:5,maxWidth:'300px',marginX:'auto'}}>
                    <img src={logo} alt="logo pokemon" />
                </Box>
                <Card sx={{padding:2}}>
                    {children}
                </Card>
              </Box>
            </Container>
            </Box>
        </Box>
      )
}

export default Page