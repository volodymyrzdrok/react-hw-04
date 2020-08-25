import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
// import ReviewsComp from "./components/ReviewsComp/ReviewsComp";
// import Cast from "./components/Cast/Cast";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.movies} component={MoviesPage} />
          <Route
            // exact
            path={routes.movieId}
            component={MovieDetailsPage}
          />
          {/* <Route path={routes.cast} component={Cast} /> */}
          {/* <Route path={routes.reviews} component={ReviewsComp} /> */}
          <Redirect to={routes.home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
