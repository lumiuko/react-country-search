import { useState, useEffect, Suspense } from 'react'
import { useLoaderData, Link, defer, Await } from 'react-router-dom'
import axios from 'axios'

import Skeletons from '../common/Skeletons'
import CountryCard from './CountryCard'
import './MainContent.scss'
import Options from './Options'

const apiEndpoint = import.meta.env.VITE_APP_API_URL

export function loader() {
  const res = axios.get(`${apiEndpoint}/all`)
  return defer({ countries: res })
}

function MainContent() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  const dataPromise = useLoaderData()

  useEffect(() => {
    document.title = 'Where in the world'
  }, [])

  function renderCards(res) {
    const filteredItems = res.data.filter(country => {
      return country.name.toLowerCase().includes(search.toLowerCase()) && (country.region === filter || !filter)
    })

    if (!filteredItems.length && res.data) {
      return <h2 className="search-error-message">No results found</h2>
    }

    const countryElements = filteredItems.map(country => {
      return (
        <Link to={`/country/${country.alpha3Code.toLowerCase()}`} key={country.name}>
          <CountryCard country={country} />
        </Link>
      )
    })

    return countryElements
  }

  return (
    <div className="container">
      <Options searchHandler={value => setSearch(value)} onFilterChange={value => setFilter(value)} />
      <section className="cards">
        <Suspense fallback={<Skeletons />}>
          <Await resolve={dataPromise.countries}>{renderCards}</Await>
        </Suspense>
      </section>
    </div>
  )
}

export default MainContent
