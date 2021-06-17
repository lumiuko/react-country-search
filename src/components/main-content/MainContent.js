import { useState, useEffect } from 'react';

import Options from './Options';
import CountriesList from './CountriesList';

function MainContent(props) {
  const [searchString, setSearch] = useState('');
  const [filterString, setFilter] = useState('');

  useEffect(() => {
    document.title = 'Where in the world';
  }, []);

  return (
    <div className="container">
      <Options
        searchHandler={value => setSearch(value)}
        onFilterChange={value => setFilter(value)}
        isDarkTheme={props.isDarkTheme}
      />
      <CountriesList
        searchQuery={searchString}
        filterQuery={filterString}
        sendCountriesList={props.sendCountriesList}
        isDarkTheme={props.isDarkTheme}
      />
    </div>
  );
}

export default MainContent;
