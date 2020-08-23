import React from "react";
import { Switch, Route, Redirect, Link, NavLink } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Cast from "./components/Cast/Cast";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import ReviewsComp from "./components/ReviewsComp/ReviewsComp";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route exact path="/movies/:movieId" component={MovieDetailsPage} />
        <Route path="/movies/:movieId/cast" component={Cast} />
        <Route path="/movies/:movieId/reviews" component={ReviewsComp} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
