import React, { useState, useEffect } from 'react';
import SearchMovie from '../SearchMovie/SearchMovie';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { fetchFilmsWithQuery } from '../../services/moviesApi';
import queryString from 'query-string';
import LoaderSpinner from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MoviesPage = ({ match }) => {
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  let history = useHistory();
  let location = useLocation();

  const hendleChangeQuery = guery => {
    history.push({
      pathname: location.pathname,
      search: `query=${guery}`,
    });
  };

  const fetchFilms = query => {
    setLoader(true);
    fetchFilmsWithQuery(query)
      .then(movies => setMovies(movies))
      .catch(error => {
        setError(error);
        setText(error.message);
      })
      .finally(setLoader(false));
  };

  // componentDidMount() {
  //   const { query: nowQuery } = queryString.parse(location.search);

  //   nowQuery && fetchFilms(nowQuery);
  // }
  useEffect(() => {
    const { query: nowQuery } = queryString.parse(location.search);

    nowQuery && fetchFilms(nowQuery);
  }, [location.search]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { query: pastQuery } = queryString.parse(prevProps.location.search);
  //   const { query: nowQuery } = queryString.parse(location.search);

  //   if (nowQuery !== pastQuery) {
  //     this.fetchFilms(nowQuery);

  // }

  // useEffect(()=>{},[])

  return (
    <>
      <SearchMovie hendleChangeQuery={hendleChangeQuery} />
      {error && <ErrorMessage text={text} />}
      {loader ? (
        <LoaderSpinner />
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <NavLink
                to={{
                  pathname: `${match.url}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.original_title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;

// import React, { Component } from 'react';
// import SearchMovie from '../SearchMovie/SearchMovie';
// import { NavLink } from 'react-router-dom';
// import moviesApi from '../../services/moviesApi';
// import queryString from 'query-string';
// import LoaderSpinner from '../Loader/Loader';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';

// class MoviesPage extends Component {
//   state = {
//     movies: [],
//     text: '',
//     loader: false,
//     error: null,
//   };
//   hendleChangeQuery = guery => {
//     this.props.history.push({
//       pathname: this.props.location.pathname,
//       search: `query=${guery}`,
//     });
//   };

//   fetchFilms = query => {
//     this.setState({ loader: true });
//     moviesApi
//       .fetchFilmsWithQuery(query)
//       .then(movies => this.setState({ movies }))
//       .catch(error => this.setState({ error, text: error.message }))
//       .finally(() => this.setState({ loader: false }));
//   };

//   componentDidMount() {
//     const { query: nowQuery } = queryString.parse(this.props.location.search);

//     nowQuery && this.fetchFilms(nowQuery);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { query: pastQuery } = queryString.parse(prevProps.location.search);
//     const { query: nowQuery } = queryString.parse(this.props.location.search);

//     if (nowQuery !== pastQuery) {
//       this.fetchFilms(nowQuery);
//     }
//   }

//   render() {
//     const { movies, error, text, loader } = this.state;
//     const { match } = this.props;
//     return (
//       <>
//         <SearchMovie hendleChangeQuery={this.hendleChangeQuery} />
//         {error && <ErrorMessage text={text} />}
//         {loader ? (
//           <LoaderSpinner />
//         ) : (
//           <ul>
//             {movies.map(movie => (
//               <li key={movie.id}>
//                 <NavLink
//                   to={{
//                     pathname: `${match.url}/${movie.id}`,
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

// export default MoviesPage;
