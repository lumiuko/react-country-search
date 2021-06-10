import { useState, useEffect, useRef } from 'react';

function useOutside(ref, isExpanded, setExpand) {
  useEffect(() => {
    // If clicked on outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (isExpanded) setExpand(false);
      }
    }

    // Bind the event listener
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, isExpanded, setExpand]);
}

function Dropdown(props) {
  // Initializing hooks
  const [isExpanded, setExpand] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const wrapperRef = useRef(null);
  useOutside(wrapperRef, isExpanded, setExpand);

  // When user clicks on the dropdown, toggle 'isExpanded' state
  function handleClick() {
    setExpand(!isExpanded);
  }

  // When user clicks on item
  function selectItem(event) {
    setSelectedItem(event.target.textContent || '');
    setExpand(false);
  }

  const { regions } = props;
  const bodyStyle = {
    display: isExpanded ? 'block' : 'none'
  };

  // Mapping the dropdown array with list-items
  const arr = regions.map(item => (
    <li onClick={selectItem} key={item.id}>
      {item.name}
    </li>
  ));

  useEffect(() => {
    props.onSelect(selectedItem);
  });

  return (
    <div ref={wrapperRef} className="select-box">
      <div onClick={handleClick} className="input region-filter">
        {selectedItem || 'Filter by Region'}
      </div>
      <div style={bodyStyle} className="select-box-body input">
        <ul>{arr}</ul>
      </div>
    </div>
  );
}

export default Dropdown;
