import React, { Component } from "react";
import moviesApi from "../../services/moviesApi";

class ReviewsComp extends Component {
  state = {
    moviesReviews: [],
  };
  componentDidMount() {
    const { match } = this.props;
    moviesApi
      .fetchFilmsReviews(match.params.movieId)
      .then((moviesReviews) => this.setState({ moviesReviews }));
  }

  render() {
    const { moviesReviews } = this.state;

    return (
      <>
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

export default ReviewsComp;