import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import countryCodes from '../../json/country-codes.json';
import loaderIcon from '../../img/loader.svg';
import './CountryPage.scss';

function CountryPage(props) {
  const { code } = useParams();
  const [currentCountry, setCountryData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (!props.countriesList.length) {
      setLoading(true);
      axios
        .get(`https://restcountries.eu/rest/v2/alpha/${code.toUpperCase()}`)
        .then(res => {
          setCountryData(res.data);
          setLoading(false);
        })
        .catch(() => setError(true));
    } else {
      setCountryData(props.countriesList.find(country => country.alpha3Code === code.toUpperCase()));
    }
  }, [props.countriesList, code]);

  const centerStyle = {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  };

  if (isError) {
    return (
      <div className="container" style={centerStyle}>
        <h1>Oops. Something went wrong</h1>
        <Link to="/" className="btn">
          Go to hompage
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container" style={centerStyle}>
        <img src={loaderIcon} alt="" style={{ width: '200px', height: '200px' }} />
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
              <div className="text-bold" style={{ flex: '3' }}>
                Border countries:{' '}
              </div>
              <div style={{ flex: '10' }}>
                {currentCountry.borders.map((country, index) => (
                  <Link to={`/country/${country.toLowerCase()}`} className="btn btn-small" key={index}>
                    {countryCodes.find(item => item.code === country).name}
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
