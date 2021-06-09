import { useState } from 'react';

import Options from './Options';
import CardsList from './CardsList';

function MainContent() {
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
      <Options searchHandler={handleSearchChange} onFilterChange={handleFilterChange} />
      <CardsList searchQuery={searchString} filterQuery={filterString} />
    </div>
  );
}

export default MainContent;
