import ContentLoader from 'react-content-loader';

function Skeletons(props) {
  // Set up skeleton loading and fill an array with 12 items
  const skeletons = [];
  for (let i = 0; i < 12; i++) {
    skeletons.push(
      <ContentLoader
        key={i}
        speed={2}
        width={'100%'}
        height={300}
        viewBox="5 5 325 370"
        backgroundColor={props.isDarkTheme ? '#364753' : '#f3f3f3'}
        foregroundColor={props.isDarkTheme ? '#475d6c' : '#ecebeb'}
      >
        <rect x="13" y="7" rx="0" ry="0" width="315" height="180" />
        <rect x="13" y="200" rx="3" ry="3" width="315" height="15" />
        <rect x="13" y="225" rx="3" ry="3" width="315" height="15" />
        <rect x="12" y="250" rx="3" ry="3" width="315" height="15" />
        <rect x="12" y="275" rx="3" ry="3" width="315" height="15" />
        <rect x="12" y="300" rx="3" ry="3" width="315" height="15" />
        <rect x="12" y="325" rx="3" ry="3" width="315" height="15" />
      </ContentLoader>
    );
  }
  return skeletons;
}

export default Skeletons;
