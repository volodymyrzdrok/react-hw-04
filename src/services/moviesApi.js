import axios from 'axios';

const api_key = `c89f43b1c825df5dc6e73406f0f79577`;
const urlMovie = 'https://api.themoviedb.org/3/';

export const fetchFilmsReviews = movieId => {
  return axios
    .get(
      `${urlMovie}movie/${movieId}/reviews?api_key=${api_key}&language=en-US&page=1`,
    )
    .then(response => response.data.results);
};

export const fetchFilmId = movieId => {
  return axios
    .get(`${urlMovie}movie/${movieId}?api_key=${api_key}&language=en-US`)
    .then(response => response.data);
};
export const fetchFilmsCast = movieId => {
  return axios
    .get(`${urlMovie}movie/${movieId}/credits?api_key=${api_key}`)
    .then(response => response.data.cast);
};

export const fetchFilmsPopular = () => {
  return axios
    .get(`${urlMovie}trending/movie/week?api_key=${api_key}`)
    .then(response => response.data.results);
};

export const fetchFilmsWithQuery = searchQuery => {
  return axios
    .get(`${urlMovie}search/movie?api_key=${api_key}&query=${searchQuery}`)
    .then(response => response.data.results);
};
