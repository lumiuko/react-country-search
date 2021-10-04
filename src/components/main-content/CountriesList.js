import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CountryCard from './CountryCard';
import Skeletons from '../common/Skeletons';
import './CountriesList.scss';

class CountriesList extends React.Component {
  state = {
    loading: false,
    allCountries: [],
    countries: [],
    error: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    // Fetching countries list from API
    try {
      const countriesData = await axios.get(`${process.env.REACT_APP_API_LINK}/all`);
      this.setState({
        allCountries: countriesData.data,
        countries: countriesData.data,
        loading: false
      });
      this.props.sendCountriesList(countriesData.data);
    } catch (err) {
      this.setState({ error: true });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.searchQuery !== this.props.searchQuery || prevState.filterQuery !== this.props.filterQuery) {
      // Filter countries by name from searchQuery property
      const filteredCountries = this.state.allCountries.filter(country => {
        return (
          country.name.toLowerCase().includes(this.props.searchQuery.toLowerCase()) &&
          (country.region === this.props.filterQuery || !this.props.filterQuery)
        );
      });

      // Apply state
      this.setState({ countries: filteredCountries });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Oops, something went wrong</h1>;
    }

    // Render skeletons if data isn't loaded yet
    if (this.state.loading) {
      return (
        <section className="cards">
          <Skeletons isDarkTheme={this.props.isDarkTheme} />
        </section>
      );
    }

    // If our filtered array is empty - no results
    if (!this.state.countries.length && this.state.allCountries) {
      return <h2 className="search-error-message">No results found for "{this.props.searchQuery}"</h2>;
    }

    // Otherwise render country card components
    const countryElements = this.state.countries.map(country => {
      return (
        <Link to={`/country/${country.alpha3Code.toLowerCase()}`} key={country.name}>
          <CountryCard country={country} />
        </Link>
      );
    });
    return <section className="cards">{countryElements}</section>;
  }
}

export default CountriesList;
