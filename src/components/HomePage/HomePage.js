import React, { Component } from "react";
import moviesApi from "../../services/moviesApi";
import { NavLink } from "react-router-dom";
class HomePage extends Component {
  state = {
    movies: [],
    searchQuery: "",
  };
  componentDidMount() {
    moviesApi.fetchFilmsPopular().then((movies) => this.setState({ movies }));
  }

  render() {
    const { movies } = this.state;
    const { match } = this.props;
    return (
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <NavLink to={`${match.url}movies/${movie.id}`}>
              {movie.original_title}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default HomePage;
