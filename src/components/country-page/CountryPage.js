import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function CountryPage(props) {
  const { code } = useParams();
  const [currentCountry, setCountryData] = useState({});

  useEffect(() => {
    if (!props.countriesList.length) {
      axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`).then(res => setCountryData(res.data));
    } else {
      setCountryData(props.countriesList.find(country => country.alpha3Code === code));
    }
  }, [props.countriesList, code]);

  return (
    <div className="container">
      <Link to="/" className="btn">
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
                <span className="text-bold">Sub Region:</span> {currentCountry.subregion}
              </div>
              <div>
                <span className="text-bold">Capital:</span> {currentCountry.capital}
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
        </div>
      </div>
    </div>
  );
}

export default CountryPage;
