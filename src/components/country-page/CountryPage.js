import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import countryCodes from '../../json/country-codes.json';
import './CountryPage.scss';

function CountryPage() {
  const { code } = useParams();
  const [currentCountry, setCountryData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const countryShortName = countryCodes.find(item => item.code.toLowerCase() === code)?.name ?? 'Error';
    axios
      .get(`${process.env.REACT_APP_API_LINK}/alpha/${code.toUpperCase()}`)
      .then(res => {
        if (res.data.status >= 400) throw new Error(`${res.data.status} (${res.data.message})`);
        setCountryData(res.data);
        setLoading(false);
      })
      .catch(err => setError(err));
    document.title = `${countryShortName} | Where in the world`;
  }, [code]);

  if (error) {
    return (
      <div className="container center">
        <h1>Oops. Something went wrong</h1>
        <p>{error.message}</p>
        <Link to="/" className="btn">
          Go to hompage
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container center">
        <img src="/loader.svg" alt="" style={{ width: '200px', height: '200px' }} />
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="btn btn-back">
        Back
      </Link>
      <div className="country-view">
        <img className="flag" src={currentCountry.flag} alt={`${currentCountry.name} flag`} />
        <div className="country-info">
          <h1>{currentCountry.name}</h1>
          <div className="country-details">
            <div className="col">
              <div>
                <span className="text-bold">Native Name:</span> {currentCountry.nativeName}
              </div>
              <div>
                <span className="text-bold">Population: </span>
                {currentCountry.population?.toLocaleString('en-US') || 'N/A'}
              </div>
              <div>
                <span className="text-bold">Region:</span> {currentCountry.region}
              </div>
              <div>
                <span className="text-bold">Sub Region:</span> {currentCountry.subregion || 'N/A'}
              </div>
              <div>
                <span className="text-bold">Capital:</span> {currentCountry.capital || 'N/A'}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="text-bold">Top Level Domain:</span> {currentCountry.topLevelDomain}
              </div>
              <div>
                <span className="text-bold">Currencies: </span>
                {currentCountry?.currencies?.map(item => item.name).join(', ')}
              </div>
              <div>
                <span className="text-bold">Languages: </span>
                {currentCountry?.languages?.map(item => item.name).join(', ')}
              </div>
            </div>
          </div>
          {currentCountry.borders?.length > 0 && (
            <div className="borders">
              <div className="title text-bold">Border countries: </div>
              <div className="btns-list">
                {currentCountry?.borders.map((country, index) => (
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
  );
}

export default CountryPage;
