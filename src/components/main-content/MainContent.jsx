import { useState, useEffect } from 'react'

import Options from './Options'
import CountriesList from './CountriesList'

function MainContent() {
  const [searchString, setSearchString] = useState('')
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    document.title = 'Where in the world'
  }, [])

  return (
    <div className="container">
      <Options searchHandler={value => setSearchString(value)} onFilterChange={value => setFilterString(value)} />
      <CountriesList searchQuery={searchString} filterQuery={filterString} />
    </div>
  )
}

export default MainContent
