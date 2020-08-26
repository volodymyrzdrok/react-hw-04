import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";

import routes from "./routes";

const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./components/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./components/MovieDetailsPage/MovieDetailsPage")
);

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route exact path={routes.movies} component={MoviesPage} />
            <Route
              // exact
              path={routes.movieId}
              component={MovieDetailsPage}
            />

            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
