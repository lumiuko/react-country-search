import ContentLoader from 'react-content-loader';

function Skeletons(props) {
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
        backgroundColor={props.isDarkTheme ? '#364753' : '#f3f3f3'}
        foregroundColor={props.isDarkTheme ? '#475d6c' : '#ecebeb'}
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
  return skeletons;
}

export default Skeletons;
