function CountryCard(props) {
  return (
    <div className="card">
      <img src={props.country.flag} className="card-img-top" alt={`${props.country.name} flag`} />
      <div className="card-body">
        <h3 className="card-title">{props.country.name}</h3>
        <div className="card-text">
          <div>
            Population: <span className="value">{props.country.population.toLocaleString('en-US') || 'N/A'}</span>
          </div>
          <div>
            Region: <span className="value">{props.country.region || 'N/A'}</span>
          </div>
          <div>
            Capital: <span className="value">{props.country.capital || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
