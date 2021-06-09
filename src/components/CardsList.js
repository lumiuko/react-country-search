import React from 'react';
import ContentLoader from 'react-content-loader';

import TestCard from './Card';

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
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(data => {
        this.setState({
          allCountries: data,
          countries: data,
          loading: false
        });
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
    // Set up skeleton loading and fill an array with 8 items
    const skeletons = [];
    for (let i = 0; i < 8; i++) {
      skeletons.push(
        <ContentLoader
          key={i}
          speed={2}
          width={'100%'}
          height={300}
          viewBox="0 0 325 320"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="13" y="7" rx="0" ry="0" width="300" height="175" />
          <rect x="13" y="200" rx="3" ry="3" width="300" height="13" />
          <rect x="13" y="225" rx="3" ry="3" width="300" height="13" />
          <rect x="12" y="250" rx="3" ry="3" width="300" height="13" />
          <rect x="12" y="275" rx="3" ry="3" width="300" height="13" />
          <rect x="12" y="300" rx="3" ry="3" width="300" height="13" />
        </ContentLoader>
      );
    }

    // Render skeletons is data is not yet loaded
    if (this.state.loading) {
      return <div className="cards">{skeletons}</div>;
    }

    // If our filtered array is empty - no results
    if (!this.state.countries.length && this.state.allCountries) {
      return <h2 className="search-error-message">No results found for "{this.props.searchQuery}"</h2>;
    }

    // Otherwise render country card components
    const countryElements = this.state.countries.map(country => <TestCard key={country.name} country={country} />);
    return <div className="cards">{countryElements}</div>;
  }
}

export default CardsList;
