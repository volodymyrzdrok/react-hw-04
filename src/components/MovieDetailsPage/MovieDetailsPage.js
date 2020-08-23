import React, { Component } from "react";
import moviesApi from "../../services/moviesApi";
import { NavLink } from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";

class MovieDetailsPage extends Component {
  state = {
    movie: null,
  };
  componentDidMount() {
    const { match } = this.props;
    moviesApi
      .fetchFilmId(match.params.movieId)
      .then((movie) => this.setState({ movie }));
  }

  render() {
    const { movie } = this.state;
    const { match } = this.props;
    return (
      <>
        {movie && (
          <>
            <div className={styles.descriptionMovie}>
              <img
                src={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                alt={movie.original_title}
              />
              <div className="">
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
            <h5>Addtional information</h5>
            <NavLink to={`${match.url}/reviews`}>Reviews</NavLink>
            <br />
            <NavLink to={`${match.url}/cast`}>Cast</NavLink>
          </>
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
