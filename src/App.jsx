import { ThemeProvider,createTheme } from '@mui/material'
import { defaultTheme } from './assets/defaultTheme'
import './App.css'
import Example from './components/Example'

function App() {

  const theme = createTheme(defaultTheme)
  
  return (
    <>
      <ThemeProvider theme={theme} >
        <Example />
      </ThemeProvider>
    </>
  )
}

export default App
