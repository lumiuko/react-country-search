import axios from 'axios'
import { useEffect } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'

import countryCodes from '../../json/country-codes.json'
import './CountryPage.scss'

export async function loader({ params }) {
  const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/alpha/${params.code.toUpperCase()}`)
  return res.data
}

function CountryPage() {
  const { code } = useParams()
  const country = useLoaderData()

  useEffect(() => {
    const countryShortName = countryCodes.find(item => item.code.toLowerCase() === code)?.name ?? 'Error'
    document.title = `${countryShortName} | Where in the world`
  }, [code])

  return (
    <div className="container">
      <Link to="/" className="btn btn-back">
        Back
      </Link>
      <div className="country-view">
        <img className="flag" src={country.flag} alt={`${country.name} flag`} />
        <div className="country-info">
          <h1>{country.name}</h1>
          <div className="country-details">
            <div className="col">
              <div>
                <span className="text-bold">Native Name:</span> {country.nativeName}
              </div>
              <div>
                <span className="text-bold">Population: </span>
                {country.population?.toLocaleString('en-US') || 'N/A'}
              </div>
              <div>
                <span className="text-bold">Region:</span> {country.region}
              </div>
              <div>
                <span className="text-bold">Sub Region:</span> {country.subregion || 'N/A'}
              </div>
              <div>
                <span className="text-bold">Capital:</span> {country.capital || 'N/A'}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="text-bold">Top Level Domain:</span> {country.topLevelDomain}
              </div>
              <div>
                <span className="text-bold">Currencies: </span>
                {country?.currencies?.map(item => item.name).join(', ')}
              </div>
              <div>
                <span className="text-bold">Languages: </span>
                {country?.languages?.map(item => item.name).join(', ')}
              </div>
            </div>
          </div>
          {country.borders?.length > 0 && (
            <div className="borders">
              <div className="title text-bold">Border countries: </div>
              <div className="btns-list">
                {country?.borders.map((country, index) => (
                  <Link to={`/country/${country.toLowerCase()}`} className="btn btn-small" key={index}>
                    {countryCodes.find(item => item.code === country)?.name || country}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryPage
