import Dropdown from '../common/Dropdown';
import regions from '../../json/regions';

import './Options.scss';

function Options(props) {
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
