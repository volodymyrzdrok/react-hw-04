import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { fetchFilmsPopular } from '../../services/moviesApi';
import LoaderSpinner from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const HomePage = ({ match }) => {
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  let location = useLocation();

  useEffect(() => {
    setLoader(true);
    fetchFilmsPopular()
      .then(movies => setMovies(movies))
      .catch(error => {
        setError(error);
        setText(error.message);
      })
      .finally(setLoader(false));
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      {error && <ErrorMessage text={text} />}
      {loader ? (
        <LoaderSpinner />
      ) : (
        <ul className="movie__list">
          {movies.map(movie => (
            <li key={movie.id} className="movie__listItem">
              <NavLink
                to={{
                  pathname: `${match.url}movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                <img
                  className="movie__img"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                />
                {/* {movie.original_title} */}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HomePage;

// import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import moviesApi from '../../services/moviesApi';
// import LoaderSpinner from '../Loader/Loader';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';

// export default class HomePage extends Component {
//   state = {
//     movies: [],
//     text: '',
//     loader: false,
//     error: null,
//   };
//   componentDidMount() {
//     this.setState({ loader: true });
//     moviesApi
//       .fetchFilmsPopular()
//       .then(movies => this.setState({ movies }))
//       .catch(error => this.setState({ error, text: error.message }))
//       .finally(() => this.setState({ loader: false }));
//   }

//   render() {
//     const { movies, loader, error, text } = this.state;
//     const { match } = this.props;
//     return (
//       <>
//         <h2>Trending today</h2>
//         {error && <ErrorMessage text={text} />}
//         {loader ? (
//           <LoaderSpinner />
//         ) : (
//           <ul>
//             {movies.map(movie => (
//               <li key={movie.id}>
//                 <NavLink
//                   to={{
//                     pathname: `${match.url}movies/${movie.id}`,
//                     state: { from: this.props.location },
//                   }}
//                 >
//                   {movie.original_title}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         )}
//       </>
//     );
//   }
// }
