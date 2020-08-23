import React, { Component } from "react";
import moviesApi from "../../services/moviesApi";
// import PropTypes from 'prop-types';

class Cast extends Component {
  // static defaultProps = {
  //   profile_path: "/27C77ni5XmlgkJVbomXPC4tHWVd.jpg",
  // };

  // ПИТАННЯ ПО ЦЬОМУ

  state = {
    moviesCasts: [],
  };
  componentDidMount() {
    const { match } = this.props;
    moviesApi
      .fetchFilmsCast(match.params.movieId)
      .then((moviesCasts) => this.setState({ moviesCasts }));
  }

  render() {
    const { moviesCasts } = this.state;

    return (
      <ul>
        {moviesCasts.map((movie) => (
          <li key={movie.credit_id}>
            <img
              src={`https://image.tmdb.org/t/p/w138_and_h175_face${
                !movie.profile_path
                  ? "/27C77ni5XmlgkJVbomXPC4tHWVd.jpg"
                  : movie.profile_path
              }`}
              alt={movie.name}
            />
            <h5>{movie.name}</h5>
            <p> Character: {movie.character}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Cast;
