import React, { useState, useEffect } from 'react';
import {
  Route,
  NavLink,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ReviewsComp from '../ReviewsComp/ReviewsComp';
import LoaderSpinner from '../Loader/Loader';
import UndoIcon from '@material-ui/icons/Undo';
import Cast from '../Cast/Cast';
import { fetchFilmId } from '../../services/moviesApi';
import styles from './MovieDetailsPage.module.css';
import routes from '../../routes';

const MovieDetailsPage = ({ match }) => {
  const [movie, setMovie] = useState(null);
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const { url, path } = match;
  let history = useHistory();
  let location = useLocation();
  const moviesId = Number(useParams().movieId);

  useEffect(() => {
    setLoader(true);
    fetchFilmId(moviesId)
      .then(movie => setMovie(movie))
      .catch(error => {
        setError(error);
        setText(error.message);
      })
      .finally(setLoader(false));
  }, [moviesId]);

  const hendleGoBack = () => {
    const { state } = location;

    if (state && state.from) {
      history.push(state.from);
    } else {
      history.push(routes.movies);
    }
  };
  return (
    <>
      <button type="button" className={styles.backBtn} onClick={hendleGoBack}>
        {<UndoIcon />} Go back
      </button>
      {error && <ErrorMessage text={text} />}
      {!movie ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className={styles.descriptionMovie}>
            <img
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${
                movie.poster_path
                  ? movie.poster_path
                  : '/bOKjzWDxiDkgEQznhzP4kdeAHNI.jpg'
              }`}
              alt={movie.original_title}
            />
            <div className={styles.detailsPage}>
              <h3>
                {movie.original_title} ({movie.release_date.slice(0, 4)})
              </h3>
              <p>User Score: {Math.round(movie.popularity)}%</p>
              <h4> Overview </h4>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              <p>{movie.genres.map(elem => elem.name).join(',')} </p>
            </div>
          </div>
          <div className={styles.detailsPageInform}>
            <h5>Addtional information</h5>
            <NavLink to={`${url}/cast`}>Cast</NavLink>
            <br />
            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
          </div>
          <Route path={`${path}/cast`} component={Cast} />
          <Route path={`${path}/reviews`} component={ReviewsComp} />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;

// import React, { Component } from 'react';
// import { Route, NavLink } from 'react-router-dom';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';
// import ReviewsComp from '../ReviewsComp/ReviewsComp';
// import LoaderSpinner from '../Loader/Loader';
// import UndoIcon from '@material-ui/icons/Undo';
// import Cast from '../Cast/Cast';
// import moviesApi from '../../services/moviesApi';
// import styles from './MovieDetailsPage.module.css';
// import routes from '../../routes';

// export default class MovieDetailsPage extends Component {
//   state = {
//     movie: null,
//     text: '',
//     loader: false,
//     error: null,
//   };
//   componentDidMount() {
//     const { match } = this.props;
//     this.setState({ loader: true });
//     moviesApi
//       .fetchFilmId(match.params.movieId)
//       .then(movie => this.setState({ movie }))
//       .catch(error => this.setState({ error, text: error.message }))
//       .finally(() => this.setState({ loader: false }));
//   }

//   hendleGoBack = () => {
//     const { state } = this.props.location;

//     if (state && state.from) {
//       this.props.history.push(state.from);
//     } else {
//       this.props.history.push(routes.movies);
//     }
//   };
//   render() {
//     const { movie, error, text } = this.state;
//     const { match } = this.props;
//     return (
//       <>
//         <button
//           type="button"
//           className={styles.backBtn}
//           onClick={this.hendleGoBack}
//         >
//           {<UndoIcon />} Go back
//         </button>
//         {error && <ErrorMessage text={text} />}
//         {!movie ? (
//           <LoaderSpinner />
//         ) : (
//           <>
//             <div className={styles.descriptionMovie}>
//               <img
//                 src={`https://image.tmdb.org/t/p/w220_and_h330_face${
//                   movie.poster_path
//                     ? movie.poster_path
//                     : '/bOKjzWDxiDkgEQznhzP4kdeAHNI.jpg'
//                 }`}
//                 alt={movie.original_title}
//               />
//               <div className={styles.detailsPage}>
//                 <h3>
//                   {movie.original_title} ({movie.release_date.slice(0, 4)})
//                 </h3>
//                 <p>User Score: {Math.round(movie.popularity)}%</p>
//                 <h4> Overview </h4>
//                 <p>{movie.overview}</p>
//                 <h4>Genres</h4>
//                 <p>{movie.genres.map(elem => elem.name).join(',')} </p>
//               </div>
//             </div>
//             <div className={styles.detailsPageInform}>
//               <h5>Addtional information</h5>
//               <NavLink to={`${match.url}/cast`}>Cast</NavLink>
//               <br />
//               <NavLink to={`${match.url}/reviews`}>Reviews</NavLink>
//             </div>
//             <Route path={`${match.path}/cast`} component={Cast} />
//             <Route path={`${match.path}/reviews`} component={ReviewsComp} />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//           </>
//         )}
//       </>
//     );
//   }
// }
