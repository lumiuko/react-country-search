import { useState, useEffect, useRef, useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ThemeContext } from '../../context/ThemeContext'

import './Dropdown.scss'
import blackIcon from '../../assets/img/close-circle-outline-black.svg'
import whiteIcon from '../../assets/img/close-circle-outline-white.svg'

function useOutside(ref, isExpanded, setIsExpanded) {
  useEffect(() => {
    // If clicked outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (isExpanded) setIsExpanded(false)
      }
    }

    // Bind the event listener
    document.addEventListener('click', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref, isExpanded, setIsExpanded])
}

function Dropdown(props) {
  // Initializing hooks
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const { isDarkTheme } = useContext(ThemeContext)

  const wrapperRef = useRef(null)
  useOutside(wrapperRef, isExpanded, setIsExpanded)

  // When user clicks on the dropdown, toggle 'isExpanded' state
  function handleClick() {
    setIsExpanded(!isExpanded)
  }

  // When user clicks on item
  function selectItem(event) {
    setSelectedItem(event.target.textContent || '')
    setIsExpanded(false)
  }

  function clearFilter(event) {
    event.stopPropagation()
    setSelectedItem('')
    setIsExpanded(false)
  }

  const { regions } = props

  // Mapping the dropdown array with list-items
  const listItems = regions.map(item => (
    <li onClick={selectItem} key={item.id}>
      {item.name}
    </li>
  ))

  useEffect(() => {
    props.onSelect(selectedItem)
  })

  return (
    <div ref={wrapperRef} className="select-box">
      <div onClick={handleClick} className="region-filter">
        <div className="placeholder">{selectedItem || 'Filter by Region'}</div>
        <div className="clear-filter" onClick={clearFilter} style={{ display: selectedItem ? 'block' : 'none' }}>
          <img src={isDarkTheme ? whiteIcon : blackIcon} alt="" aria-hidden="true" />
        </div>
      </div>
      <CSSTransition in={isExpanded} timeout={300} unmountOnExit classNames="select-box-body">
        <div className="select-box-body">
          <ul>{listItems}</ul>
        </div>
      </CSSTransition>
    </div>
  )
}

export default Dropdown
