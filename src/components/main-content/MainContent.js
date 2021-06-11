import { useState } from 'react';

import Options from './Options';
import CardsList from './CardsList';

function MainContent(props) {
  const [searchString, setSearch] = useState('');
  const [filterString, setFilter] = useState('');

  function handleSearchChange(value) {
    setSearch(value);
  }

  function handleFilterChange(value) {
    setFilter(value);
  }

  return (
    <div className="container">
      <Options searchHandler={handleSearchChange} onFilterChange={handleFilterChange} isDarkTheme={props.isDarkTheme} />
      <CardsList
        searchQuery={searchString}
        filterQuery={filterString}
        sendCountriesList={props.sendCountriesList}
        isDarkTheme={props.isDarkTheme}
      />
    </div>
  );
}

export default MainContent;
