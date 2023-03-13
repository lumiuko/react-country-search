import { Link, useRouteError } from 'react-router-dom'

export default function Error() {
  const error = useRouteError()

  return (
    <div className="container center">
      <h1>Oops. Something went wrong</h1>
      <p>{error.message}</p>
      <Link to="/" className="btn">
        Go to hompage
      </Link>
    </div>
  )
}
