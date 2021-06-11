function TestCard(props) {
  return (
    <div className="card">
      <img src={props.country.flag} className="card-img-top" alt={`${props.country.name} flag`} />
      <div className="card-body">
        <h3 className="card-title">{props.country.name}</h3>
        <p className="card-text">
          <span className="text-bold">Population:</span> {props.country.population.toLocaleString('en-US') || 'N/A'}
          <br />
          <span className="text-bold">Region:</span> {props.country.region || 'N/A'}
          <br />
          <span className="text-bold">Capital:</span> {props.country.capital || 'N/A'}
        </p>
      </div>
    </div>
  );
}

export default TestCard;
