import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import './Navbar.scss'

function Navbar() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext)

  const iconURL = isDarkTheme
    ? 'https://unpkg.com/ionicons@5.5.1/dist/svg/moon.svg'
    : 'https://unpkg.com/ionicons@5.5.1/dist/svg/moon-outline.svg'
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-logo">Where in the world?</h1>
        <button className="dark-btn" onClick={toggleTheme} aria-pressed={isDarkTheme}>
          <img
            src={iconURL}
            style={{ filter: isDarkTheme && 'invert(1)' }}
            className="darkmode-icon"
            aria-hidden="true"
            width="19"
            height="19"
          />
          <span>Dark Mode</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
