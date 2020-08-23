import axios from "axios";

const api_key = `c89f43b1c825df5dc6e73406f0f79577`;

const fetchFilmsReviews = (movieId) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${api_key}&language=en-US&page=1`
    )
    .then((response) => response.data.results);
};

const fetchFilmId = (movieId) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`
    )
    .then((response) => response.data);
};
const fetchFilmsCast = (movieId) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`
    )
    .then((response) => response.data.cast);
};

const fetchFilmsPopular = () => {
  return axios
    .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`)
    .then((response) => response.data.results);
};

const fetchFilmsWithQuery = (searchQuery) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}`
    )
    .then((response) => response.data.results);
};
export default {
  fetchFilmsPopular,
  fetchFilmsWithQuery,
  fetchFilmId,
  fetchFilmsCast,
  fetchFilmsReviews,
};
