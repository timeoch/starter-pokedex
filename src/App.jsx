import { ThemeProvider,createTheme } from '@mui/material'
import { defaultTheme } from './assets/defaultTheme'
import './App.css'
import { Outlet } from 'react-router-dom'
import Page from './components/Page'

function App() {

  const theme = createTheme(defaultTheme)
  
  return (
    <>
      <ThemeProvider theme={theme} >
        <Page>
          <Outlet/>
        </Page>
      </ThemeProvider>
    </>
  )
}

export default App
