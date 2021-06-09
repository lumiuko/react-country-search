import Dropdown from './Dropdown';

function Options(props) {
  const regions = [
    {
      id: 1,
      name: 'Africa'
    },
    {
      id: 2,
      name: 'Americas'
    },
    {
      id: 3,
      name: 'Asia'
    },
    {
      id: 4,
      name: 'Europe'
    },
    {
      id: 5,
      name: 'Oceania'
    }
  ];

  return (
    <div className="options">
      <input
        onInput={e => props.searchHandler(e.target.value)}
        type="text"
        className="input country-search"
        placeholder="Search for a country..."
      />
      <Dropdown onSelect={value => props.onFilterChange(value)} regions={regions} />
    </div>
  );
}

export default Options;
