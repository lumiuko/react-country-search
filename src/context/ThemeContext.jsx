import { createContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

function ThemeProvider(props) {
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme-color') === 'dark')

  function toggleTheme() {
    setIsDarkTheme(prevTheme => !prevTheme)
  }

  useEffect(() => {
    document.body.className = isDarkTheme ? 'theme-dark' : ''
    localStorage.setItem('theme-color', isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

  return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{props.children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider }
