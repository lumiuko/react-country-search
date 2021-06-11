import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Card from './Card';
import Skeletons from '../common/Skeletons';

class CardsList extends React.Component {
  constructor() {
    super();

    // Setting up basic state
    this.state = {
      loading: false,
      allCountries: [],
      countries: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    // Fetching countries list from API
    axios.get('https://restcountries.eu/rest/v2/all').then(res => {
      this.setState({
        allCountries: res.data,
        countries: res.data,
        loading: false
      });
      this.props.sendCountriesList(res.data);
    });
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
    // Render skeletons is data is not yet loaded
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
          <Card country={country} />
        </Link>
      );
    });
    return <section className="cards">{countryElements}</section>;
  }
}

export default CardsList;
