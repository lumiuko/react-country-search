function Navbar(props) {
  const iconURL = props.isDarkTheme
    ? 'https://unpkg.com/ionicons@5.5.1/dist/svg/moon.svg'
    : 'https://unpkg.com/ionicons@5.5.1/dist/svg/moon-outline.svg';
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-logo">Where in the world?</h1>
        <span className="dark-btn" onClick={e => props.themeEventHandler(e)}>
          <img
            src={iconURL}
            style={{ filter: props.isDarkTheme && 'invert(1)' }}
            className="darkmode-icon"
            aria-hidden="true"
            alt=""
          />
          Dark Mode
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
