import React, { Component } from "react";
import moviesApi from "../../services/moviesApi";
import LoaderSpinner from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default class Cast extends Component {
  state = {
    moviesCasts: [],
    text: "",
    loader: false,
    error: null,
  };
  componentDidMount() {
    this.setState({ loader: true });
    const { match } = this.props;
    moviesApi
      .fetchFilmsCast(match.params.movieId)
      .then((moviesCasts) => this.setState({ moviesCasts }))
      .catch((error) =>
        this.setState({ error, text: error.message, loader: false })
      )
      .finally(() => this.setState({ loader: false }));
  }

  render() {
    const { moviesCasts, loader, error, text } = this.state;

    return (
      <>
        {error && <ErrorMessage text={text} />}
        {loader && <LoaderSpinner />}

        {!loader && !error && (
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
                <h3 className="mto mbo">{movie.name}</h3>
                <p className="mto"> Character: {movie.character}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
