import { useState, useEffect } from 'react';

import Options from './Options';
import CountriesList from './CountriesList';

function MainContent(props) {
  const [searchString, setSearchString] = useState('');
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    document.title = 'Where in the world';
  }, []);

  return (
    <div className="container">
      <Options
        searchHandler={value => setSearchString(value)}
        onFilterChange={value => setFilterString(value)}
        isDarkTheme={props.isDarkTheme}
      />
      <CountriesList searchQuery={searchString} filterQuery={filterString} isDarkTheme={props.isDarkTheme} />
    </div>
  );
}

export default MainContent;
