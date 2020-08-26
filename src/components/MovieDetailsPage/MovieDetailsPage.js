import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReviewsComp from "../ReviewsComp/ReviewsComp";
import LoaderSpinner from "../Loader/Loader";
import UndoIcon from "@material-ui/icons/Undo";
import Cast from "../Cast/Cast";
import moviesApi from "../../services/moviesApi";
import styles from "./MovieDetailsPage.module.css";
import routes from "../../routes";
// import PropTypes from "prop-types";

export default class MovieDetailsPage extends Component {
  // static defaultProps = {
  //   poster_path: "/bOKjzWDxiDkgEQznhzP4kdeAHNI.jpg",
  // };
  // static propTypes = {
  //   poster_path: PropTypes.string.isRequired,
  // };
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     movie: null,
  //   };
  // }
  state = {
    movie: null,
    text: "",
    loader: false,
    error: null,
  };
  componentDidMount() {
    const { match } = this.props;
    this.setState({ loader: true });
    moviesApi
      .fetchFilmId(match.params.movieId)
      .then((movie) => this.setState({ movie }))
      .catch((error) => this.setState({ error, text: error.message }))
      .finally(() => this.setState({ loader: false }));
  }

  hendleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      this.props.history.push(state.from);
    } else {
      this.props.history.push(routes.movies);
    }
  };
  render() {
    const { movie, error, text } = this.state;
    const { match } = this.props;
    return (
      <>
        <button
          type="button"
          className={styles.backBtn}
          onClick={this.hendleGoBack}
        >
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
                    : "/bOKjzWDxiDkgEQznhzP4kdeAHNI.jpg"
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
                <p>{movie.genres.map((elem) => elem.name).join(",")} </p>
              </div>
            </div>
            <div className={styles.detailsPageInform}>
              <h5>Addtional information</h5>
              <NavLink to={`${match.url}/cast`}>Cast</NavLink>
              <br />
              <NavLink to={`${match.url}/reviews`}>Reviews</NavLink>
            </div>
            <Route path={`${match.path}/cast`} component={Cast} />
            <Route path={`${match.path}/reviews`} component={ReviewsComp} />
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        )}
      </>
    );
  }
}
