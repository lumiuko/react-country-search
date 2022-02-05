import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CountryCard from './CountryCard';
import Skeletons from '../common/Skeletons';
import './CountriesList.scss';

function CountriesList(props) {
  // State
  const [isLoading, setLoading] = useState(true);
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isError, setError] = useState(false);

  // When first mounted
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_LINK}/all`)
      .then(data => {
        setAllCountries(data.data);
        setCountries(data.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // When props (searchQuery, filterQuery) are changed
  useEffect(() => {
    const filteredCountries = allCountries.filter(country => {
      return (
        country.name.toLowerCase().includes(props.searchQuery.toLowerCase()) &&
        (country.region === props.filterQuery || !props.filterQuery)
      );
    });
    setCountries(filteredCountries);
  }, [props, allCountries]);

  // Something is wrong with the API
  if (isError) {
    return <h1>Oops, something went wrong</h1>;
  }

  // Data is still loading
  if (isLoading) {
    return (
      <section className="cards">
        <Skeletons isDarkTheme={props.isDarkTheme} />
      </section>
    );
  }

  // No country matches the search string
  if (!countries.length && allCountries) {
    return <h2 className="search-error-message">No results found for "{props.searchQuery}"</h2>;
  }

  // Otherwise show countries cards
  const countryElements = countries.map(country => {
    return (
      <Link to={`/country/${country.alpha3Code.toLowerCase()}`} key={country.name}>
        <CountryCard country={country} />
      </Link>
    );
  });

  return <section className="cards">{countryElements}</section>;
}

export default CountriesList;
