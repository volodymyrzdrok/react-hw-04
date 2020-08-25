import React, { Component } from "react";
import moviesApi from "../../services/moviesApi";
import { NavLink } from "react-router-dom";
import LoaderSpinner from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default class HomePage extends Component {
  state = {
    movies: [],

    text: "",
    loader: false,
    error: null,
  };
  componentDidMount() {
    this.setState({ loader: true });
    moviesApi
      .fetchFilmsPopular()
      .then((movies) => this.setState({ movies }))
      .catch((error) => this.setState({ error, text: error.message }))
      .finally(() => this.setState({ loader: false }));
  }

  render() {
    const { movies, loader, error, text } = this.state;
    const { match } = this.props;
    return (
      <>
        <h2>Trending today</h2>
        {error && <ErrorMessage text={text} />}

        {loader ? (
          <LoaderSpinner />
        ) : (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <NavLink
                  to={{
                    pathname: `${match.url}movies/${movie.id}`,
                    state: { from: this.props.location },
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
  }
}
