import { ThemeProvider } from '@mui/material/styles'
import { HomePage } from './pages/HomePage'
import { useState } from 'react'
import { darkTheme, lightTheme } from './theme/theme'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <HomePage toggle={toggleTheme} isDarkMode={isDarkMode} />
    </ThemeProvider>
  )
}

export default App
