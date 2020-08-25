import React, { Component } from "react";
import moviesApi from "../../services/moviesApi";
import LoaderSpinner from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default class ReviewsComp extends Component {
  state = {
    moviesReviews: [],
    text: "",
    loader: false,
    error: null,
  };
  componentDidMount() {
    this.setState({ loader: true });
    const { match } = this.props;
    moviesApi
      .fetchFilmsReviews(match.params.movieId)
      .then((moviesReviews) => this.setState({ moviesReviews }))
      .catch((error) => this.setState({ error, text: error.message }))
      .finally(() => this.setState({ loader: false }));
  }

  render() {
    const { moviesReviews, error, text, loader } = this.state;

    return (
      <>
        {error && <ErrorMessage text={text} />}
        {loader && <LoaderSpinner />}
        {moviesReviews.length > 0 ? (
          <ul>
            {moviesReviews.map((reviews) => (
              <li key={reviews.id}>
                <h4>Author: {reviews.author}</h4>
                <p>{reviews.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h5>We don't have any reviews for this movie</h5>
        )}
      </>
    );
  }
}
